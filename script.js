// ==========================================
// Artificia AI — Landing Page Interactions
// ==========================================
document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // Scroll Reveal Animation Observer
    // ==========================================
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, revealOptions);

    document.querySelectorAll('.reveal').forEach(el => {
        revealObserver.observe(el);
    });

    // ==========================================
    // Hover-Expand Gallery (Course Phases)
    // ==========================================
    const gallery = document.getElementById('expandGallery');
    if (gallery) {
        const panels = gallery.querySelectorAll('.expand-panel');

        panels.forEach((panel) => {
            // Hover — desktop
            panel.addEventListener('mouseenter', () => {
                panels.forEach(p => p.classList.remove('active'));
                panel.classList.add('active');
            });

            // Click — mobile + desktop fallback
            panel.addEventListener('click', () => {
                panels.forEach(p => p.classList.remove('active'));
                panel.classList.add('active');
            });
        });

        // Touch support for mobile
        let touchStartX = 0;
        gallery.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
        }, { passive: true });
    }

    // ==========================================
    // Curriculum Accordion (12 Weeks)
    // ==========================================
    const accordion = document.getElementById('curriculumAccordion');
    if (accordion) {
        const weekHeaders = accordion.querySelectorAll('.week-header');

        weekHeaders.forEach(header => {
            header.addEventListener('click', () => {
                const card = header.closest('.week-card');
                const isOpen = card.classList.contains('open');

                // Close all other cards
                accordion.querySelectorAll('.week-card.open').forEach(openCard => {
                    if (openCard !== card) {
                        openCard.classList.remove('open');
                    }
                });

                // Toggle current card
                card.classList.toggle('open', !isOpen);
            });
        });
    }

    // ==========================================
    // Smooth Scrolling for Anchor Links
    // ==========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // ==========================================
    // Form Handling (Webhook Placeholder)
    // ==========================================
    const leadForm = document.getElementById('leadForm');
    if (leadForm) {
        leadForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const submitBtn = document.getElementById('submitBtn');
            const originalText = submitBtn.innerHTML;

            // Loading state
            submitBtn.innerHTML = 'PROCESSING... <i class="fas fa-spinner fa-spin"></i>';
            submitBtn.disabled = true;

            // Gather Data
            const formData = {
                name: document.getElementById('name').value,
                phone: document.getElementById('phone').value,
                email: document.getElementById('email').value,
                interest: document.getElementById('interest').value,
                source: "FB_Ads_Landing_Page"
            };

            // Add submission timestamp
            formData.submitted_at = new Date().toISOString();

            console.log("Form Data Prepared:", formData);

            try {
                // POST to n8n webhook → Google Sheets
                const WEBHOOK_URL = 'https://miniature-ugt6x.crab.containers.automata.host/webhook/d074af58-c29d-461b-89ea-dd527663b959';
                await fetch(WEBHOOK_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData)
                });

                // Show Success State
                leadForm.classList.add('hidden');
                document.getElementById('successState').classList.remove('hidden');

            } catch (error) {
                console.error('Submission error:', error);
                alert('We could not submit your request. Please try again or message us on WhatsApp.');
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }
        });
    }

    // ==========================================
    // Parallax Hero (subtle scroll offset)
    // ==========================================
    const hero = document.querySelector('.hero-section');
    if (hero && window.innerWidth > 768) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            hero.style.backgroundPositionY = `${scrolled * 0.3}px`;
        }, { passive: true });
    }

    // ==========================================
    // FAQ Accordion
    // ==========================================
    document.querySelectorAll('.faq-question').forEach(btn => {
        btn.addEventListener('click', () => {
            const item = btn.closest('.faq-item');
            const isOpen = item.classList.contains('open');

            // Close all open items
            document.querySelectorAll('.faq-item.open').forEach(openItem => {
                openItem.classList.remove('open');
            });

            // Open clicked item if it was closed
            if (!isOpen) {
                item.classList.add('open');
            }
        });
    });

    // ==========================================
    // Countdown Timer
    // ==========================================
    function getCountdownTarget() {
        // Set deadline: end of the current month (April 1, 2026 00:00 IST)
        const deadline = new Date('2026-04-01T00:00:00+05:30');
        return deadline;
    }

    function updateCountdown() {
        const now = new Date();
        const target = getCountdownTarget();
        let diff = Math.max(0, target - now);

        const days    = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours   = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        const pad = n => String(n).padStart(2, '0');

        // Hero countdown
        const hDays  = document.getElementById('heroDays');
        const hHours = document.getElementById('heroHours');
        const hMins  = document.getElementById('heroMins');
        const hSecs  = document.getElementById('heroSecs');
        if (hDays)  hDays.textContent  = pad(days);
        if (hHours) hHours.textContent = pad(hours);
        if (hMins)  hMins.textContent  = pad(minutes);
        if (hSecs)  hSecs.textContent  = pad(seconds);

        // Sticky bar countdown
        const sDays  = document.getElementById('stickyDays');
        const sHours = document.getElementById('stickyHours');
        const sMins  = document.getElementById('stickyMins');
        const sSecs  = document.getElementById('stickySecs');
        if (sDays)  sDays.textContent  = pad(days);
        if (sHours) sHours.textContent = pad(hours);
        if (sMins)  sMins.textContent  = pad(minutes);
        if (sSecs)  sSecs.textContent  = pad(seconds);
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);

    // ==========================================
    // Sticky CTA Bar — show after hero section
    // ==========================================
    const stickyCta = document.getElementById('stickyCta');
    if (stickyCta) {
        const heroSection = document.querySelector('.hero-section');

        const stickyObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) {
                    stickyCta.classList.add('visible');
                } else {
                    stickyCta.classList.remove('visible');
                }
            });
        }, { threshold: 0 });

        if (heroSection) stickyObserver.observe(heroSection);
    }
});

// ==========================================
// Quote Rotator — auto-fade every 4 seconds
// ==========================================
(function initQuoteRotator() {
    const items = document.querySelectorAll('.qr-item');
    const dots  = document.querySelectorAll('.qr-dot');
    if (!items.length) return;

    let current = 0;

    function goTo(n) {
        // remove active from current
        items[current].classList.remove('active');
        if (dots[current]) dots[current].classList.remove('active');
        // set new
        current = ((n % items.length) + items.length) % items.length;
        items[current].classList.add('active');
        if (dots[current]) dots[current].classList.add('active');
    }

    // Dot click
    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
            clearInterval(timer);
            goTo(i);
            timer = setInterval(() => goTo(current + 1), 4000);
        });
    });

    // Auto-rotate every 4s
    let timer = setInterval(() => goTo(current + 1), 4000);
})();

// ==========================================
// Three.js Neural Network Background
// ==========================================
(function initNeuralBg() {
    if (typeof THREE === 'undefined') return;

    const canvas = document.getElementById('neuralCanvas');
    if (!canvas) return;

    const W = window.innerWidth;
    const H = window.innerHeight;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, W / H, 1, 3000);
    camera.position.z = 700;

    // --- Particles ---
    const N = 110;
    const SPREAD_X = 900;
    const SPREAD_Y = 500;
    const pts = [];

    for (let i = 0; i < N; i++) {
        pts.push({
            x: (Math.random() - 0.5) * SPREAD_X,
            y: (Math.random() - 0.5) * SPREAD_Y,
            z: (Math.random() - 0.5) * 300,
            vx: (Math.random() - 0.5) * 0.35,
            vy: (Math.random() - 0.5) * 0.35,
        });
    }

    // Points (lime nodes)
    const ptGeo = new THREE.BufferGeometry();
    const ptPos = new Float32Array(N * 3);
    ptGeo.setAttribute('position', new THREE.BufferAttribute(ptPos, 3).setUsage(THREE.DynamicDrawUsage));

    const ptMat = new THREE.PointsMaterial({
        color: 0xAED534,
        size: 3.5,
        transparent: true,
        opacity: 0.85,
        sizeAttenuation: true,
    });
    scene.add(new THREE.Points(ptGeo, ptMat));

    // Lines (blue connections) — pre-allocated LineSegments for performance
    const MAX_SEGS = N * 25;
    const linePos = new Float32Array(MAX_SEGS * 2 * 3);
    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute('position', new THREE.BufferAttribute(linePos, 3).setUsage(THREE.DynamicDrawUsage));
    lineGeo.setDrawRange(0, 0);

    const lineMat = new THREE.LineBasicMaterial({ color: 0x3300FB, transparent: true, opacity: 0.18 });
    scene.add(new THREE.LineSegments(lineGeo, lineMat));

    // Mouse parallax
    let mx = 0, my = 0;
    document.addEventListener('mousemove', e => {
        mx = (e.clientX / window.innerWidth - 0.5) * 2;
        my = (e.clientY / window.innerHeight - 0.5) * 2;
    }, { passive: true });

    const LINK_DIST_SQ = 160 * 160;

    function animate() {
        requestAnimationFrame(animate);

        // Update particle positions
        for (let i = 0; i < N; i++) {
            const p = pts[i];
            p.x += p.vx;
            p.y += p.vy;
            // Wrap edges
            if (p.x >  SPREAD_X / 2) p.x = -SPREAD_X / 2;
            if (p.x < -SPREAD_X / 2) p.x =  SPREAD_X / 2;
            if (p.y >  SPREAD_Y / 2) p.y = -SPREAD_Y / 2;
            if (p.y < -SPREAD_Y / 2) p.y =  SPREAD_Y / 2;
            ptPos[i * 3]     = p.x;
            ptPos[i * 3 + 1] = p.y;
            ptPos[i * 3 + 2] = p.z;
        }
        ptGeo.attributes.position.needsUpdate = true;

        // Build connections into pre-allocated buffer
        let seg = 0;
        for (let i = 0; i < N && seg < MAX_SEGS; i++) {
            for (let j = i + 1; j < N && seg < MAX_SEGS; j++) {
                const dx = pts[i].x - pts[j].x;
                const dy = pts[i].y - pts[j].y;
                if (dx * dx + dy * dy < LINK_DIST_SQ) {
                    const b = seg * 6;
                    linePos[b]     = pts[i].x; linePos[b + 1] = pts[i].y; linePos[b + 2] = pts[i].z;
                    linePos[b + 3] = pts[j].x; linePos[b + 4] = pts[j].y; linePos[b + 5] = pts[j].z;
                    seg++;
                }
            }
        }
        lineGeo.setDrawRange(0, seg * 2);
        lineGeo.attributes.position.needsUpdate = true;

        // Camera drifts subtly with mouse
        camera.position.x += (mx * 60 - camera.position.x) * 0.025;
        camera.position.y += (-my * 40 - camera.position.y) * 0.025;
        camera.lookAt(scene.position);

        renderer.render(scene, camera);
    }

    animate();

    window.addEventListener('resize', () => {
        const nw = window.innerWidth;
        const nh = window.innerHeight;
        camera.aspect = nw / nh;
        camera.updateProjectionMatrix();
        renderer.setSize(nw, nh);
    });
})();

// ==========================================
// Hero Robot Image — Mouse-Reactive 3D Parallax
// ==========================================
(function initHeroRobotParallax() {
    const wrapper = document.getElementById('heroRobotWrapper');
    const img = document.getElementById('heroRobotImg');
    const hero = document.getElementById('heroSection');
    if (!wrapper || !img || !hero) return;

    // Only enable on desktop
    if (window.innerWidth <= 768) return;

    let mx = 0, my = 0;
    let targetX = 0, targetY = 0;
    let currentX = 0, currentY = 0;

    hero.addEventListener('mousemove', (e) => {
        const rect = hero.getBoundingClientRect();
        mx = (e.clientX - rect.left) / rect.width - 0.5;   // -0.5 to 0.5
        my = (e.clientY - rect.top) / rect.height - 0.5;
    }, { passive: true });

    hero.addEventListener('mouseleave', () => {
        mx = 0;
        my = 0;
    });

    function animate() {
        requestAnimationFrame(animate);

        // Smooth lerp towards target
        targetX = mx * 12;   // Max rotation in degrees
        targetY = my * -8;

        currentX += (targetX - currentX) * 0.06;
        currentY += (targetY - currentY) * 0.06;

        // Apply 3D transform — slight rotation + translate for depth
        const translateX = currentX * 0.8;
        const translateY = currentY * 0.5;

        img.style.transform = `
            perspective(1200px)
            rotateY(${currentX * 0.15}deg)
            rotateX(${currentY * 0.1}deg)
            translateX(${translateX}px)
            translateY(${translateY}px)
            scale(1.02)
        `;
    }

    animate();
})();

// ==========================================
// 3D Card Tilt Effect
// ==========================================
(function init3DTilt() {
    const tiltCards = document.querySelectorAll(
        '.glass-card, .story-card, .value-card, .testimonial-card'
    );

    tiltCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transition = 'transform 0.1s ease, box-shadow 0.3s ease';
        });

        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width  - 0.5; // -0.5 to 0.5
            const y = (e.clientY - rect.top)  / rect.height - 0.5;
            const rotX = -y * 14;
            const rotY =  x * 14;
            card.style.transform =
                `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.03,1.03,1.03)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transition = 'transform 0.55s cubic-bezier(0.23,1,0.32,1), box-shadow 0.5s ease';
            card.style.transform  = 'perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)';
        });
    });
})();
