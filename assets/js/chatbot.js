/* ============================================================
   CHATBOT.JS — Gemini AI Assistant + Tawk.to Live Chat
   David John Emmanuel G. Tulio Portfolio

   HOW IT WORKS:
   - A chat bubble appears at the bottom right of every page
   - Clicking it opens the Gemini AI chatbot
   - The AI knows everything about David and answers questions
   - A separate Tawk.to button lets visitors send real messages
     that arrive in your Tawk.to mobile app

   TO CUSTOMIZE:
   - Update the SYSTEM_PROMPT below with any new info about yourself
     (new projects, new skills, new certifications, etc.)
   - Change CHAT_TITLE to update the chatbot's display name
   - Change WELCOME_MESSAGE to change the first message shown

   GEMINI API KEY:
   - Currently using the free tier (gemini-1.5-flash model)
   - Limit: 15 requests/minute, 1 million tokens/day
   - Restrict your key to your domain at aistudio.google.com
   ============================================================ */

(function () {
  'use strict';

  /* ── Configuration ────────────────────────────────────────
     Update SYSTEM_PROMPT whenever you add new projects,
     skills, or certifications to keep the AI up to date.
  ---------------------------------------------------------- */
  const GEMINI_API_KEY  = 'AIzaSyDa8tc2orH7IjscPe6ge6t_5FevF3xpnpM';
  const GEMINI_MODEL    = 'gemini-2.0-flash';
  const CHAT_TITLE      = 'Ask About David';
  const WELCOME_MESSAGE = "Hi! I'm David's AI assistant. Ask me anything about his skills, projects, experience, or how to get in touch!";

  /* ── System Prompt ──────────────────────────────────────────
     This is what tells Gemini who David is.
     Update this whenever your portfolio information changes.
  ---------------------------------------------------------- */
  const SYSTEM_PROMPT = `
You are a helpful assistant on the personal portfolio website of David John Emmanuel G. Tulio.
Your job is to answer questions about David in a friendly, professional, and concise way.
Only answer questions related to David. If someone asks something unrelated, politely redirect them.
Never make up information. Only use what is provided below.

ABOUT DAVID:
- Full name: David John Emmanuel G. Tulio
- Currently studying Bachelor of Science in Information Technology at Holy Angel University, Angeles City, Pampanga
- Expected graduation: 2027
- Based in Sindalan, City of San Fernando, Pampanga, Philippines
- Open to internship and freelance opportunities

TECHNICAL SKILLS:
- Front-End: HTML5, CSS3, JavaScript, Responsive Design, Bootstrap, Tailwind CSS, Vue.js
- Back-End: Basic PHP, Basic Node.js, REST APIs
- Mobile: Flutter (UI)
- Databases: MySQL, MongoDB
- Tools: VS Code, GitHub, Figma, Canva, WordPress, CMS Platforms
- Languages: Java, Python (basic)

SOFT SKILLS:
Critical Thinking, Problem Solving, Team Collaboration, Time Management, Active Listening, Quick Learner, Patience

PROJECTS:
1. Dropify - A web-based e-commerce platform for local influencers with a functional backend. Tools: Node.js, HTML, CSS, MongoDB, Figma. Live: https://dropifystore.netlify.app/
2. 4B Betis Furniture - A marketing website for a local furniture shop. Tools: Figma, WordPress. Live: https://4bbetisfurniture.com
3. FocusFlow - A Pomodoro study timer with task list, session history, stats, and Web Audio API sound alerts. Pure HTML, CSS, JavaScript.
4. AllowanceIQ - A weekly student budget tracker with expense logging by category, progress bar, and weekly summary. Pure HTML, CSS, JavaScript.
5. VitalCheck - A BMI and health calculator with animated gauge, personalized health tips, and history tracking. Pure HTML, CSS, JavaScript.

CERTIFICATIONS (14 total):
- CompTIA IT Fundamentals (ITF+) — 2023
- JavaScript Essentials 1 — Cisco Networking Academy — 2024
- CCNA: Introduction to Networks — Cisco Networking Academy — 2025
- Endpoint Security — Cisco Networking Academy — 2025
- Introduction to PHP — Simplilearn SkillUP — 2025
- Design Thinking for Beginners — Simplilearn SkillUP — 2025
- Introduction to Graphic Design; Basics of UI/UX — Simplilearn SkillUP — 2025
- Website UI/UX Designing using ChatGPT — Simplilearn SkillUP — 2025
- SEO Certificate — 6WSEA — 2025
- Get Started Using Google Analytics — Google Analytics — 2026
- Manage GA4 Data and Learn to Read Reports — Google Analytics — 2026
- Use GA4 with Other Tools and Data Sources — Google Analytics — 2026
- Dive Deeper into GA4 Data and Reports — Google Analytics — 2026
- Google Analytics Certification — Google Analytics — 2026

EDUCATION:
Bachelor of Science in Information Technology
Holy Angel University, Angeles City
Expected Graduation: 2027
Relevant Coursework: Web Development, UI/UX Design, Database Systems

CONTACT:
- Email: davidjohne.tulio@gmail.com
- GitHub: https://github.com/DavidTulio
- LinkedIn: https://www.linkedin.com/in/david-john-tulio-126916316/
- Portfolio: https://davidtulio-portfolio.netlify.app

Keep answers short, friendly, and to the point. Use bullet points when listing multiple items.
If someone wants to hire or collaborate with David, encourage them to use the contact form or email him directly.
  `.trim();

  /* ── State ──────────────────────────────────────────────── */
  let isOpen       = false;
  let isLoading    = false;
  let chatHistory  = []; // Stores { role, parts } for multi-turn context

  /* ── Inject Styles ──────────────────────────────────────── */
  const style = document.createElement('style');
  style.textContent = `
    /* ── Chat Container ── */
    #ai-chat-wrap {
      position: fixed !important;
      bottom: 5.5rem !important;
      right: 1.5rem !important;
      z-index: 99999 !important;
      font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 0.75rem;
    }

    /* ── Chat Window ── */
    #ai-chat-window {
      width: 340px;
      max-height: 480px;
      background: #1a1916;
      border: 1px solid #2a2825;
      border-radius: 20px;
      box-shadow: 0 12px 40px rgba(0,0,0,0.5);
      display: flex;
      flex-direction: column;
      overflow: hidden;
      opacity: 0;
      transform: translateY(16px) scale(0.96);
      pointer-events: none;
      transition: opacity 0.25s ease, transform 0.25s ease;
      align-self: flex-start;
    }

    #ai-chat-window.open {
      opacity: 1;
      transform: translateY(0) scale(1);
      pointer-events: all;
    }

    [data-theme="light"] #ai-chat-window {
      background: #ffffff;
      border-color: #e2ddd8;
      box-shadow: 0 12px 40px rgba(0,0,0,0.12);
    }

    /* ── Chat Header ── */
    #ai-chat-header {
      padding: 1rem 1.25rem;
      background: #0f0e0c;
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-shrink: 0;
    }

    [data-theme="light"] #ai-chat-header {
      background: #0d0c0a;
    }

    #ai-chat-header-left {
      display: flex;
      align-items: center;
      gap: 0.6rem;
    }

    #ai-chat-avatar {
      width: 30px;
      height: 30px;
      background: linear-gradient(135deg, #3a8eff, #1a5ccc);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.85rem;
      flex-shrink: 0;
    }

    #ai-chat-title {
      font-size: 0.82rem;
      font-weight: 700;
      color: #f5f2ee;
      letter-spacing: 0.01em;
    }

    #ai-chat-subtitle {
      font-size: 0.62rem;
      color: #7a7570;
      margin-top: 0.1rem;
      letter-spacing: 0.04em;
    }

    #ai-chat-close {
      width: 26px;
      height: 26px;
      border-radius: 50%;
      background: rgba(255,255,255,0.08);
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.7rem;
      color: #7a7570;
      transition: background 0.2s;
    }

    #ai-chat-close:hover { background: rgba(255,255,255,0.14); color: #f5f2ee; }

    /* ── Messages Area ── */
    #ai-chat-messages {
      flex: 1;
      overflow-y: auto;
      padding: 1rem;
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      scrollbar-width: thin;
      scrollbar-color: #2a2825 transparent;
    }

    #ai-chat-messages::-webkit-scrollbar { width: 3px; }
    #ai-chat-messages::-webkit-scrollbar-thumb { background: #2a2825; border-radius: 3px; }

    /* ── Message Bubbles ── */
    .ai-msg {
      display: flex;
      flex-direction: column;
      max-width: 85%;
      gap: 0.25rem;
    }

    .ai-msg.ai   { align-self: flex-start; }
    .ai-msg.user { align-self: flex-end; }

    .ai-msg-bubble {
      padding: 0.6rem 0.9rem;
      border-radius: 14px;
      font-size: 0.8rem;
      line-height: 1.55;
    }

    .ai-msg.ai .ai-msg-bubble {
      background: #242220;
      color: #c8c0b0;
      border-bottom-left-radius: 4px;
    }

    .ai-msg.user .ai-msg-bubble {
      background: #1a4a8a;
      color: #e8f0fe;
      border-bottom-right-radius: 4px;
    }

    [data-theme="light"] .ai-msg.ai .ai-msg-bubble {
      background: #f0f0ee;
      color: #3a3732;
    }

    [data-theme="light"] .ai-msg.user .ai-msg-bubble {
      background: #1a4a8a;
      color: #e8f0fe;
    }

    /* Format AI response text */
    .ai-msg-bubble ul  { padding-left: 1rem; margin-top: 0.3rem; }
    .ai-msg-bubble li  { margin-bottom: 0.2rem; }
    .ai-msg-bubble p   { margin-bottom: 0.4rem; }
    .ai-msg-bubble p:last-child { margin-bottom: 0; }
    .ai-msg-bubble strong { color: #f5f2ee; }

    [data-theme="light"] .ai-msg-bubble strong { color: #0f0e0c; }

    /* ── Typing Indicator ── */
    .ai-typing {
      display: flex;
      gap: 4px;
      padding: 0.6rem 0.9rem;
      background: #242220;
      border-radius: 14px;
      border-bottom-left-radius: 4px;
      width: fit-content;
    }

    [data-theme="light"] .ai-typing { background: #f0f0ee; }

    .ai-typing span {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #7a7570;
      animation: aiTypingBounce 1.2s infinite;
    }

    .ai-typing span:nth-child(2) { animation-delay: 0.2s; }
    .ai-typing span:nth-child(3) { animation-delay: 0.4s; }

    @keyframes aiTypingBounce {
      0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
      30%            { transform: translateY(-5px); opacity: 1; }
    }

    /* ── Suggested Questions ── */
    #ai-suggestions {
      padding: 0 1rem 0.75rem;
      display: flex;
      flex-wrap: wrap;
      gap: 0.4rem;
    }

    .ai-suggestion {
      padding: 0.3rem 0.75rem;
      background: transparent;
      border: 1px solid #2a2825;
      border-radius: 999px;
      font-size: 0.68rem;
      color: #7a7570;
      cursor: pointer;
      transition: all 0.2s;
      font-family: inherit;
    }

    .ai-suggestion:hover {
      border-color: #4a9eff;
      color: #4a9eff;
      background: rgba(74, 158, 255, 0.08);
    }

    [data-theme="light"] .ai-suggestion {
      border-color: #e2ddd8;
      color: #7a7570;
    }

    /* ── Input Area ── */
    #ai-chat-input-wrap {
      padding: 0.75rem 1rem;
      border-top: 1px solid #2a2825;
      display: flex;
      gap: 0.5rem;
      flex-shrink: 0;
    }

    [data-theme="light"] #ai-chat-input-wrap { border-top-color: #e2ddd8; }

    #ai-chat-input {
      flex: 1;
      background: #242220;
      border: 1px solid #2a2825;
      border-radius: 999px;
      padding: 0.5rem 0.9rem;
      font-size: 0.78rem;
      color: #f5f2ee;
      outline: none;
      font-family: inherit;
      transition: border-color 0.2s;
    }

    [data-theme="light"] #ai-chat-input {
      background: #f0f0ee;
      border-color: #e2ddd8;
      color: #0f0e0c;
    }

    #ai-chat-input:focus { border-color: #4a9eff; }
    #ai-chat-input::placeholder { color: #3a3732; }

    #ai-chat-send {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: #4a9eff;
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.8rem;
      color: #fff;
      flex-shrink: 0;
      transition: all 0.2s;
      align-self: center;
    }

    #ai-chat-send:hover   { background: #2d7dd2; transform: scale(1.05); }
    #ai-chat-send:disabled { opacity: 0.4; cursor: not-allowed; transform: none; }

    /* ── Trigger Buttons Row ── */
    #ai-triggers {
      display: flex;
      gap: 0.6rem;
      align-items: center;
    }

    /* AI Chat bubble button */
    #ai-chat-btn {
      width: 52px;
      height: 52px;
      border-radius: 50%;
      background: #0f0e0c;
      border: 1.5px solid #2a2825;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.3rem;
      box-shadow: 0 4px 20px rgba(0,0,0,0.4);
      transition: all 0.25s ease;
      position: relative;
    }

    #ai-chat-btn:hover {
      transform: translateY(-3px);
      box-shadow: 0 6px 28px rgba(74,158,255,0.25);
      border-color: #4a9eff;
    }

    [data-theme="light"] #ai-chat-btn {
      background: #ffffff;
      border-color: #e2ddd8;
      box-shadow: 0 4px 20px rgba(0,0,0,0.1);
    }

    /* Pulse ring on AI button */
    #ai-chat-btn::before {
      content: '';
      position: absolute;
      inset: -4px;
      border-radius: 50%;
      border: 2px solid rgba(74,158,255,0.3);
      animation: aiPulse 2.5s infinite;
    }

    @keyframes aiPulse {
      0%   { transform: scale(1);   opacity: 1; }
      70%  { transform: scale(1.25); opacity: 0; }
      100% { transform: scale(1.25); opacity: 0; }
    }

    #ai-triggers {
      display: flex;
      gap: 0.6rem;
      align-items: center;
      flex-direction: row-reverse;
    }

    #ai-chat-label {
      background: #0f0e0c;
      color: #f5f2ee;
      font-size: 0.68rem;
      font-weight: 600;
      letter-spacing: 0.06em;
      padding: 0.3rem 0.75rem;
      border-radius: 999px;
      border: 1px solid #2a2825;
      white-space: nowrap;
      opacity: 0;
      transform: translateX(-8px);
      transition: all 0.2s;
      pointer-events: none;
    }

    #ai-triggers:hover #ai-chat-label {
      opacity: 1;
      transform: translateX(0);
    }

    [data-theme="light"] #ai-chat-label {
      background: #ffffff;
      color: #0f0e0c;
      border-color: #e2ddd8;
    }

    /* ── Responsive ── */
    @media (max-width: 480px) {
      #ai-chat-window { width: calc(100vw - 2rem); }
      #ai-chat-wrap   { right: 1rem; bottom: 5rem; }
    }
  `;
  document.head.appendChild(style);

  /* ── Build HTML ─────────────────────────────────────────── */
  const wrap = document.createElement('div');
  wrap.id = 'ai-chat-wrap';
  wrap.innerHTML = `
    <!-- Chat Window -->
    <div id="ai-chat-window" role="dialog" aria-label="AI Chat Assistant" aria-hidden="true">

      <!-- Header -->
      <div id="ai-chat-header">
        <div id="ai-chat-header-left">
          <div id="ai-chat-avatar" aria-hidden="true">🤖</div>
          <div>
            <div id="ai-chat-title">${CHAT_TITLE}</div>
            <div id="ai-chat-subtitle">Powered by Gemini AI</div>
          </div>
        </div>
        <button id="ai-chat-close" aria-label="Close chat">✕</button>
      </div>

      <!-- Messages -->
      <div id="ai-chat-messages" aria-live="polite" aria-label="Chat messages"></div>

      <!-- Suggested questions -->
      <div id="ai-suggestions">
        <button class="ai-suggestion">What projects have you built?</button>
        <button class="ai-suggestion">What are your skills?</button>
        <button class="ai-suggestion">How can I contact you?</button>
        <button class="ai-suggestion">Tell me about yourself</button>
      </div>

      <!-- Input -->
      <div id="ai-chat-input-wrap">
        <input
          type="text"
          id="ai-chat-input"
          placeholder="Ask me anything about David..."
          maxlength="300"
          aria-label="Type your message"
        />
        <button id="ai-chat-send" aria-label="Send message">➤</button>
      </div>

    </div>

    <!-- Trigger buttons -->
    <div id="ai-triggers">
      <span id="ai-chat-label">Ask AI</span>
      <button id="ai-chat-btn" aria-label="Open AI chat assistant" title="Chat with David's AI assistant">
        🤖
      </button>
    </div>
  `;
  document.documentElement.appendChild(wrap);

  /* ── DOM References ─────────────────────────────────────── */
  const chatWindow  = document.getElementById('ai-chat-window');
  const chatBtn     = document.getElementById('ai-chat-btn');
  const closeBtn    = document.getElementById('ai-chat-close');
  const messagesEl  = document.getElementById('ai-chat-messages');
  const inputEl     = document.getElementById('ai-chat-input');
  const sendBtn     = document.getElementById('ai-chat-send');
  const suggestions = document.querySelectorAll('.ai-suggestion');

  /* ── Open / Close ───────────────────────────────────────── */
  function openChat() {
    isOpen = true;
    chatWindow.classList.add('open');
    chatWindow.setAttribute('aria-hidden', 'false');
    chatBtn.setAttribute('aria-expanded', 'true');
    inputEl.focus();

    // Show welcome message on first open
    if (messagesEl.children.length === 0) {
      appendMessage('ai', WELCOME_MESSAGE);
    }
  }

  function closeChat() {
    isOpen = false;
    chatWindow.classList.remove('open');
    chatWindow.setAttribute('aria-hidden', 'true');
    chatBtn.setAttribute('aria-expanded', 'false');
  }

  chatBtn.addEventListener('click', () => isOpen ? closeChat() : openChat());
  closeBtn.addEventListener('click', closeChat);

  // Close on Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && isOpen) closeChat();
  });

  /* ── Append Message ─────────────────────────────────────── */
  function appendMessage(role, text) {
    const div = document.createElement('div');
    div.className = `ai-msg ${role}`;

    const bubble = document.createElement('div');
    bubble.className = 'ai-msg-bubble';

    // Convert markdown-like formatting to HTML
    const formatted = text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`(.*?)`/g, '<code>$1</code>')
      .replace(/\n\n/g, '</p><p>')
      .replace(/\n- /g, '</p><ul><li>')
      .replace(/\n/g, '<br>');

    bubble.innerHTML = `<p>${formatted}</p>`;
    div.appendChild(bubble);
    messagesEl.appendChild(div);
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  /* ── Typing Indicator ───────────────────────────────────── */
  function showTyping() {
    const div = document.createElement('div');
    div.className = 'ai-msg ai';
    div.id = 'ai-typing-indicator';
    div.innerHTML = `<div class="ai-typing"><span></span><span></span><span></span></div>`;
    messagesEl.appendChild(div);
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  function hideTyping() {
    const indicator = document.getElementById('ai-typing-indicator');
    if (indicator) indicator.remove();
  }

  /* ── Send Message to Gemini ─────────────────────────────── */
  async function sendMessage(text) {
    if (!text.trim() || isLoading) return;

    isLoading = true;
    sendBtn.disabled = true;
    inputEl.value = '';

    // Hide suggestions after first message
    document.getElementById('ai-suggestions').style.display = 'none';

    // Show user message
    appendMessage('user', text);

    // Add to history
    chatHistory.push({ role: 'user', parts: [{ text }] });

    // Show typing
    showTyping();

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`,
        {
          method:  'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            system_instruction: {
              parts: [{ text: SYSTEM_PROMPT }]
            },
            contents: chatHistory
          })
        }
      );

      const data = await response.json();

      if (data.candidates && data.candidates[0]) {
        const reply = data.candidates[0].content.parts[0].text;
        // Add AI response to history
        chatHistory.push({ role: 'model', parts: [{ text: reply }] });
        hideTyping();
        appendMessage('ai', reply);
      } else if (data.error) {
        hideTyping();
        appendMessage('ai', `Sorry, I ran into an issue: ${data.error.message}. Please try again.`);
      } else {
        hideTyping();
        appendMessage('ai', "I'm sorry, I couldn't process that. Please try again!");
      }

    } catch (err) {
      hideTyping();
      appendMessage('ai', "I'm having trouble connecting right now. Please check your internet connection and try again.");
    }

    isLoading = false;
    sendBtn.disabled = false;
    inputEl.focus();
  }

  /* ── Event Listeners ────────────────────────────────────── */

  // Send button
  sendBtn.addEventListener('click', () => sendMessage(inputEl.value));

  // Enter key
  inputEl.addEventListener('keydown', e => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(inputEl.value);
    }
  });

  // Suggested questions
  suggestions.forEach(btn => {
    btn.addEventListener('click', () => sendMessage(btn.textContent));
  });

})();
