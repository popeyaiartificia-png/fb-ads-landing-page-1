// ==========================================
// Artificia AI — Landing Page Interactions
// ==========================================

// ==========================================
// YouTube Mute / Unmute Toggle
// ==========================================
let isMuted = true;

function toggleMute() {
    const iframe = document.getElementById('ytPlayer');
    const icon = document.getElementById('muteIcon');
    const label = document.getElementById('muteLabel');

    if (!iframe) return;

    if (isMuted) {
        // Unmute: reload src without mute=1
        iframe.src = iframe.src.replace('&mute=1', '&mute=0');
        icon.className = 'fas fa-volume-high';
        label.textContent = 'Mute';
        isMuted = false;
    } else {
        // Mute: reload src with mute=1
        iframe.src = iframe.src.replace('&mute=0', '&mute=1');
        icon.className = 'fas fa-volume-xmark';
        label.textContent = 'Unmute';
        isMuted = true;
    }
}
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
                // POST to n8n webhook → Artificia CRM Leads
                const WEBHOOK_URL = 'https://miniature-ugt6x.crab.containers.automata.host/webhook/fb-leads-to-crm';
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

    // ==========================================
    // Popup Lead Form — appears after 60 seconds
    // ==========================================
    (function initPopup() {
        const overlay = document.getElementById('popupOverlay');
        if (!overlay) return;

        // Don't show again if already dismissed or submitted this session
        if (sessionStorage.getItem('popupDismissed')) return;

        const WEBHOOK_URL = 'https://miniature-ugt6x.crab.containers.automata.host/webhook/fb-leads-to-crm';

        function showPopup() {
            overlay.setAttribute('style',
                'display:flex; position:fixed; top:0; left:0; right:0; bottom:0;' +
                'z-index:99999; background:rgba(0,0,0,0.85);' +
                'align-items:center; justify-content:center; padding:20px;'
            );
            const modal = overlay.querySelector('.popup-modal');
            if (modal) {
                modal.setAttribute('style',
                    'background:#111; border:2px solid #AED534; border-radius:16px;' +
                    'padding:40px 36px 32px; width:100%; max-width:480px;' +
                    'position:relative; color:#fff; max-height:90vh; overflow-y:auto;'
                );
            }
            overlay.classList.add('active');
        }

        function hidePopup() {
            overlay.style.display = 'none';
            overlay.classList.remove('active');
            sessionStorage.setItem('popupDismissed', '1');
        }

        // Trigger after exactly 60 seconds
        setTimeout(showPopup, 60000);

        // Close button
        const closeBtn = document.getElementById('popupClose');
        if (closeBtn) closeBtn.addEventListener('click', hidePopup);

        // Click outside modal to close
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) hidePopup();
        });

        // ESC key to close
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && overlay.classList.contains('active')) hidePopup();
        });

        // Form submission
        const popupForm = document.getElementById('popupLeadForm');
        if (popupForm) {
            popupForm.addEventListener('submit', async (e) => {
                e.preventDefault();

                const submitBtn = document.getElementById('popupSubmitBtn');
                const originalText = submitBtn.innerHTML;

                submitBtn.innerHTML = 'SENDING... <i class="fas fa-spinner fa-spin"></i>';
                submitBtn.disabled = true;

                const formData = {
                    name:   document.getElementById('popupName').value.trim(),
                    phone:  document.getElementById('popupPhone').value.trim(),
                    email:  document.getElementById('popupEmail').value.trim(),
                    source: 'popup-60s'
                };

                try {
                    await fetch(WEBHOOK_URL, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(formData)
                    });

                    popupForm.classList.add('hidden');
                    document.getElementById('popupSuccess').classList.remove('hidden');
                    sessionStorage.setItem('popupDismissed', '1');

                } catch (err) {
                    console.error('Popup submission error:', err);
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    alert('Could not submit. Please try again or message us on WhatsApp.');
                }
            });
        }
    })();
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
// Cover Hero Image — Mouse-Reactive Parallax (subtle translate, no rotation)
// ==========================================
(function initHeroRobotParallax() {
    const robot = document.getElementById('eduRobot');
    const hero  = document.getElementById('heroSection');
    if (!robot || !hero) return;
    if (window.innerWidth <= 768) return;

    let mx = 0, my = 0;
    let cx = 0, cy = 0;

    hero.addEventListener('mousemove', (e) => {
        const rect = hero.getBoundingClientRect();
        mx = (e.clientX - rect.left) / rect.width  - 0.5;
        my = (e.clientY - rect.top)  / rect.height - 0.5;
    }, { passive: true });

    hero.addEventListener('mouseleave', () => { mx = 0; my = 0; });

    function animate() {
        requestAnimationFrame(animate);
        cx += (mx * 14 - cx) * 0.05;
        cy += (my * 8  - cy) * 0.05;
        // Translate only — keeps edges hidden since image is 107% sized
        robot.style.transform = `scale(1.07) translateX(${cx}px) translateY(${cy}px)`;
    }
    animate();
})();

// ==========================================
// Hero 3D Canvas — Three.js Particles + Diamonds + HUD Rings
// ==========================================
(function initHero3DCanvas() {
    const canvas = document.getElementById('heroCanvas3D');
    if (!canvas || typeof THREE === 'undefined') return;

    const parent = canvas.parentElement;
    let W = parent.offsetWidth  || window.innerWidth;
    let H = parent.offsetHeight || window.innerHeight;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);

    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, W / H, 0.1, 2000);
    camera.position.z = 600;

    // --- Parallax groups (different depths) ---
    const layerFar  = new THREE.Group(); // slow
    const layerMid  = new THREE.Group(); // medium
    const layerNear = new THREE.Group(); // fast
    scene.add(layerFar, layerMid, layerNear);

    // === 1. DOT CLOUD — matches the lime green dot-matrix humanoid on right side ===
    const DOT_COUNT = 480;
    const dotPos = new Float32Array(DOT_COUNT * 3);
    for (let i = 0; i < DOT_COUNT; i++) {
        // Bias dots toward right half, varying depths
        dotPos[i*3]     = 120 + (Math.random() - 0.3) * 340;
        dotPos[i*3 + 1] = (Math.random() - 0.5) * 450;
        dotPos[i*3 + 2] = (Math.random() - 0.5) * 180;
    }
    const dotGeo = new THREE.BufferGeometry();
    dotGeo.setAttribute('position', new THREE.BufferAttribute(dotPos, 3));
    const dotMat = new THREE.PointsMaterial({
        color: 0xAED534,
        size: 2.8,
        transparent: true,
        opacity: 0.55,
        sizeAttenuation: true,
    });
    const dotCloud = new THREE.Points(dotGeo, dotMat);
    layerFar.add(dotCloud);

    // === 2. DIAMOND WIREFRAMES — match the decorative diamonds in the cover image ===
    function makeDiamond(scale, x, y, z, speed) {
        const geo = new THREE.OctahedronGeometry(scale, 0);
        const mat = new THREE.MeshBasicMaterial({
            color: 0xAED534,
            wireframe: true,
            transparent: true,
            opacity: 0.45,
        });
        const mesh = new THREE.Mesh(geo, mat);
        mesh.scale.set(1, 1.55, 0.25);
        mesh.position.set(x, y, z);
        mesh.userData.speed = speed;
        return mesh;
    }

    const diamonds = [
        makeDiamond(32, 200, -175, 30,  0.006),
        makeDiamond(22, -290,  95, -40, -0.004),
        makeDiamond(18,  360,  70,  55,  0.005),
        makeDiamond(14, -160, -220, 10,  0.007),
    ];
    diamonds.forEach(d => layerMid.add(d));

    // === 3. HUD RINGS — glowing circle around the robot head area (left side) ===
    function makeRing(r, opacity) {
        const geo = new THREE.RingGeometry(r, r + 1.8, 72);
        const mat = new THREE.MeshBasicMaterial({
            color: 0xAED534,
            transparent: true,
            opacity,
            side: THREE.DoubleSide,
        });
        return new THREE.Mesh(geo, mat);
    }

    const hudGroup = new THREE.Group();
    hudGroup.position.set(-210, 60, 20);
    const rings = [
        makeRing(68,  0.30),
        makeRing(100, 0.15),
        makeRing(135, 0.07),
    ];
    rings.forEach(r => hudGroup.add(r));
    layerNear.add(hudGroup);

    // === 4. CIRCUIT LINES — top-left corner tech lines ===
    function makeCircuit(points, opacity) {
        const vecs = points.map(([x, y]) => new THREE.Vector3(x, y, 5));
        const geo  = new THREE.BufferGeometry().setFromPoints(vecs);
        const mat  = new THREE.LineBasicMaterial({ color: 0xAED534, transparent: true, opacity });
        return new THREE.Line(geo, mat);
    }

    layerMid.add(
        makeCircuit([[-380,210],[-300,210],[-300,170],[-230,170]], 0.45),
        makeCircuit([[-380,180],[-340,180],[-340,140]], 0.30),
        makeCircuit([[380,210],[320,210],[320,170],[260,170]], 0.35),
    );

    // Circuit junction nodes
    [[-380,210],[-300,210],[-300,170],[-230,170],[-380,180],[-340,180],[-340,140],[380,210],[320,210],[260,170]].forEach(([x, y]) => {
        const geo  = new THREE.SphereGeometry(3.5, 8, 8);
        const mat  = new THREE.MeshBasicMaterial({ color: 0xAED534, transparent: true, opacity: 0.8 });
        const node = new THREE.Mesh(geo, mat);
        node.position.set(x, y, 5);
        layerMid.add(node);
    });

    // === 5. EXTRA FLOATING PARTICLES (scattered depth layer) ===
    const SCATTER = 120;
    const scatterPos = new Float32Array(SCATTER * 3);
    for (let i = 0; i < SCATTER; i++) {
        scatterPos[i*3]     = (Math.random() - 0.5) * 900;
        scatterPos[i*3 + 1] = (Math.random() - 0.5) * 600;
        scatterPos[i*3 + 2] = (Math.random() - 0.5) * 300;
    }
    const scatterGeo = new THREE.BufferGeometry();
    scatterGeo.setAttribute('position', new THREE.BufferAttribute(scatterPos, 3));
    const scatterMat = new THREE.PointsMaterial({
        color: 0xAED534,
        size: 1.5,
        transparent: true,
        opacity: 0.3,
        sizeAttenuation: true,
    });
    layerFar.add(new THREE.Points(scatterGeo, scatterMat));

    // Mouse tracking
    let mx = 0, my = 0;
    const heroEl = document.getElementById('heroSection');
    if (heroEl) {
        heroEl.addEventListener('mousemove', e => {
            const r = heroEl.getBoundingClientRect();
            mx = (e.clientX - r.left) / r.width  - 0.5;
            my = (e.clientY - r.top)  / r.height - 0.5;
        }, { passive: true });
        heroEl.addEventListener('mouseleave', () => { mx = 0; my = 0; });
    }

    let t = 0;
    function animate() {
        requestAnimationFrame(animate);
        t += 0.012;

        // Rotate diamonds
        diamonds.forEach(d => { d.rotation.z += d.userData.speed; });

        // Breathe HUD rings
        rings[0].material.opacity = 0.22 + Math.sin(t * 1.6) * 0.10;
        rings[1].material.opacity = 0.10 + Math.sin(t * 1.2 + 0.7) * 0.05;
        rings[2].material.opacity = 0.04 + Math.sin(t * 0.9 + 1.4) * 0.03;

        // Pulse dot cloud
        dotMat.opacity = 0.40 + Math.sin(t * 0.7) * 0.18;

        // Mouse parallax on layers
        layerFar.position.x  += (mx * 18  - layerFar.position.x)  * 0.04;
        layerFar.position.y  += (-my * 12 - layerFar.position.y)  * 0.04;
        layerMid.position.x  += (mx * 35  - layerMid.position.x)  * 0.05;
        layerMid.position.y  += (-my * 22 - layerMid.position.y)  * 0.05;
        layerNear.position.x += (mx * 55  - layerNear.position.x) * 0.06;
        layerNear.position.y += (-my * 38 - layerNear.position.y) * 0.06;

        renderer.render(scene, camera);
    }
    animate();

    window.addEventListener('resize', () => {
        W = parent.offsetWidth  || window.innerWidth;
        H = parent.offsetHeight || window.innerHeight;
        camera.aspect = W / H;
        camera.updateProjectionMatrix();
        renderer.setSize(W, H);
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
