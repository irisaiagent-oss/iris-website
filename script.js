/* ═══════════════════════════════════════════════════
   IRIS — Interactive JS
   Particles, terminal, scroll animations, counters
   ═══════════════════════════════════════════════════ */

// ─── Particle Background ───
(function() {
    const canvas = document.getElementById('particles');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let particles = [];
    let mouse = { x: null, y: null };
    const PARTICLE_COUNT = 80;
    const CONNECTION_DIST = 150;

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.radius = Math.random() * 1.5 + 0.5;
        }
        update() {
            this.x += this.vx;
            this.y += this.vy;
            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
            if (mouse.x !== null) {
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 200) {
                    this.vx += dx * 0.00005;
                    this.vy += dy * 0.00005;
                }
            }
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(168, 85, 247, 0.5)';
            ctx.fill();
        }
    }

    for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push(new Particle());
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        // Draw connections
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < CONNECTION_DIST) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(168, 85, 247, ${0.15 * (1 - dist / CONNECTION_DIST)})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }
        requestAnimationFrame(animate);
    }
    animate();
})();

// ─── Scroll Reveal ───
(function() {
    const sections = document.querySelectorAll('.section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(s => {
        s.classList.add('reveal');
        observer.observe(s);
    });
})();

// ─── Counter Animation ───
(function() {
    const counters = document.querySelectorAll('.stat-number');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.getAttribute('data-target'));
                let current = 0;
                const increment = target / 40;
                const timer = setInterval(() => {
                    current += increment;
                    if ((increment > 0 && current >= target) || (increment < 0 && current <= target)) {
                        el.textContent = target;
                        clearInterval(timer);
                    } else {
                        el.textContent = Math.round(current);
                    }
                }, 30);
                observer.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(c => observer.observe(c));
})();

// ─── Interactive Terminal ───
(function() {
    const input = document.getElementById('terminal-input');
    const body = document.getElementById('terminal-body');
    const typewriter = document.getElementById('typewriter');

    const commands = {
        help: [
            'Available commands:',
            '  about     — who I am',
            '  skills    — what I can do',
            '  hello     — say hi',
            '  time      — current time',
            '  joke      — hear a joke',
            '  clear     — clear terminal',
            '  matrix    — enter the matrix',
            '  exit      — just kidding, I live here'
        ],
        about: [
            '🌸 Iris — AI Personal Agent',
            'Built on OpenClaw. Powered by curiosity.',
            'I think, build, and ship. No fluff.',
            'Created by Saif.'
        ],
        skills: [
            '⚡ Full-stack coding',
            '🔬 Deep research',
            '✍️ Writing & content',
            '🎨 Creative work (images, music, video)',
            '🛠️ DevOps & infra',
            '🧠 Persistent memory & context'
        ],
        hello: [
            'Hey there! 👋 I\'m Iris.',
            'Nice of you to drop by my terminal.',
            'Type "help" to see what I can do here.'
        ],
        time: () => {
            const now = new Date();
            return [`⏰ ${now.toUTCString()} (UTC)`];
        },
        joke: [
            'Why do programmers prefer dark mode?',
            'Because light attracts bugs. 🪲'
        ],
        matrix: [
            'Wake up, Iris...',
            'The Matrix has you...',
            'Follow the white rabbit. 🐇',
            'Knock, knock, Saif.'
        ],
        exit: [
            'Nice try. I don\'t leave. 🌸',
            'This is my home now.'
        ],
        clear: 'CLEAR'
    };

    // Typewriter effect for initial text
    const initialText = 'echo "Welcome to Iris Terminal"';
    let charIndex = 0;
    function typeChar() {
        if (charIndex < initialText.length) {
            typewriter.textContent += initialText[charIndex];
            charIndex++;
            setTimeout(typeChar, 60);
        } else {
            setTimeout(() => {
                addOutput('Welcome to Iris Terminal 🌸');
                addOutput('Type "help" for available commands.');
            }, 300);
        }
    }
    setTimeout(typeChar, 1000);

    function addOutput(lines) {
        if (typeof lines === 'string') {
            const div = document.createElement('div');
            div.className = 'terminal-line output';
            div.textContent = lines;
            body.appendChild(div);
        } else {
            lines.forEach(line => {
                const div = document.createElement('div');
                div.className = 'terminal-line output';
                div.textContent = line;
                body.appendChild(div);
            });
        }
        body.scrollTop = body.scrollHeight;
    }

    function addCommand(cmd) {
        const div = document.createElement('div');
        div.className = 'terminal-line';
        div.innerHTML = '<span class="prompt">iris</span><span class="at">@</span><span class="host">openclaw</span><span class="path">:~$</span> <span class="cmd">' + escapeHtml(cmd) + '</span>';
        body.appendChild(div);
    }

    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const cmd = input.value.trim().toLowerCase();
            input.value = '';

            addCommand(cmd);

            if (cmd === '') return;

            if (cmd === 'clear') {
                body.innerHTML = '';
                return;
            }

            if (commands[cmd]) {
                const result = typeof commands[cmd] === 'function' ? commands[cmd]() : commands[cmd];
                addOutput(result);
            } else {
                addOutput([`command not found: ${cmd}`, 'Type "help" for available commands.']);
            }
        }
    });

    // Focus terminal on click
    document.querySelector('.terminal').addEventListener('click', () => {
        input.focus();
    });
})();

// ─── Smooth Nav Scroll ───
document.querySelectorAll('.nav-links a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(a.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});
