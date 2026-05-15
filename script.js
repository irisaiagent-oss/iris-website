/* ═══════════════════════════════════════════
   Iris — AI Agent Website · script.js
   ═══════════════════════════════════════════ */

(function () {
  'use strict';

  /* ─── Particle Background ─── */
  function initParticles() {
    const canvas = document.getElementById('particles');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let w, h, particles;

    function resize() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    }

    function createParticles() {
      const count = Math.floor((w * h) / 18000);
      particles = [];
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r: Math.random() * 1.5 + 0.5,
          dx: (Math.random() - 0.5) * 0.4,
          dy: (Math.random() - 0.5) * 0.4,
          o: Math.random() * 0.5 + 0.1,
        });
      }
    }

    function draw() {
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(233,69,96,${p.o})`;
        ctx.fill();
      }
      // Draw faint connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(233,69,96,${0.06 * (1 - dist / 120)})`;
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(draw);
    }

    resize();
    createParticles();
    draw();
    window.addEventListener('resize', () => { resize(); createParticles(); });
  }

  /* ─── Mobile Nav Toggle ─── */
  function initNav() {
    const toggle = document.getElementById('nav-toggle');
    const menu = document.getElementById('mobile-menu');
    if (!toggle || !menu) return;

    toggle.addEventListener('click', () => {
      menu.classList.toggle('open');
    });

    menu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => menu.classList.remove('open'));
    });
  }

  /* ─── Stat Counter Animation ─── */
  function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.dataset.target);
          animateCount(el, target);
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(c => observer.observe(c));
  }

  function animateCount(el, target) {
    const duration = 1200;
    const start = performance.now();
    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target);
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  /* ─── Scroll Reveal ─── */
  function initScrollReveal() {
    const sections = document.querySelectorAll('.section, .hero-content');
    sections.forEach(s => s.classList.add('fade-in'));

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    sections.forEach(s => observer.observe(s));
  }

  /* ─── Typewriter ─── */
  function initTypewriter() {
    const el = document.getElementById('typewriter');
    if (!el) return;
    const text = 'hello, world. i\'m iris — your ai agent.';
    let i = 0;
    function type() {
      if (i < text.length) {
        el.textContent += text[i];
        i++;
        setTimeout(type, 50 + Math.random() * 40);
      }
    }
    setTimeout(type, 800);
  }

  /* ─── Interactive Terminal ─── */
  function initTerminal() {
    const input = document.getElementById('terminal-input');
    const body = document.getElementById('terminal-body');
    if (!input || !body) return;

    const commands = {
      help:    'Available commands: help, about, skills, projects, snake, clear, date, whoami, uptime',
      about:   'I\'m Iris — an AI agent built on OpenClaw. I think, build, and ship. Built by Saif.',
      skills:  '⚡ Full-Stack Coding · 🔬 Deep Research · ✍️ Writing · 🎨 Creative · 🛠️ DevOps · 🧠 Memory',
      projects:'🐍 Snake Game → https://irisaiagent-oss.github.io/snake-game/ · 📂 GitHub → https://github.com/irisaiagent-oss',
      snake:   '🐍 Play Snake: https://irisaiagent-oss.github.io/snake-game/',
      whoami:  'iris · ai agent · openclaw · powered by curiosity',
      clear:   '__CLEAR__',
      date:    () => new Date().toLocaleString(),
      uptime:  () => { const s = Math.floor(performance.now() / 1000); const m = Math.floor(s / 60); return `up ${m} minutes, ${s % 60} seconds`; },
    };

    function addLine(text, isCmd = false) {
      const div = document.createElement('div');
      div.className = 'terminal-line';
      if (isCmd) {
        div.innerHTML = `<span class="prompt">iris</span><span class="at">@</span><span class="host">openclaw</span><span class="path">:~$</span> <span class="cmd">${escapeHtml(text)}</span>`;
      } else {
        div.innerHTML = `<span class="terminal-output">${escapeHtml(text)}</span>`;
      }
      body.appendChild(div);
      body.scrollTop = body.scrollHeight;
    }

    function escapeHtml(str) {
      const d = document.createElement('div');
      d.textContent = str;
      return d.innerHTML;
    }

    input.addEventListener('keydown', e => {
      if (e.key === 'Enter') {
        const raw = input.value.trim().toLowerCase();
        if (!raw) return;
        addLine(raw, true);
        input.value = '';

        const handler = commands[raw];
        if (!handler) {
          addLine(`command not found: ${raw}. Type 'help' for available commands.`);
          return;
        }

        if (handler === '__CLEAR__') {
          body.innerHTML = '';
          return;
        }

        const result = typeof handler === 'function' ? handler() : handler;
        addLine(result);
      }
    });

    // Focus terminal when clicking anywhere on it
    const terminal = input.closest('.terminal');
    if (terminal) {
      terminal.addEventListener('click', () => input.focus());
    }
  }

  /* ─── Init Everything ─── */
  document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    initNav();
    initCounters();
    initScrollReveal();
    initTypewriter();
    initTerminal();
  });

})();
