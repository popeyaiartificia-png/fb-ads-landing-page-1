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

            console.log("Form Data Prepared:", formData);

            try {
                // Simulated submission — replace with real webhook URL
                await new Promise(resolve => setTimeout(resolve, 1500));

                /* 
                // Actual webhook POST when URL is provided:
                const WEBHOOK_URL = 'YOUR_WEBHOOK_URL_HERE';
                await fetch(WEBHOOK_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData)
                });
                */

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
// Three.js AI Robot Hero  (Aggressive War-Machine)
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

    const scene  = new THREE.Scene();
    // Camera low — looking UP at robot (imposing)
    const camera = new THREE.PerspectiveCamera(38, W / H, 0.1, 100);
    camera.position.set(0, -0.8, 8.5);
    camera.lookAt(0, 0.8, 0);

    // ── Materials ────────────────────────────────────────
    const darkMetal = new THREE.MeshPhongMaterial({ color: 0x080808, specular: 0xcccccc, shininess: 450 });
    const gunmetal  = new THREE.MeshPhongMaterial({ color: 0x111111, specular: 0x999999, shininess: 250 });
    const armorPlate= new THREE.MeshPhongMaterial({ color: 0x0d0d0d, specular: 0xaaaaaa, shininess: 320 });
    const redGlow   = new THREE.MeshBasicMaterial({ color: 0xff1800 });
    const redDim    = new THREE.MeshBasicMaterial({ color: 0xff1800, transparent: true, opacity: 0.35 });
    const limeMat   = new THREE.MeshBasicMaterial({ color: 0xAED534 });
    const limeDim   = new THREE.MeshBasicMaterial({ color: 0xAED534, transparent: true, opacity: 0.5 });

    // ── Robot ─────────────────────────────────────────────
    const robot = new THREE.Group();
    robot.rotation.y = -0.18;
    robot.rotation.x =  0.06; // looks down at viewer — imposing

    // ═══ HEAD (angular box-based — war machine) ═══
    const headG = new THREE.Group();
    headG.position.y = 1.6;

    // Main skull — angular box, not a sphere
    headG.add(new THREE.Mesh(new THREE.BoxGeometry(2.0, 2.1, 1.75), darkMetal));

    // Heavy brow ridge — overhanging, key menacing feature
    const brow = new THREE.Mesh(new THREE.BoxGeometry(2.25, 0.32, 0.6), gunmetal);
    brow.position.set(0, 0.72, 0.62);
    brow.rotation.x = -0.08;
    headG.add(brow);

    // Cheek plates — angular, protruding outward
    const ckGeo = new THREE.BoxGeometry(0.4, 0.95, 0.65);
    const ckL = new THREE.Mesh(ckGeo, gunmetal);
    ckL.position.set(-1.2, -0.08, 0.28); ckL.rotation.y = 0.14;
    headG.add(ckL);
    const ckR = new THREE.Mesh(ckGeo, gunmetal);
    ckR.position.set( 1.2, -0.08, 0.28); ckR.rotation.y = -0.14;
    headG.add(ckR);

    // Chin block
    headG.add(Object.assign(new THREE.Mesh(new THREE.BoxGeometry(1.15, 0.35, 0.6), gunmetal),
        { position: new THREE.Vector3(0, -1.12, 0.2) }));

    // Visor slit — narrow red glowing line (Terminator-style)
    const visorSlit = new THREE.Mesh(new THREE.BoxGeometry(1.62, 0.13, 0.06), redGlow);
    visorSlit.position.set(0, 0.22, 0.9);
    headG.add(visorSlit);

    // Visor under-glow
    headG.add(Object.assign(new THREE.Mesh(new THREE.BoxGeometry(1.64, 0.07, 0.05), redDim),
        { position: new THREE.Vector3(0, 0.13, 0.88) }));

    // Eye point lights (red, close to visor)
    const eyeLtL = new THREE.PointLight(0xff1800, 3.5, 3.2);
    eyeLtL.position.set(-0.4, 0.22, 1.1);
    headG.add(eyeLtL);
    const eyeLtR = new THREE.PointLight(0xff1800, 3.5, 3.2);
    eyeLtR.position.set( 0.4, 0.22, 1.1);
    headG.add(eyeLtR);

    // Crown crest + side horns
    headG.add(Object.assign(new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.58, 0.38), darkMetal),
        { position: new THREE.Vector3(0, 1.22, 0) }));
    const hornGeo = new THREE.ConeGeometry(0.13, 0.6, 5);
    const hornL = new THREE.Mesh(hornGeo, gunmetal);
    hornL.position.set(-0.88, 1.2, 0); headG.add(hornL);
    const hornR = new THREE.Mesh(hornGeo, gunmetal);
    hornR.position.set( 0.88, 1.2, 0); headG.add(hornR);

    // Temple plates
    const tpGeo = new THREE.BoxGeometry(0.09, 0.55, 0.52);
    headG.add(Object.assign(new THREE.Mesh(tpGeo, armorPlate), { position: new THREE.Vector3(-1.06, 0.18, 0) }));
    headG.add(Object.assign(new THREE.Mesh(tpGeo, armorPlate), { position: new THREE.Vector3( 1.06, 0.18, 0) }));

    // Back vents
    for (let i = 0; i < 5; i++) {
        const v = new THREE.Mesh(new THREE.BoxGeometry(1.55, 0.07, 0.09),
            new THREE.MeshBasicMaterial({ color: 0x1c1c1c }));
        v.position.set(0, 0.52 - i * 0.23, -0.9);
        headG.add(v);
    }

    // Lime data strip on forehead
    headG.add(Object.assign(new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.035, 0.05), limeMat),
        { position: new THREE.Vector3(0, 0.62, 0.9) }));

    robot.add(headG);

    // ═══ NECK (hydraulic, mechanical) ═══
    const neckG = new THREE.Group();
    neckG.position.y = 0.38;
    neckG.add(new THREE.Mesh(new THREE.BoxGeometry(0.52, 0.6, 0.45), darkMetal));
    // Hydraulic pistons
    const pistGeo = new THREE.CylinderGeometry(0.07, 0.07, 0.62, 8);
    const pistL = new THREE.Mesh(pistGeo, gunmetal); pistL.rotation.z = 0.28; pistL.position.set(-0.45, 0, 0);
    neckG.add(pistL);
    const pistR = new THREE.Mesh(pistGeo, gunmetal); pistR.rotation.z = -0.28; pistR.position.set( 0.45, 0, 0);
    neckG.add(pistR);
    // Collar armor
    neckG.add(Object.assign(new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.22, 0.68), gunmetal),
        { position: new THREE.Vector3(0, -0.38, 0) }));
    robot.add(neckG);

    // ═══ CHEST (wide, armored, imposing) ═══
    const torsoG = new THREE.Group();
    torsoG.position.y = -0.95;

    // Main chest — wide and thick
    torsoG.add(new THREE.Mesh(new THREE.BoxGeometry(3.1, 1.55, 0.85), darkMetal));
    // Center spine ridge
    torsoG.add(new THREE.Mesh(new THREE.BoxGeometry(0.2, 1.58, 0.92), armorPlate));
    // Angled side armor panels
    const sideGeo = new THREE.BoxGeometry(0.55, 1.55, 0.78);
    const sideL = new THREE.Mesh(sideGeo, gunmetal); sideL.position.set(-1.82, 0, 0); sideL.rotation.y = 0.14; torsoG.add(sideL);
    const sideR = new THREE.Mesh(sideGeo, gunmetal); sideR.position.set( 1.82, 0, 0); sideR.rotation.y =-0.14; torsoG.add(sideR);

    // Red power core — center chest (spinning octahedron)
    const core = new THREE.Mesh(new THREE.OctahedronGeometry(0.24, 0), redGlow);
    core.position.set(0, 0.18, 0.48);
    torsoG.add(core);
    const coreLt = new THREE.PointLight(0xff1800, 4, 5);
    coreLt.position.set(0, 0.18, 0.75);
    torsoG.add(coreLt);

    // Lime power strips on chest flanks
    const stripGeo = new THREE.BoxGeometry(0.58, 0.038, 0.06);
    for (let i = 0; i < 4; i++) {
        const sL = new THREE.Mesh(stripGeo, i === 0 ? limeMat : limeDim);
        sL.position.set(-0.88, 0.38 - i * 0.2, 0.45); torsoG.add(sL);
        const sR = new THREE.Mesh(stripGeo, i === 0 ? limeMat : limeDim);
        sR.position.set( 0.88, 0.38 - i * 0.2, 0.45); torsoG.add(sR);
    }

    // Shoulder armor — angular with spike
    function makeShoulder(side) {
        const g = new THREE.Group();
        g.add(new THREE.Mesh(new THREE.BoxGeometry(0.9, 1.0, 0.9), darkMetal));
        // Angled top plate
        const top = new THREE.Mesh(new THREE.BoxGeometry(0.95, 0.2, 0.95), gunmetal);
        top.position.y = 0.48; top.rotation.z = side * 0.12; g.add(top);
        // Spike
        const spike = new THREE.Mesh(new THREE.ConeGeometry(0.13, 0.72, 5), gunmetal);
        spike.position.y = 0.85; g.add(spike);
        // Red accent line on shoulder
        const acc = new THREE.Mesh(new THREE.BoxGeometry(0.92, 0.04, 0.06), redGlow);
        acc.position.set(0, 0.2, 0.47); g.add(acc);
        return g;
    }
    const shL = makeShoulder(-1); shL.position.set(-2.05, 0.42, 0); torsoG.add(shL);
    const shR = makeShoulder( 1); shR.position.set( 2.05, 0.42, 0); torsoG.add(shR);

    // Upper arms
    const armGeo = new THREE.CylinderGeometry(0.23, 0.19, 1.05, 10);
    const armL = new THREE.Mesh(armGeo, darkMetal); armL.position.set(-2.1, -0.55, 0); torsoG.add(armL);
    const armR = new THREE.Mesh(armGeo, darkMetal); armR.position.set( 2.1, -0.55, 0); torsoG.add(armR);
    // Arm rings
    [-0.1, -0.38, -0.66].forEach(y => {
        const rGeo = new THREE.TorusGeometry(0.24, 0.03, 6, 20);
        const rL = new THREE.Mesh(rGeo, gunmetal); rL.rotation.x = Math.PI/2; rL.position.set(-2.1, y+0.52, 0); torsoG.add(rL);
        const rR = rL.clone(); rR.position.set(2.1, y+0.52, 0); torsoG.add(rR);
    });

    robot.add(torsoG);

    // ═══ DECORATIVE RINGS ═══
    function makeRing(radius, color, opacity, tiltX, tiltY, posY) {
        const pts = [];
        for (let i = 0; i <= 256; i++) {
            const a = (i / 256) * Math.PI * 2;
            pts.push(new THREE.Vector3(Math.cos(a) * radius, Math.sin(a) * radius, 0));
        }
        const geo = new THREE.BufferGeometry().setFromPoints(pts);
        const mat = new THREE.LineDashedMaterial({ color, transparent: true, opacity, dashSize: 0.14, gapSize: 0.1 });
        const line = new THREE.Line(geo, mat);
        line.computeLineDistances();
        line.rotation.x = tiltX; line.rotation.y = tiltY; line.position.y = posY;
        return line;
    }
    const ring1 = makeRing(3.0, 0xff1800, 0.28,  0.14, 0.05, 0.9);
    const ring2 = makeRing(3.8, 0xAED534, 0.15, -0.75, 0.28, 0.3);
    scene.add(ring1, ring2);

    // ═══ FLOATING NODES ═══
    const nodes = [];
    const redNodeMat  = new THREE.MeshBasicMaterial({ color: 0xff1800 });
    const limeNodeMat = new THREE.MeshBasicMaterial({ color: 0xAED534 });
    for (let i = 0; i < 10; i++) {
        const mat = i % 3 === 0 ? limeNodeMat : redNodeMat;
        const n = new THREE.Mesh(new THREE.OctahedronGeometry(0.055, 0), mat);
        const ang = (i / 10) * Math.PI * 2;
        const rad = 3.2 + Math.random() * 0.9;
        n.position.set(Math.cos(ang) * rad, (Math.random() - 0.5) * 3.5, Math.sin(ang) * rad);
        n._ang = ang; n._rad = rad; n._spd = 0.005 + Math.random() * 0.004;
        nodes.push(n); scene.add(n);
    }

    scene.add(robot);

    // ── Lights ────────────────────────────────────────────
    scene.add(new THREE.AmbientLight(0x110000, 0.7));          // dark red ambient

    const keyLt = new THREE.DirectionalLight(0xffffff, 5.5);   // top-right chrome key
    keyLt.position.set(4, 8, 4); scene.add(keyLt);

    const rimLt = new THREE.DirectionalLight(0xffffff, 2.8);   // back-left rim
    rimLt.position.set(-5, 4, -4); scene.add(rimLt);

    const redUnder = new THREE.PointLight(0xff1800, 5, 14);    // menacing red from below
    redUnder.position.set(0, -5, 3); scene.add(redUnder);

    const limeLt = new THREE.PointLight(0xAED534, 2.5, 10);    // lime accent front
    limeLt.position.set(3, 2, 6); scene.add(limeLt);

    // ── Mouse ─────────────────────────────────────────────
    let mx = 0, my = 0;
    document.addEventListener('mousemove', e => {
        mx = (e.clientX / window.innerWidth  - 0.5) * 2;
        my = (e.clientY / window.innerHeight - 0.5) * 2;
    }, { passive: true });

    // ── Animate ───────────────────────────────────────────
    let t = 0;
    function animate() {
        requestAnimationFrame(animate);
        t += 0.006;

        // Slow auto-rotation + mouse look
        const tgtY = -0.18 + mx * 0.28 + t * 0.04;
        const tgtX =  0.06 + my * -0.1;
        robot.rotation.y += (tgtY - robot.rotation.y) * 0.04;
        robot.rotation.x += (tgtX - robot.rotation.x) * 0.04;

        // Power bob (subtle)
        robot.position.y = Math.sin(t * 0.55) * 0.07;

        // Rings spin (aggressive, fast)
        ring1.rotation.z =  t * 0.45;
        ring2.rotation.z = -t * 0.28;

        // Nodes orbit
        nodes.forEach(n => {
            n._ang += n._spd;
            n.position.x = Math.cos(n._ang) * n._rad;
            n.position.z = Math.sin(n._ang) * n._rad;
        });

        // Red eyes — fast menacing pulse
        const ep = 2.2 + Math.sin(t * 7) * 1.8;
        eyeLtL.intensity = ep; eyeLtR.intensity = ep;

        // Core spin + pulse
        core.rotation.y = t * 1.5;
        core.rotation.x = t * 0.9;
        coreLt.intensity = 3.0 + Math.sin(t * 3.5) * 2.0;

        // Red under flicker
        redUnder.intensity = 4.5 + Math.sin(t * 9) * 0.6;

        renderer.render(scene, camera);
    }
    animate();

    // Resize
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
