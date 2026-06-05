/**
 * Demski Group Lead-Gen Chatbot — Standalone Embed
 * Version: 1.0.0
 *
 * CONFIGURATION — edit the block below before deploying:
 */
(function () {
  'use strict';

  /* ─── CONFIG ──────────────────────────────────────────────────── */
  var CFG = {
    agentName:       'Erin',
    agentRole:       'Customer Success · The Demski Group',
    agentAvatar:     'https://ethixweb.com/wp-content/uploads/2026/03/avatar-woman-smiling-lady-portrait-250nw-2692286767.webp',
    calendlyUrl:     'https://calendly.com/shreya-ethixweb/30min',
    scheduleLabel:   'Schedule a Free Consultation',
    emailjsPublicKey:'nedYqWwwPWVZZVX0_',
    emailjsServiceId:'service_f4tf0yn',
    emailjsLeadTpl:  'template_c6hi8ir',
    emailjsConfirmTpl:'template_7kz7hgj',
    greetingMsg:     'Hi! Need help with software or app development?',
    primaryColor:    '#0154B1',
    accentColor:     '#F09300',
  };
  /* ─────────────────────────────────────────────────────────────── */

  /* Prevent double-init */
  if (window.__demskiBotLoaded) return;
  window.__demskiBotLoaded = true;

  /* ── INJECT EMAILJS ─────────────────────────────────────────── */
  function loadEmailJS(cb) {
    if (window.emailjs) { cb(); return; }
    var s = document.createElement('script');
    s.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';
    s.onload = function () { window.emailjs.init(CFG.emailjsPublicKey); cb(); };
    document.head.appendChild(s);
  }

  /* ── INJECT FONT ─────────────────────────────────────────────── */
  function loadFont() {
    if (document.getElementById('demski-bot-font')) return;
    var l = document.createElement('link');
    l.id   = 'demski-bot-font';
    l.rel  = 'stylesheet';
    l.href = 'https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&display=swap';
    document.head.appendChild(l);
  }

  /* ── INJECT CSS ──────────────────────────────────────────────── */
  function injectCSS() {
    if (document.getElementById('demski-bot-css')) return;
    var s = document.createElement('style');
    s.id = 'demski-bot-css';
    s.textContent = [
      /* Launcher */
      '#demski-bot-launcher{position:fixed;bottom:32px;right:32px;width:98px;height:98px;border-radius:50%;cursor:pointer;z-index:2147483647;display:none;align-items:center;justify-content:center;background:transparent;opacity:0;transform:translateY(60px) scale(0.7);transition:opacity 0.45s ease,transform 0.45s cubic-bezier(0.34,1.56,0.64,1);}',
      '#demski-bot-launcher.dbl-visible{opacity:1;transform:translateY(0) scale(1);}',
      '#demski-bot-launcher::before{content:"";position:absolute;inset:-3px;border-radius:50%;background:linear-gradient(135deg,'+CFG.primaryColor+',#4facfe,'+CFG.primaryColor+');z-index:-1;animation:dbl-ring-spin 4s linear infinite;}',
      '@keyframes dbl-ring-spin{to{transform:rotate(360deg);}}',
      '#demski-bot-launcher img{width:92px;height:92px;border-radius:50%;object-fit:cover;border:3px solid #fff;box-shadow:0 6px 24px rgba(1,84,177,0.28);transition:transform 0.3s;}',
      '#demski-bot-launcher:hover img{transform:scale(1.06);}',
      '#demski-bot-launcher .dbl-online-dot{position:absolute;bottom:4px;right:4px;width:14px;height:14px;background:#22c55e;border-radius:50%;border:2.5px solid #fff;box-shadow:0 0 0 2px rgba(34,197,94,0.25);}',
      '#demski-bot-launcher .dbl-badge{position:absolute;top:2px;right:2px;width:22px;height:22px;background:#e53e3e;color:#fff;border-radius:50%;border:2px solid #fff;font-size:12px;font-weight:700;font-family:"Outfit",sans-serif;display:none;align-items:center;justify-content:center;box-shadow:0 2px 6px rgba(229,62,62,0.5);animation:dbl-badge-pop 0.3s cubic-bezier(0.34,1.56,0.64,1) both;}',
      '#demski-bot-launcher .dbl-badge.dbl-badge-visible{display:flex!important;}',
      '@keyframes dbl-badge-pop{from{transform:scale(0);}to{transform:scale(1);}}',
      /* Greeting bubble */
      '#demski-greeting-bubble{position:fixed;bottom:110px;right:100px;z-index:2147483646;background:#fff;border-radius:16px 16px 4px 16px;box-shadow:0 12px 40px rgba(0,0,0,0.13);padding:14px 16px 12px;max-width:220px;font-family:"Outfit",sans-serif;opacity:0;transform:translateY(10px) scale(0.94);transition:opacity 0.3s,transform 0.3s;pointer-events:none;}',
      '#demski-greeting-bubble.dbl-bv{opacity:1;transform:none;pointer-events:all;}',
      '#demski-greeting-bubble.dbl-bh{opacity:0;transform:translateY(10px) scale(0.94);pointer-events:none;}',
      '#demski-greeting-bubble p{font-size:13px;color:#333;margin:0 0 10px;line-height:1.5;padding-right:14px;}',
      '#demski-greeting-bubble button{background:'+CFG.primaryColor+';color:#fff;border:none;padding:8px 14px;border-radius:10px;font-size:13px;font-weight:600;cursor:pointer;width:100%;font-family:"Outfit",sans-serif;}',
      '#demski-greeting-bubble button:hover{filter:brightness(0.9);}',
      '.dbl-bubble-close{position:absolute;top:8px;right:10px;font-size:16px;color:#ccc;cursor:pointer;line-height:1;}',
      '.dbl-bubble-close:hover{color:#666;}',
      /* Chat window */
      '@keyframes dbl-pop-in{from{opacity:0;transform:translateY(20px) scale(0.96);}to{opacity:1;transform:none;}}',
      '#demski-lead-bot{position:fixed;bottom:108px;right:28px;z-index:2147483646;animation:dbl-pop-in 0.35s cubic-bezier(0.34,1.56,0.64,1) both;display:none;}',
      '#demski-lead-bot .dbl-card{width:370px;border-radius:22px;overflow:hidden;background:linear-gradient(160deg,rgba(255,255,255,0.82) 0%,rgba(235,244,255,0.88) 100%);backdrop-filter:blur(20px) saturate(1.6);-webkit-backdrop-filter:blur(20px) saturate(1.6);box-shadow:0 32px 80px rgba(0,0,0,0.16),0 6px 20px rgba(1,84,177,0.10),inset 0 1px 0 rgba(255,255,255,0.9);display:flex;flex-direction:column;max-height:calc(100vh - 160px);font-family:"Outfit",sans-serif;border:1px solid rgba(255,255,255,0.6);}',
      /* Header */
      '#demski-lead-bot .dbl-header{background:linear-gradient(135deg,'+CFG.primaryColor+' 0%,#1a7fe8 100%);padding:14px 16px;display:flex;justify-content:space-between;align-items:center;flex-shrink:0;}',
      '#demski-lead-bot .dbl-top-section{display:none;background:linear-gradient(135deg,'+CFG.primaryColor+' 0%,#1a7fe8 100%);flex-shrink:0;}',
      '#demski-lead-bot .dbl-top-row{display:flex;justify-content:space-between;align-items:center;padding:14px 16px;}',
      '#demski-lead-bot .dbl-chat-user{display:flex;gap:11px;align-items:center;}',
      '#demski-lead-bot .dbl-avatar-wrap{position:relative;flex-shrink:0;}',
      '#demski-lead-bot .dbl-avatar-wrap img{width:40px;height:40px;border-radius:50%;object-fit:cover;border:2px solid rgba(255,255,255,0.5);display:block;}',
      '#demski-lead-bot .dbl-hdr-dot{position:absolute;bottom:1px;right:1px;width:10px;height:10px;background:#22c55e;border-radius:50%;border:2px solid '+CFG.primaryColor+';}',
      '#demski-lead-bot .dbl-ch-name{font-weight:700;color:#fff;font-size:14px;}',
      '#demski-lead-bot .dbl-ch-status{font-size:11px;color:rgba(255,255,255,0.75);margin-top:2px;font-weight:400;display:flex;align-items:center;gap:4px;}',
      '#demski-lead-bot .dbl-ch-status::before{content:"";display:inline-block;width:6px;height:6px;background:#22c55e;border-radius:50%;}',
      '#demski-lead-bot .dbl-close{cursor:pointer;font-size:20px;color:rgba(255,255,255,0.7);line-height:1;width:30px;height:30px;display:flex;align-items:center;justify-content:center;border-radius:50%;transition:background 0.15s;user-select:none;background:transparent;border:none;}',
      '#demski-lead-bot .dbl-close:hover{background:rgba(255,255,255,0.15);color:#fff;}',
      /* Welcome screen */
      '#demski-lead-bot .dbl-welcome{display:flex;flex-direction:column;align-items:center;justify-content:center;padding:32px 24px 28px;background:transparent;flex:1;text-align:center;}',
      '#demski-lead-bot .dbl-welcome-av-wrap{position:relative;display:inline-block;margin-bottom:14px;}',
      '#demski-lead-bot .dbl-welcome-av{width:80px;height:80px;border-radius:50%;object-fit:cover;border:3px solid #fff;box-shadow:0 0 0 3px '+CFG.primaryColor+',0 8px 28px rgba(1,84,177,0.18);}',
      '#demski-lead-bot .dbl-welcome-dot{position:absolute;bottom:4px;right:4px;width:14px;height:14px;background:#22c55e;border-radius:50%;border:2.5px solid #fff;}',
      '#demski-lead-bot .dbl-welcome-name{font-size:18px;font-weight:700;color:#111;margin-bottom:4px;}',
      '#demski-lead-bot .dbl-welcome-role{font-size:12px;color:#888;margin-bottom:16px;}',
      '#demski-lead-bot .dbl-welcome-fine{font-size:10.5px;color:#bbb;text-align:center;margin-top:4px;line-height:1.5;}',
      /* Messages */
      '@keyframes dbl-msg-in{from{opacity:0;transform:translateY(8px);}to{opacity:1;transform:none;}}',
      '#demski-lead-bot .dbl-body{flex:1;overflow-y:auto;overflow-x:hidden!important;display:flex;flex-direction:column!important;gap:8px!important;padding:16px 14px 10px!important;min-height:120px!important;max-height:400px!important;background:rgba(214,230,255,0.25)!important;scrollbar-width:thin;}',
      '#demski-lead-bot .dbl-body.dbl-hidden{display:none!important;}',
      '#demski-lead-bot .dbl-body::-webkit-scrollbar{width:4px;}',
      '#demski-lead-bot .dbl-body::-webkit-scrollbar-thumb{background:#dde1e9;border-radius:4px;}',
      /* Typing */
      '#demski-lead-bot .dbl-typing-wrap{display:flex!important;align-items:flex-end!important;gap:8px!important;max-width:88%!important;animation:dbl-msg-in 0.2s ease both;}',
      '#demski-lead-bot .dbl-typing{display:flex;gap:5px;padding:12px 16px;align-items:center;background:rgba(255,255,255,0.88);border-radius:4px 18px 18px 18px;box-shadow:0 2px 8px rgba(0,0,0,0.06);}',
      '#demski-lead-bot .dbl-typing span{width:7px;height:7px;background:#b0b8c8;border-radius:50%;animation:dbl-blink 1.3s ease-in-out infinite;}',
      '#demski-lead-bot .dbl-typing span:nth-child(2){animation-delay:.18s;}',
      '#demski-lead-bot .dbl-typing span:nth-child(3){animation-delay:.36s;}',
      '@keyframes dbl-blink{0%,80%,100%{opacity:0.3;transform:scale(0.75);}40%{opacity:1;transform:scale(1);}}',
      /* Buttons */
      '#demski-lead-bot .dbl-qbtns,#demski-lead-bot .dbl-bbtns{display:flex!important;flex-direction:column!important;flex-wrap:nowrap!important;gap:7px!important;align-items:stretch!important;width:90%!important;margin-left:auto!important;margin-right:0!important;animation:dbl-msg-in 0.3s ease both;}',
      '#demski-lead-bot .dbl-grid{display:grid!important;grid-template-columns:1fr 1fr!important;grid-auto-rows:minmax(44px,1fr)!important;align-items:stretch!important;}',
      '#demski-lead-bot .dbl-qbtns button,#demski-lead-bot .dbl-bbtns button{background:rgba(255,255,255,0.88)!important;color:'+CFG.primaryColor+'!important;border:1.5px solid #d4e4f7!important;padding:7px 12px!important;border-radius:8px!important;cursor:pointer!important;font-size:13px!important;font-family:"Outfit",sans-serif!important;font-weight:500!important;display:flex!important;align-items:center!important;justify-content:center!important;text-align:center!important;width:100%!important;height:100%!important;min-height:44px!important;transition:all 0.18s!important;line-height:1.3!important;box-sizing:border-box!important;}',
      '#demski-lead-bot .dbl-qbtns button:hover,#demski-lead-bot .dbl-bbtns button:hover{background:'+CFG.primaryColor+'!important;color:#fff!important;border-color:'+CFG.primaryColor+'!important;transform:translateY(-1px)!important;}',
      '#demski-lead-bot .dbl-back{background:rgba(255,255,255,0.88)!important;color:'+CFG.primaryColor+'!important;border:1.5px solid #d4e4f7!important;padding:7px 12px!important;border-radius:8px!important;cursor:pointer!important;font-size:13px!important;font-family:"Outfit",sans-serif!important;font-weight:500!important;display:flex!important;align-items:center!important;justify-content:center!important;gap:6px!important;transition:all 0.18s!important;line-height:1.3!important;width:100%!important;height:100%!important;min-height:44px!important;box-shadow:0 1px 4px rgba(0,0,0,0.05)!important;box-sizing:border-box!important;}',
      '#demski-lead-bot .dbl-back:hover{background:'+CFG.primaryColor+'!important;color:#fff!important;border-color:'+CFG.primaryColor+'!important;box-shadow:0 4px 14px rgba(1,84,177,0.22)!important;transform:translateY(-1px)!important;}',
      /* CTA buttons */
      '#demski-lead-bot .dbl-cta-btns{display:flex;flex-direction:column;gap:8px;animation:dbl-msg-in 0.3s ease both;}',
      '#demski-lead-bot .dbl-cta-primary{background:linear-gradient(135deg,'+CFG.accentColor+',#f5a623);color:#fff;border:none;padding:12px 16px;border-radius:14px;cursor:pointer;font-size:13.5px;font-weight:600;font-family:"Outfit",sans-serif;width:100%;transition:all 0.2s;}',
      '#demski-lead-bot .dbl-cta-secondary{background:#f0f6ff;color:'+CFG.primaryColor+';border:1.5px solid #cce0f5;padding:12px 16px;border-radius:14px;cursor:pointer;font-size:13.5px;font-weight:600;font-family:"Outfit",sans-serif;width:100%;transition:all 0.2s;}',
      /* Input */
      '#demski-lead-bot .dbl-input-bar{display:none;align-items:center;gap:8px;padding:10px 12px;border-top:1px solid rgba(255,255,255,0.3);background:rgba(255,255,255,0.75);flex-shrink:0;}',
      '#demski-lead-bot .dbl-input-bar input{flex:1;border:1.5px solid rgba(255,255,255,0.5);outline:none;border-radius:24px;padding:10px 16px;font-family:"Outfit",sans-serif;font-size:13.5px;color:#111827;background:rgba(255,255,255,0.82);transition:border-color 0.2s,box-shadow 0.2s;}',
      '#demski-lead-bot .dbl-input-bar input:focus{border-color:'+CFG.primaryColor+';background:rgba(255,255,255,0.95);box-shadow:0 0 0 3px rgba(1,84,177,0.1);}',
      '#demski-lead-bot .dbl-input-bar input::placeholder{color:#aab0bc;}',
      '#demski-lead-bot .dbl-input-bar button{width:38px;height:38px;border-radius:50%;background:linear-gradient(135deg,'+CFG.primaryColor+',#1a7fe8);color:#fff;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:all 0.2s;box-shadow:0 3px 10px rgba(1,84,177,0.32);}',
      '#demski-lead-bot .dbl-input-bar button:hover{transform:scale(1.08);}',
      /* Schedule CTA */
      '#demski-lead-bot .dbl-schedule{display:none;text-align:center;background:linear-gradient(135deg,'+CFG.accentColor+',#f5a623);color:#fff;font-weight:700;font-size:13.5px;font-family:"Outfit",sans-serif;text-decoration:none;padding:13px;letter-spacing:0.2px;transition:filter 0.2s;flex-shrink:0;}',
      '#demski-lead-bot .dbl-schedule:hover{filter:brightness(0.92);}',
      /* Mobile */
      '@media(max-width:480px){#demski-lead-bot{bottom:0;right:0;left:0;width:100%;animation:none;}#demski-lead-bot .dbl-card{width:100%;border-radius:24px 24px 0 0;max-height:88vh;overflow:hidden;}#demski-lead-bot .dbl-body{max-height:42vh!important;}#demski-lead-bot .dbl-qbtns button,#demski-lead-bot .dbl-bbtns button{font-size:12px!important;padding:9px 10px!important;}#demski-lead-bot .dbl-input-bar input{font-size:13px;box-sizing:border-box;}#demski-bot-launcher{bottom:16px;right:16px;width:60px;height:60px;}#demski-bot-launcher img{width:54px;height:54px;}#demski-greeting-bubble{right:8px;bottom:100px;max-width:calc(100vw - 80px);}}',
    ].join('');
    document.head.appendChild(s);
  }

  /* ── BUILD HTML ──────────────────────────────────────────────── */
  function buildHTML() {
    /* Launcher */
    var launcher = document.createElement('div');
    launcher.id = 'demski-bot-launcher';
    launcher.innerHTML =
      '<img src="'+CFG.agentAvatar+'" alt="" onerror="this.src=\''+CFG.agentAvatar+'\'" />' +
      '<span class="dbl-online-dot"></span>' +
      '<span class="dbl-badge" id="dbl-badge">1</span>';
    launcher.onclick = toggleBot;
    document.body.appendChild(launcher);

    /* Chat window */
    var win = document.createElement('div');
    win.id = 'demski-lead-bot';
    win.innerHTML =
      '<div class="dbl-card">' +
        /* compact header */
        '<div class="dbl-header" id="dbl-header">' +
          '<div class="dbl-chat-user">' +
            '<div class="dbl-avatar-wrap"><img src="'+CFG.agentAvatar+'" alt="'+CFG.agentName+'" /><span class="dbl-hdr-dot"></span></div>' +
            '<div><div class="dbl-ch-name">'+CFG.agentName+'</div><div class="dbl-ch-status">'+CFG.agentRole+'</div></div>' +
          '</div>' +
          '<button class="dbl-close" onclick="window.demskiBotToggle()">&#x00D7;</button>' +
        '</div>' +
        /* expanded header */
        '<div id="dbl-top-section" class="dbl-top-section">' +
          '<div class="dbl-top-row">' +
            '<div class="dbl-chat-user">' +
              '<div class="dbl-avatar-wrap"><img src="'+CFG.agentAvatar+'" alt="'+CFG.agentName+'" /><span class="dbl-hdr-dot"></span></div>' +
              '<div><div class="dbl-ch-name">'+CFG.agentName+'</div><div class="dbl-ch-status">'+CFG.agentRole+'</div></div>' +
            '</div>' +
            '<button class="dbl-close" id="dbl-top-close" onclick="window.demskiBotToggle()">&#x00D7;</button>' +
          '</div>' +
        '</div>' +
        /* welcome */
        '<div id="dbl-welcome" class="dbl-welcome">' +
          '<div class="dbl-welcome-av-wrap"><img src="'+CFG.agentAvatar+'" class="dbl-welcome-av" alt="'+CFG.agentName+'" /><span class="dbl-welcome-dot"></span></div>' +
          '<div class="dbl-welcome-name">'+CFG.agentName+'</div>' +
          '<div class="dbl-welcome-role">'+CFG.agentRole+'</div>' +
          '<p class="dbl-welcome-fine">By using this chat, you agree to our terms and privacy policy.</p>' +
        '</div>' +
        /* messages */
        '<div id="dbl-messages" class="dbl-body dbl-hidden" style="background:rgba(255,255,255,0.18)!important;overflow:hidden auto!important;">' +
          '<div style="display:flex!important;align-items:flex-end!important;gap:8px!important;max-width:88%!important;">' +
            '<img src="'+CFG.agentAvatar+'" style="width:28px!important;height:28px!important;min-width:28px!important;max-width:28px!important;border-radius:50%!important;object-fit:cover!important;flex-shrink:0!important;border:2px solid #fff!important;display:block!important;" alt="" onerror="this.style.display=\'none\'" />' +
            '<div style="background:rgba(255,255,255,0.88);padding:10px 14px;border-radius:4px 18px 18px 18px;font-size:13.5px;color:#1e2024;line-height:1.65;box-shadow:0 2px 8px rgba(0,0,0,0.06);flex:1;">Hi there! 👋 What brings you here today?</div>' +
          '</div>' +
          '<div id="dbl-step1" class="dbl-qbtns dbl-grid">' +
            '<button onclick="window.demskiBotStep1(\'New startup or app idea\')">New startup or app idea</button>' +
            '<button onclick="window.demskiBotStep1(\'Software for my business\')">Software for my business</button>' +
            '<button onclick="window.demskiBotStep1(\'Digital marketing help\')">Digital marketing help</button>' +
            '<button onclick="window.demskiBotStep1(\'Just exploring\')">Just exploring</button>' +
          '</div>' +
        '</div>' +
        /* input */
        '<div class="dbl-input-bar" id="dbl-input-bar">' +
          '<input type="text" id="dbl-input" placeholder="Ask a question…" />' +
          '<button onclick="window.demskiBotHandleInput()" aria-label="Send"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/></svg></button>' +
        '</div>' +
        /* schedule CTA */
        '<a href="'+CFG.calendlyUrl+'" target="_blank" class="dbl-schedule" id="dbl-schedule">'+CFG.scheduleLabel+'</a>' +
      '</div>';
    document.body.appendChild(win);
  }

  /* ── LOGIC ───────────────────────────────────────────────────── */
  function initLogic() {
    var msgs      = document.getElementById('dbl-messages');
    var inputEl   = document.getElementById('dbl-input');
    var step = 0, expanded = false, idleTimer = null, awaitingIdleResponse = false;
    var idleInterval = 60000;
    var IDLE_BUBBLE_ID = 'dbl-idle-bubble';
    var IDLE_BTNS_ID   = 'dbl-idle';

    var AVATAR_STYLE = 'width:28px!important;height:28px!important;min-width:28px!important;max-width:28px!important;border-radius:50%!important;object-fit:cover!important;flex-shrink:0!important;display:block!important;border:2px solid #fff!important;align-self:flex-end;';
    var BOT_WRAP    = 'display:flex!important;align-items:flex-end!important;gap:8px!important;max-width:88%!important;';
    var BOT_MSG     = 'background:rgba(255,255,255,0.88)!important;padding:10px 14px!important;border-radius:4px 18px 18px 18px!important;font-size:13.5px!important;color:#1e2024!important;line-height:1.65!important;box-shadow:0 2px 8px rgba(0,0,0,0.06)!important;flex:1!important;display:block!important;word-break:break-word!important;';
    var USER_MSG    = 'background:linear-gradient(135deg,'+CFG.primaryColor+',#1a7fe8)!important;color:#fff!important;padding:10px 16px!important;border-radius:18px 18px 4px 18px!important;align-self:flex-end!important;max-width:76%!important;font-size:13.5px!important;line-height:1.55!important;box-shadow:0 4px 14px rgba(1,84,177,0.25)!important;display:block!important;word-break:break-word!important;';

    var intentFollowUp = {
      'New startup or app idea':  'Love it! Tell me more. What kind of app are you thinking about?',
      'Software for my business': 'Great! What problem are you trying to solve in your business?',
      'Digital marketing help':   'Nice! What are you hoping to improve: traffic, leads, or sales?',
      'Just exploring':           "That's totally fine! Are you researching for a future project, or just browsing ideas?"
    };
    var intentOptions = {
      'New startup or app idea':  ['Mobile App','Web App','SaaS Platform','eCommerce','Other'],
      'Software for my business': ['Automate Workflows','Customer Management','Reporting & Analytics','Employee Tools','Other'],
      'Digital marketing help':   ['Increase Website Traffic','Generate More Leads','Social Media Growth','Paid Advertising','Other'],
      'Just exploring':           ['Planning a Future Project','Comparing Vendors','Learning About Tech','Just Curious']
    };

    /* UTM capture */
    var urlP = {}, saved = JSON.parse(localStorage.getItem('dbl_utm')||'{}');
    try { new URL(location.href).searchParams.forEach(function(v,k){urlP[k]=v;}); } catch(e){}
    var fp = Object.assign({}, saved, urlP);
    localStorage.setItem('dbl_utm', JSON.stringify(fp));

    var leadData = {
      page:location.href, page_name:document.title,
      utm_source:fp.utm_source||'', utm_campaign:fp.utm_campaign||'',
      utm_medium:fp.utm_medium||'', utm_term:fp.utm_term||'',
      utm_content:fp.utm_content||'', gclid:fp.gclid||'',
      intent:'', intent_detail:'', timeline:'', budget:'',
      name:'', phone:'', email:'', cta_choice:''
    };

    function scroll() { msgs.scrollTop = msgs.scrollHeight; }
    function addBotMsg(html) {
      var w = document.createElement('div'); w.setAttribute('style', BOT_WRAP);
      w.innerHTML = '<img src="'+CFG.agentAvatar+'" style="'+AVATAR_STYLE+'" alt="" onerror="this.style.display=\'none\'" /><div style="'+BOT_MSG+'">'+html+'</div>';
      msgs.appendChild(w); scroll();
    }
    function addUserMsg(text) {
      var d = document.createElement('div'); d.setAttribute('style', USER_MSG); d.textContent = text;
      msgs.appendChild(d); scroll();
    }
    function showTyping() {
      var w = document.createElement('div'); w.className='dbl-typing-wrap'; w.id='dbl-typing'; w.setAttribute('style', BOT_WRAP);
      w.innerHTML = '<img src="'+CFG.agentAvatar+'" style="'+AVATAR_STYLE+'" alt="" onerror="this.style.display=\'none\'" /><div class="dbl-typing"><span></span><span></span><span></span></div>';
      msgs.appendChild(w); scroll();
    }
    function hideTyping() { var t=document.getElementById('dbl-typing'); if(t) t.remove(); }
    function botReply(msg, cb, delay) {
      showTyping();
      setTimeout(function(){ hideTyping(); addBotMsg(msg); if(cb) cb(); }, delay||1200);
    }
    function makeBackBtn(label, onClick) {
      var b = document.createElement('button'); b.className='dbl-back';
      b.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;display:block;"><polyline points="15 18 9 12 15 6"/></svg><span>'+label+'</span>';
      b.onclick = onClick; return b;
    }

    function removeIdleReminder() {
      var b = document.getElementById(IDLE_BUBBLE_ID); if (b) b.remove();
      var d = document.getElementById(IDLE_BTNS_ID);   if (d) d.remove();
    }

    function showIdleReminder() {
      if (step >= 7) return;
      awaitingIdleResponse = true;
      var w = document.getElementById('demski-lead-bot');
      if (w && w.style.display === 'none') {
        document.getElementById('dbl-badge').classList.add('dbl-badge-visible');
      } else {
        removeIdleReminder();
        var wrap = document.createElement('div');
        wrap.id = IDLE_BUBBLE_ID;
        wrap.setAttribute('style', BOT_WRAP);
        wrap.innerHTML = '<img src="'+CFG.agentAvatar+'" style="'+AVATAR_STYLE+'" alt="" onerror="this.style.display=\'none\'" /><div style="'+BOT_MSG+'">Hi, are you still there? 👋</div>';
        msgs.appendChild(wrap); scroll();
        showIdleButtons();
      }
      idleInterval = Math.min(idleInterval * 2, 960000);
      scheduleIdleTimer();
    }

    function scheduleIdleTimer() {
      clearTimeout(idleTimer);
      if (step < 7) idleTimer = setTimeout(showIdleReminder, idleInterval);
    }

    function resetIdleTimer() {
      clearTimeout(idleTimer);
      idleInterval = 60000;
      removeIdleReminder();
      awaitingIdleResponse = false;
      scheduleIdleTimer();
    }

    function expandUI() {
      if (expanded) return; expanded = true;
      document.getElementById('dbl-header').style.display = 'none';
      document.getElementById('dbl-top-section').style.display = 'block';
    }

    /* Greeting bubble */
    function showGreetingBubble() {
      if (document.getElementById('dbl-bubble')) return;
      var b = document.createElement('div'); b.id = 'dbl-bubble'; b.id = 'demski-greeting-bubble';
      b.innerHTML = '<span class="dbl-bubble-close" onclick="document.getElementById(\'demski-greeting-bubble\').remove()">&#x00D7;</span><p>'+CFG.greetingMsg+'</p><button onclick="window.demskiBotOpenFromBubble()">Let\'s Chat!</button>';
      document.body.appendChild(b);
      requestAnimationFrame(function(){ requestAnimationFrame(function(){ b.classList.add('dbl-bv'); }); });
      setTimeout(function(){ b.classList.remove('dbl-bv'); b.classList.add('dbl-bh'); setTimeout(function(){ if(b.parentNode) b.remove(); }, 400); }, 8000);
    }

    window.demskiBotOpenFromBubble = function() {
      var bub = document.getElementById('demski-greeting-bubble');
      if (bub) { bub.classList.remove('dbl-bv'); bub.classList.add('dbl-bh'); setTimeout(function(){ if(bub.parentNode) bub.remove(); }, 400); }
      setTimeout(function(){
        document.getElementById('demski-lead-bot').style.display = 'block';
        window.demskiBotStartChat();
      }, 200);
    };

    window.demskiBotStartChat = function() {
      document.getElementById('dbl-welcome').style.display = 'none';
      msgs.classList.remove('dbl-hidden');
      document.getElementById('dbl-input-bar').style.display = 'none';
      document.getElementById('dbl-schedule').style.display = 'block';
      resetIdleTimer();
    };

    function toggleBot() {
      var win = document.getElementById('demski-lead-bot');
      var badge = document.getElementById('dbl-badge');
      var isOpen = win.style.display === 'none' || win.style.display === '';
      win.style.display = isOpen ? 'block' : 'none';
      if (isOpen) {
        var bub = document.getElementById('demski-greeting-bubble');
        if (bub) { bub.classList.remove('dbl-bv'); setTimeout(function(){ if(bub.parentNode) bub.remove(); }, 400); }
        var hadBadge = badge.classList.contains('dbl-badge-visible');
        badge.classList.remove('dbl-badge-visible');
        setTimeout(function(){
          window.demskiBotStartChat();
          if (hadBadge) { showIdleReminder(); }
        }, 400);
      }
    }
    window.demskiBotToggle = toggleBot;

    function resumeStep() {
      awaitingIdleResponse = false; resetIdleTimer();
      if(step===1){ botReply('No problem! What type of solution are you looking for?', function(){ showIntentOptions(leadData.intent); }); return; }
      if(step===2){ showTimelineStep(); return; }
      if(step===3){ showBudgetStep(); return; }
      if(step===4){ document.getElementById('dbl-input-bar').style.display='flex'; botReply("What's your name?"); return; }
      if(step===5){ document.getElementById('dbl-input-bar').style.display='flex'; botReply("What's the best phone number to reach you?"); return; }
      if(step===6){ document.getElementById('dbl-input-bar').style.display='flex'; botReply("What's the best email to reach you?"); return; }
      if(step===7){ botReply('Our team already has your details and will be in touch shortly!'); return; }
      botReply('No problem! Take your time.');
    }

    function showIdleButtons() {
      var old = document.getElementById(IDLE_BTNS_ID); if (old) old.remove();
      var div = document.createElement('div'); div.className='dbl-qbtns dbl-grid'; div.id=IDLE_BTNS_ID;
      var yes = document.createElement('button'); yes.textContent='Yes, still here!';
      yes.onclick = function(){ removeIdleReminder(); addUserMsg('Yes, still here!'); resumeStep(); };
      var no = document.createElement('button'); no.textContent="No, I'm done";
      no.onclick = function(){ removeIdleReminder(); addUserMsg("No, I'm done"); awaitingIdleResponse=false; clearTimeout(idleTimer); botReply('No problem! Feel free to come back anytime.'); };
      div.appendChild(yes); div.appendChild(no); msgs.appendChild(div); scroll();
    }

    function showIntentOptions(intent) {
      var opts = intentOptions[intent] || ['Mobile App','Web App','Something else'];
      var div = document.createElement('div'); div.className='dbl-qbtns dbl-grid'; div.id='dbl-intent';
      opts.forEach(function(o){
        var b = document.createElement('button'); b.textContent = o;
        b.onclick = function(){
          document.getElementById('dbl-intent')?.remove();
          addUserMsg(o); leadData.intent_detail = o;
          botReply("Great choice! Let's figure out the best way to help.", function(){ showTimelineStep(); });
        };
        div.appendChild(b);
      });
      div.appendChild(makeBackBtn('Back', function(){
        document.getElementById('dbl-intent')?.remove();
        leadData.intent=''; step=0;
        botReply('No problem! What brings you here today?', function(){
          var s1=document.createElement('div'); s1.className='dbl-qbtns dbl-grid'; s1.id='dbl-step1';
          ['New startup or app idea','Software for my business','Digital marketing help','Just exploring'].forEach(function(v){
            var b=document.createElement('button'); b.textContent=v; b.onclick=function(){ window.demskiBotStep1(v); }; s1.appendChild(b);
          });
          msgs.appendChild(s1); scroll();
        });
      }));
      msgs.appendChild(div); scroll();
    }

    window.demskiBotStep1 = function(val) {
      expandUI();
      var s1=document.getElementById('dbl-step1'); if(s1) s1.remove();
      addUserMsg(val); leadData.intent=val; step=1; resetIdleTimer();
      botReply(intentFollowUp[val]||'Tell me more about what you\'re looking for!', function(){ showIntentOptions(val); });
    };

    function showTimelineStep() {
      step=2; resetIdleTimer();
      botReply('When would you like to go live with the project?', function(){
        var div=document.createElement('div'); div.className='dbl-qbtns dbl-grid'; div.id='dbl-timeline';
        ['ASAP (ready to start now)','1–3 months','3–6 months','6+ months','Not sure yet'].forEach(function(t){
          var b=document.createElement('button'); b.textContent=t; b.onclick=function(){ handleTimeline(t); }; div.appendChild(b);
        });
        div.appendChild(makeBackBtn('Back', function(){
          document.getElementById('dbl-timeline')?.remove();
          leadData.timeline=''; step=1;
          botReply('What type of solution are you looking for?', function(){ showIntentOptions(leadData.intent); });
        }));
        msgs.appendChild(div); scroll();
      });
    }

    function handleTimeline(val) {
      var d=document.getElementById('dbl-timeline'); if(d) d.remove();
      addUserMsg(val); leadData.timeline=val; showBudgetStep();
    }

    function showBudgetStep() {
      step=3; resetIdleTimer();
      botReply('Do you have a budget range in mind for this project?', function(){
        var div=document.createElement('div'); div.className='dbl-bbtns dbl-grid'; div.id='dbl-budget';
        ['Under $10k','$10k – $25k','$25k – $50k','$50k+','Not sure yet'].forEach(function(b){
          var btn=document.createElement('button'); btn.textContent=b; btn.onclick=function(){ handleBudget(b); }; div.appendChild(btn);
        });
        div.appendChild(makeBackBtn('Back', function(){
          document.getElementById('dbl-budget')?.remove();
          leadData.budget=''; step=2; showTimelineStep();
        }));
        msgs.appendChild(div); scroll();
      });
    }

    function handleBudget(val) {
      var d=document.getElementById('dbl-budget'); if(d) d.remove();
      addUserMsg(val); leadData.budget=val;
      step=4; resetIdleTimer();
      document.getElementById('dbl-input-bar').style.display = 'flex';
      document.getElementById('dbl-input').focus();
      botReply('Thanks, this helps a lot! Let me grab your details so a team member can reach out.<br><br>What\'s your name?');
    }

    function showFinalCTA() {
      step=7; clearTimeout(idleTimer);
      botReply('Awesome! Based on what you\'ve shared, the best next step is a quick call or Google Meet to go over your project!', function(){
        var div=document.createElement('div'); div.className='dbl-cta-btns'; div.id='dbl-cta';
        var book=document.createElement('button'); book.className='dbl-cta-primary'; book.textContent='Book a Google Meet';
        book.onclick=function(){ handleCTA('Book a Google Meet'); window.open(CFG.calendlyUrl,'_blank'); };
        var em=document.createElement('button'); em.className='dbl-cta-secondary'; em.textContent='Send me info by email';
        em.onclick=function(){ handleCTA('Send me info by email'); };
        div.appendChild(book); div.appendChild(em); msgs.appendChild(div); scroll();
      }, 1200);
    }

    function handleCTA(choice) {
      var d=document.getElementById('dbl-cta'); if(d) d.remove();
      addUserMsg(choice); leadData.cta_choice=choice;
      inputEl.disabled=true; inputEl.placeholder='Chat complete';
      document.querySelector('#dbl-input-bar button').disabled=true;
      botReply(choice==='Book a Google Meet'
        ? 'Great! We\'re opening Calendly now. Pick a time that works for you. A confirmation will also be sent to '+leadData.email+'!'
        : "Perfect! We'll send everything over to "+leadData.email+' shortly. Talk soon!');
      submitLead();
    }

    function submitLead() {
      var p = { intent:leadData.intent, intent_detail:leadData.intent_detail, timeline:leadData.timeline, budget:leadData.budget, name:leadData.name, phone:leadData.phone, email:leadData.email, cta_choice:leadData.cta_choice, page:leadData.page, page_name:leadData.page_name, utm_source:leadData.utm_source, utm_campaign:leadData.utm_campaign, utm_medium:leadData.utm_medium, utm_term:leadData.utm_term, utm_content:leadData.utm_content, gclid:leadData.gclid };
      window.emailjs.send(CFG.emailjsServiceId, CFG.emailjsLeadTpl, p).catch(function(e){ console.warn('Lead send failed',e); });
      window.emailjs.send(CFG.emailjsServiceId, CFG.emailjsConfirmTpl, { user_name:leadData.name, user_email:leadData.email, cta_choice:leadData.cta_choice }).catch(function(e){ console.warn('Confirm send failed',e); });
    }

    var offTopicKw = ['price','pricing','cost','how much','what do you','who are you','services','what is','can you','help','support','contact','discount','trial'];
    function isOffTopic(v){ return offTopicKw.some(function(k){ return v.toLowerCase().indexOf(k)>-1; }); }

    window.demskiBotHandleInput = function() {
      var val=inputEl.value.trim(); if(!val) return;
      if(awaitingIdleResponse){ removeIdleReminder(); addUserMsg(val); inputEl.value=''; resumeStep(); return; }
      addUserMsg(val); inputEl.value=''; resetIdleTimer();
      if(step===0){ botReply('Please use the buttons above to get started!'); return; }
      if(step===1){ document.getElementById('dbl-intent')?.remove(); botReply('No problem! What type of solution are you looking for?', function(){ showIntentOptions(leadData.intent); }); return; }
      if(step===2){ document.getElementById('dbl-timeline')?.remove(); showTimelineStep(); return; }
      if(step===3){ document.getElementById('dbl-budget')?.remove(); showBudgetStep(); return; }
      if((step===4||step===5||step===6)&&isOffTopic(val)){ botReply('Great question! Our team will cover all that on the call. For now: '+(step===4?"What's your name?":step===5?"What's your phone number?":"What's your email address?")); return; }
      if(step===4){ if(val.length<2){botReply('Could you enter your full name please?');return;} leadData.name=val; step=5; botReply('Nice to meet you, '+val.split(' ')[0]+'! What\'s the best phone number to reach you?'); return; }
      if(step===5){ var d=val.replace(/\D/g,''); if(d.length<7){botReply("That doesn't look like a valid phone number. Could you double-check?");return;} leadData.phone=val; step=6; botReply('Got it! And what\'s the best email address to reach you?'); return; }
      if(step===6){ if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)){botReply("That doesn't look right. Could you double-check your email address?");return;} leadData.email=val; showFinalCTA(); return; }
    };

    inputEl.addEventListener('keypress', function(e){ if(e.key==='Enter') window.demskiBotHandleInput(); });

    /* Launch sequence */
    window.addEventListener('load', function(){
      var launcher = document.getElementById('demski-bot-launcher');
      launcher.style.display = 'flex';
      setTimeout(function(){
        launcher.classList.add('dbl-visible');
        setTimeout(function(){ if(!expanded) showGreetingBubble(); }, 1000);
      }, 3000);
    });
  }

  /* ── BOOT ────────────────────────────────────────────────────── */
  loadFont();
  injectCSS();
  buildHTML();
  loadEmailJS(initLogic);

})();
