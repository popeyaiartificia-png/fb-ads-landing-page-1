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
// Three.js AI Robot Hero — Premium Humanoid with Neuron Halo
// ==========================================
(function initHeroRobot() {
    if (typeof THREE === 'undefined') return;
    const canvas = document.getElementById('heroCanvas3D');
    if (!canvas) return;

    const W = window.innerWidth;
    const H = window.innerHeight;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;

    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(36, W / H, 0.1, 120);
    camera.position.set(0, 0.4, 9.5);
    camera.lookAt(0, 0.6, 0);

    // ── Color Palette ────────────────────────────────────
    const C = {
        body:    0x0a0a0a,
        chrome:  0x1a1a1a,
        panel:   0x111111,
        cyan:    0x00e5ff,
        teal:    0x00bcd4,
        lime:    0xAED534,
        blue:    0x3366ff,
        white:   0xffffff,
    };

    // ── Materials ────────────────────────────────────────
    const bodyMat    = new THREE.MeshPhongMaterial({ color: C.body,   specular: 0x666666, shininess: 600 });
    const chromeMat  = new THREE.MeshPhongMaterial({ color: C.chrome, specular: 0xcccccc, shininess: 800 });
    const panelMat   = new THREE.MeshPhongMaterial({ color: C.panel,  specular: 0x888888, shininess: 400 });
    const cyanGlow   = new THREE.MeshBasicMaterial({ color: C.cyan });
    const cyanDim    = new THREE.MeshBasicMaterial({ color: C.cyan,  transparent: true, opacity: 0.4 });
    const limeGlow   = new THREE.MeshBasicMaterial({ color: C.lime });
    const limeDim    = new THREE.MeshBasicMaterial({ color: C.lime,  transparent: true, opacity: 0.45 });
    const tealGlow   = new THREE.MeshBasicMaterial({ color: C.teal,  transparent: true, opacity: 0.6 });

    // ── Robot Group ──────────────────────────────────────
    const robot = new THREE.Group();
    robot.rotation.y = -0.1;

    // ═══ HEAD — Smooth sphere-based humanoid ═══
    const headG = new THREE.Group();
    headG.position.y = 2.0;

    // Main skull — smooth sphere
    const skull = new THREE.Mesh(new THREE.SphereGeometry(1.05, 32, 24), bodyMat);
    skull.scale.set(1.0, 1.1, 0.95);
    headG.add(skull);

    // Forehead plate — subtle ridge
    const foreheadPlate = new THREE.Mesh(
        new THREE.SphereGeometry(1.08, 32, 16, 0, Math.PI * 2, 0, Math.PI * 0.35),
        chromeMat
    );
    foreheadPlate.position.y = 0.12;
    headG.add(foreheadPlate);

    // Visor — curved glowing band across the face
    const visorGeo = new THREE.TorusGeometry(1.0, 0.065, 8, 48, Math.PI * 0.55);
    const visor = new THREE.Mesh(visorGeo, cyanGlow);
    visor.rotation.set(Math.PI * 0.48, 0, Math.PI * 0.275);
    visor.position.set(0, 0.08, 0.28);
    headG.add(visor);

    // Visor glow haze
    const visorHaze = new THREE.Mesh(
        new THREE.TorusGeometry(1.0, 0.14, 8, 48, Math.PI * 0.55),
        new THREE.MeshBasicMaterial({ color: C.cyan, transparent: true, opacity: 0.12 })
    );
    visorHaze.rotation.copy(visor.rotation);
    visorHaze.position.copy(visor.position);
    headG.add(visorHaze);

    // Eye lights — cyan
    const eyeLtL = new THREE.PointLight(C.cyan, 4.0, 4.0);
    eyeLtL.position.set(-0.35, 0.15, 1.0);
    headG.add(eyeLtL);
    const eyeLtR = new THREE.PointLight(C.cyan, 4.0, 4.0);
    eyeLtR.position.set(0.35, 0.15, 1.0);
    headG.add(eyeLtR);

    // Chin contour
    const chin = new THREE.Mesh(
        new THREE.SphereGeometry(0.4, 16, 12),
        chromeMat
    );
    chin.scale.set(1.3, 0.6, 0.8);
    chin.position.set(0, -0.85, 0.3);
    headG.add(chin);

    // Side panels (temple)
    const templeGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.55, 8);
    const templeL = new THREE.Mesh(templeGeo, panelMat);
    templeL.rotation.z = Math.PI / 2;
    templeL.position.set(-1.02, 0.1, 0);
    headG.add(templeL);
    const templeR = templeL.clone();
    templeR.position.set(1.02, 0.1, 0);
    headG.add(templeR);

    // Antenna / crown element
    const antennaCone = new THREE.Mesh(
        new THREE.ConeGeometry(0.06, 0.45, 6),
        cyanGlow
    );
    antennaCone.position.set(0, 1.35, 0);
    headG.add(antennaCone);

    // Small data strips on forehead
    for (let i = 0; i < 3; i++) {
        const strip = new THREE.Mesh(
            new THREE.BoxGeometry(0.45 - i * 0.1, 0.025, 0.04),
            i === 0 ? limeGlow : limeDim
        );
        strip.position.set(0, 0.65 + i * 0.12, 0.85 - i * 0.08);
        headG.add(strip);
    }

    robot.add(headG);

    // ═══ NECK — Cylindrical with tech rings ═══
    const neckG = new THREE.Group();
    neckG.position.y = 0.72;

    const neckCore = new THREE.Mesh(
        new THREE.CylinderGeometry(0.32, 0.38, 0.6, 16),
        bodyMat
    );
    neckG.add(neckCore);

    // Neck tech rings
    for (let i = 0; i < 3; i++) {
        const ring = new THREE.Mesh(
            new THREE.TorusGeometry(0.36 + i * 0.02, 0.025, 8, 32),
            i === 1 ? cyanDim : panelMat
        );
        ring.rotation.x = Math.PI / 2;
        ring.position.y = 0.15 - i * 0.15;
        neckG.add(ring);
    }

    // Hydraulic cables
    const cableGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.65, 6);
    [-0.38, 0.38].forEach(x => {
        const cable = new THREE.Mesh(cableGeo, chromeMat);
        cable.position.set(x, 0, 0.1);
        cable.rotation.z = x > 0 ? -0.15 : 0.15;
        neckG.add(cable);
    });

    robot.add(neckG);

    // ═══ TORSO — Wide, rounded, armored ═══
    const torsoG = new THREE.Group();
    torsoG.position.y = -0.55;

    // Main chest — capsule-like shape
    const chestGeo = new THREE.SphereGeometry(1.5, 32, 24);
    const chest = new THREE.Mesh(chestGeo, bodyMat);
    chest.scale.set(1.1, 0.75, 0.6);
    torsoG.add(chest);

    // Center chest ridge
    const chestRidge = new THREE.Mesh(
        new THREE.BoxGeometry(0.12, 1.5, 0.75),
        chromeMat
    );
    torsoG.add(chestRidge);

    // Chest core — spinning octahedron (cyan instead of red)
    const core = new THREE.Mesh(
        new THREE.OctahedronGeometry(0.22, 1),
        cyanGlow
    );
    core.position.set(0, 0.15, 0.55);
    torsoG.add(core);

    // Core light
    const coreLt = new THREE.PointLight(C.cyan, 5, 6);
    coreLt.position.set(0, 0.15, 0.8);
    torsoG.add(coreLt);

    // Chest panel lines (lime data strips)
    for (let i = 0; i < 5; i++) {
        const stripL = new THREE.Mesh(
            new THREE.BoxGeometry(0.5, 0.028, 0.04),
            i < 2 ? limeGlow : limeDim
        );
        stripL.position.set(-0.72, 0.35 - i * 0.17, 0.48);
        torsoG.add(stripL);

        const stripR = stripL.clone();
        stripR.position.set(0.72, 0.35 - i * 0.17, 0.48);
        torsoG.add(stripR);
    }

    // ═══ SHOULDER PADS — Rounded armor ═══
    function makeShoulder(side) {
        const g = new THREE.Group();

        // Main dome
        const dome = new THREE.Mesh(
            new THREE.SphereGeometry(0.58, 20, 16),
            chromeMat
        );
        dome.scale.set(1.2, 0.8, 1.0);
        g.add(dome);

        // Accent ring
        const ring = new THREE.Mesh(
            new THREE.TorusGeometry(0.55, 0.035, 8, 24),
            cyanDim
        );
        ring.rotation.x = Math.PI / 2;
        ring.position.y = -0.05;
        g.add(ring);

        // Top spike/antenna
        const spike = new THREE.Mesh(
            new THREE.ConeGeometry(0.08, 0.55, 6),
            panelMat
        );
        spike.position.y = 0.6;
        g.add(spike);

        // Glowing tip
        const tip = new THREE.Mesh(
            new THREE.SphereGeometry(0.05, 8, 8),
            cyanGlow
        );
        tip.position.y = 0.85;
        g.add(tip);

        return g;
    }

    const shL = makeShoulder(-1);
    shL.position.set(-1.75, 0.35, 0);
    torsoG.add(shL);

    const shR = makeShoulder(1);
    shR.position.set(1.75, 0.35, 0);
    torsoG.add(shR);

    // ═══ ARMS — Segmented cylinders ═══
    function makeArm() {
        const g = new THREE.Group();

        // Upper arm
        const upper = new THREE.Mesh(
            new THREE.CylinderGeometry(0.2, 0.17, 1.1, 12),
            bodyMat
        );
        g.add(upper);

        // Elbow joint
        const elbow = new THREE.Mesh(
            new THREE.SphereGeometry(0.18, 12, 10),
            chromeMat
        );
        elbow.position.y = -0.6;
        g.add(elbow);

        // Arm tech rings
        [0.2, 0, -0.2].forEach((y, i) => {
            const ring = new THREE.Mesh(
                new THREE.TorusGeometry(0.2, 0.02, 6, 20),
                i === 1 ? cyanDim : panelMat
            );
            ring.rotation.x = Math.PI / 2;
            ring.position.y = y;
            g.add(ring);
        });

        return g;
    }

    const armL = makeArm();
    armL.position.set(-1.8, -0.4, 0);
    torsoG.add(armL);

    const armR = makeArm();
    armR.position.set(1.8, -0.4, 0);
    torsoG.add(armR);

    robot.add(torsoG);

    // ═══ NEURON HALO RINGS — Orbiting rings of light ═══
    const haloGroup = new THREE.Group();
    haloGroup.position.y = 1.0;

    const haloRings = [];
    const haloConfigs = [
        { radius: 2.4, color: C.cyan, opacity: 0.35, tiltX: 1.2,   tiltY: 0.0,  speed:  0.25, dashSize: 0.18, gapSize: 0.12 },
        { radius: 2.9, color: C.lime, opacity: 0.22, tiltX: -0.6,  tiltY: 0.4,  speed: -0.18, dashSize: 0.22, gapSize: 0.14 },
        { radius: 3.5, color: C.teal, opacity: 0.18, tiltX: 0.3,   tiltY: -0.3, speed:  0.12, dashSize: 0.15, gapSize: 0.2  },
        { radius: 4.2, color: C.blue, opacity: 0.12, tiltX: -1.0,  tiltY: 0.2,  speed: -0.08, dashSize: 0.25, gapSize: 0.18 },
    ];

    haloConfigs.forEach(cfg => {
        const pts = [];
        const segs = 256;
        for (let i = 0; i <= segs; i++) {
            const a = (i / segs) * Math.PI * 2;
            pts.push(new THREE.Vector3(Math.cos(a) * cfg.radius, Math.sin(a) * cfg.radius, 0));
        }
        const geo = new THREE.BufferGeometry().setFromPoints(pts);
        const mat = new THREE.LineDashedMaterial({
            color: cfg.color,
            transparent: true,
            opacity: cfg.opacity,
            dashSize: cfg.dashSize,
            gapSize: cfg.gapSize,
        });
        const line = new THREE.Line(geo, mat);
        line.computeLineDistances();
        line.rotation.x = cfg.tiltX;
        line.rotation.y = cfg.tiltY;
        line._speed = cfg.speed;
        line._baseTiltX = cfg.tiltX;
        haloRings.push(line);
        haloGroup.add(line);
    });

    scene.add(haloGroup);

    // ═══ NEURON DATA NODES — orbiting particles ═══
    const dataNodes = [];
    const nodeMats = [
        new THREE.MeshBasicMaterial({ color: C.cyan }),
        new THREE.MeshBasicMaterial({ color: C.lime }),
        new THREE.MeshBasicMaterial({ color: C.teal }),
    ];

    for (let i = 0; i < 18; i++) {
        const mat = nodeMats[i % 3];
        const size = 0.04 + Math.random() * 0.04;
        const n = new THREE.Mesh(new THREE.IcosahedronGeometry(size, 0), mat);
        const ang = (i / 18) * Math.PI * 2 + Math.random() * 0.3;
        const rad = 2.2 + Math.random() * 2.2;
        const ht  = (Math.random() - 0.5) * 4.5;
        n.position.set(Math.cos(ang) * rad, ht + 1.0, Math.sin(ang) * rad);
        n._ang = ang;
        n._rad = rad;
        n._ht  = ht + 1.0;
        n._spd = 0.003 + Math.random() * 0.005;
        n._bobSpd = 0.5 + Math.random() * 1.5;
        n._bobAmp = 0.05 + Math.random() * 0.1;
        dataNodes.push(n);
        scene.add(n);
    }

    // Node connection lines (neural network effect)
    const NODE_LINK_DIST = 3.0;
    const MAX_NODE_SEGS = 100;
    const nodeLinePos = new Float32Array(MAX_NODE_SEGS * 6);
    const nodeLineGeo = new THREE.BufferGeometry();
    nodeLineGeo.setAttribute('position', new THREE.BufferAttribute(nodeLinePos, 3).setUsage(THREE.DynamicDrawUsage));
    nodeLineGeo.setDrawRange(0, 0);
    const nodeLineMat = new THREE.LineBasicMaterial({ color: C.cyan, transparent: true, opacity: 0.1 });
    const nodeLines = new THREE.LineSegments(nodeLineGeo, nodeLineMat);
    scene.add(nodeLines);

    scene.add(robot);

    // ── Lights ────────────────────────────────────────────
    // Soft blue-white ambient
    scene.add(new THREE.AmbientLight(0x0a0a18, 1.0));

    // Key light — cool white from top-right
    const keyLt = new THREE.DirectionalLight(0xeeeeff, 5.0);
    keyLt.position.set(5, 8, 5);
    scene.add(keyLt);

    // Rim light — cold blue from back-left
    const rimLt = new THREE.DirectionalLight(0x6688ff, 3.0);
    rimLt.position.set(-6, 5, -5);
    scene.add(rimLt);

    // Teal under-glow
    const underLt = new THREE.PointLight(C.teal, 3.5, 14);
    underLt.position.set(0, -5, 4);
    scene.add(underLt);

    // Lime accent from front-right
    const limeLt = new THREE.PointLight(C.lime, 2.0, 12);
    limeLt.position.set(4, 2, 7);
    scene.add(limeLt);

    // Cyan from front-left
    const cyanLt = new THREE.PointLight(C.cyan, 1.5, 10);
    cyanLt.position.set(-3, 3, 6);
    scene.add(cyanLt);

    // ── Mouse tracking ───────────────────────────────────
    let mx = 0, my = 0;
    document.addEventListener('mousemove', e => {
        mx = (e.clientX / window.innerWidth  - 0.5) * 2;
        my = (e.clientY / window.innerHeight - 0.5) * 2;
    }, { passive: true });

    // ── Animate ──────────────────────────────────────────
    let t = 0;
    function animate() {
        requestAnimationFrame(animate);
        t += 0.005;

        // Robot follows cursor smoothly + gentle auto-rotation
        const tgtY = -0.1 + mx * 0.22 + Math.sin(t * 0.15) * 0.08;
        const tgtX =  0.04 + my * -0.08;
        robot.rotation.y += (tgtY - robot.rotation.y) * 0.035;
        robot.rotation.x += (tgtX - robot.rotation.x) * 0.035;

        // Gentle hover bob
        robot.position.y = Math.sin(t * 0.4) * 0.06;

        // Halo rings rotate + cursor reactivity
        const cursorDist = Math.sqrt(mx * mx + my * my);
        haloRings.forEach((ring, i) => {
            ring.rotation.z += ring._speed * 0.012 * (1 + cursorDist * 0.3);
            // Subtle tilt response to cursor
            ring.rotation.x = ring._baseTiltX + my * 0.05 * (i % 2 === 0 ? 1 : -1);
        });

        // Halo group follows robot gently
        haloGroup.position.y = 1.0 + Math.sin(t * 0.4) * 0.04;
        haloGroup.rotation.y = Math.sin(t * 0.1) * 0.04;

        // Data nodes orbit + bob
        dataNodes.forEach(n => {
            n._ang += n._spd;
            n.position.x = Math.cos(n._ang) * n._rad;
            n.position.z = Math.sin(n._ang) * n._rad;
            n.position.y = n._ht + Math.sin(t * n._bobSpd) * n._bobAmp;
            // Spin each node
            n.rotation.x = t * 1.2;
            n.rotation.y = t * 0.8;
        });

        // Update neural connection lines between nearby nodes
        let seg = 0;
        for (let i = 0; i < dataNodes.length && seg < MAX_NODE_SEGS; i++) {
            for (let j = i + 1; j < dataNodes.length && seg < MAX_NODE_SEGS; j++) {
                const dx = dataNodes[i].position.x - dataNodes[j].position.x;
                const dy = dataNodes[i].position.y - dataNodes[j].position.y;
                const dz = dataNodes[i].position.z - dataNodes[j].position.z;
                const dist = dx * dx + dy * dy + dz * dz;
                if (dist < NODE_LINK_DIST * NODE_LINK_DIST) {
                    const b = seg * 6;
                    nodeLinePos[b]     = dataNodes[i].position.x;
                    nodeLinePos[b + 1] = dataNodes[i].position.y;
                    nodeLinePos[b + 2] = dataNodes[i].position.z;
                    nodeLinePos[b + 3] = dataNodes[j].position.x;
                    nodeLinePos[b + 4] = dataNodes[j].position.y;
                    nodeLinePos[b + 5] = dataNodes[j].position.z;
                    seg++;
                }
            }
        }
        nodeLineGeo.setDrawRange(0, seg * 2);
        nodeLineGeo.attributes.position.needsUpdate = true;

        // Visor eye pulse — smooth cyan glow
        const ep = 2.8 + Math.sin(t * 3.5) * 1.5;
        eyeLtL.intensity = ep;
        eyeLtR.intensity = ep;

        // Core spin + pulse
        core.rotation.y = t * 1.8;
        core.rotation.x = t * 1.1;
        const coreP = 4.0 + Math.sin(t * 2.5) * 2.0;
        coreLt.intensity = coreP;

        // Under-glow pulse
        underLt.intensity = 3.0 + Math.sin(t * 1.5) * 0.8;

        renderer.render(scene, camera);
    }
    animate();

    // Resize handler
    window.addEventListener('resize', () => {
        const nw = window.innerWidth;
        const nh = window.innerHeight;
        camera.aspect = nw / nh;
        camera.updateProjectionMatrix();
        renderer.setSize(nw, nh);
    });
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
