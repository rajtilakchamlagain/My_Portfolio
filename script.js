document.addEventListener("DOMContentLoaded", () => {
    // 1. Set current year in footer
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // 2. Mouse Glow Effect (Ethereal Background Tracker)
    // Tracks the mouse and updates CSS variables to move the radial gradient glow
    document.addEventListener("mousemove", (e) => {
        // We set these variables on the root so .mouse-glow can use them
        document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
        document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
    });

    // 3. Smooth Fade-in on Scroll
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const fadeObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => fadeObserver.observe(el));

    // Fallback: forcefully show elements after 1.5s just in case the browser observer fails on desktop
    setTimeout(() => {
        fadeElements.forEach(el => el.classList.add('visible'));
    }, 1500);

    // 4. Active Nav Highlighting
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    const navObserverOptions = {
        threshold: 0.2,
        rootMargin: "-100px 0px -40% 0px"
    };

    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                let currentId = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if(link.getAttribute('href') === `#${currentId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, navObserverOptions);

    sections.forEach(section => {
        navObserver.observe(section);
    });

    // 5. Project Filter System
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    card.classList.remove('filter-hidden');
                    // Quick fade and slide up animation
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(15px) scale(0.98)';
                    requestAnimationFrame(() => {
                        requestAnimationFrame(() => {
                            card.style.transition = 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0) scale(1)';
                        });
                    });
                } else {
                    card.classList.add('filter-hidden');
                }
            });
        });
    });

    // 6. Premium Modal Architecture
    const modalOverlay = document.getElementById('premium-modal');
    const modalClose = document.querySelector('.modal-close');
    const modalContent = document.getElementById('modal-content');

    window.openModal = function(contentHTML) {
        if(modalContent && contentHTML) {
            modalContent.innerHTML = contentHTML;
        }
        if(modalOverlay) {
            modalOverlay.classList.add('active');
            document.body.classList.add('modal-open');
        }
    };

    window.closeModal = function() {
        if(modalOverlay) {
            modalOverlay.classList.remove('active');
            document.body.classList.remove('modal-open');
        }
    };

    if (modalClose) {
        modalClose.addEventListener('click', window.closeModal);
    }

    if (modalOverlay) {
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                window.closeModal();
            }
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalOverlay && modalOverlay.classList.contains('active')) {
            window.closeModal();
        }
    });

    // 7. Phase 2: Detailed Project Views Data
    const projectDetails = {
        'clearsight': `
            <div class="modal-project">
                <h2 class="gradient-text" style="font-size: 2.2rem; margin-bottom: 0.5rem; font-family: var(--font-heading);">ClearSight AI</h2>
                <h3 style="color: var(--text-muted); margin-bottom: 1.5rem; font-weight: 500;">Enterprise Law Enforcement Surveillance Suite</h3>
                
                <p style="margin-bottom: 1.5rem; line-height: 1.7;">A state-of-the-art intelligent video surveillance engineering architecture engineered for automated pedestrian identification, face recognition, and criminal investigation in public arenas, night footage, and dense transit terminals.</p>
                
                <div style="background: rgba(255,255,255,0.4); padding: 1.5rem; border-radius: 16px; margin-bottom: 1.5rem; border: 1px solid rgba(255,255,255,0.6);">
                    <h4 style="margin-bottom: 0.8rem; font-family: var(--font-heading);">Core Neural Backbone</h4>
                    <p style="font-size: 0.9rem; color: var(--text-main); font-weight: 600;">Ultralytics YOLOv8 + ByteTrack Continuous Memory + RetinaFace Low-Light Extractor + 512-Dimensional Deep ArcFace Vector Geometry</p>
                </div>

                <h4 style="margin-bottom: 1rem; font-family: var(--font-heading);">Key Engineering Breakthroughs:</h4>
                <ul class="clean-list" style="margin-bottom: 2.5rem;">
                    <li><strong>Autonomous Spectral Gap Detection:</strong> Implements unsupervised maximal derivative thresholding to autonomously calculate separation boundaries without manual guesswork.</li>
                    <li><strong>Zero-Lag Horizontal Tabs:</strong> Replaces heavy DOM byte injections with high-speed disk streaming, guaranteeing 60-FPS interface fluidity.</li>
                    <li><strong>Automated Forensic Slow-Motion:</strong> Dynamically interpolates 3x slow-motion investigative replay for suspect trajectories.</li>
                    <li><strong>High-Speed Stride Optimization:</strong> Eliminates CPU computational bottlenecks on 450+ frame video feeds.</li>
                </ul>

                <div style="display: flex; gap: 1rem;">
                    <a href="https://github.com/rajtilakchamlagain/ClearSight" target="_blank" class="glass-btn primary" style="padding: 0.8rem 1.5rem; font-size: 0.9rem;">View Source Code</a>
                </div>
            </div>
        `,
        'biosync': `
            <div class="modal-project">
                <h2 class="gradient-text" style="font-size: 2.2rem; margin-bottom: 0.5rem; font-family: var(--font-heading);">BioSync</h2>
                <h3 style="color: var(--text-muted); margin-bottom: 1.5rem; font-weight: 500;">Biometric Security & Attendance</h3>
                
                <p style="margin-bottom: 1.5rem; line-height: 1.7;">A full-stack biometric attendance system utilizing secure QR tokenization and DeepFace neural networks for secure real-time facial verification. Designed to eliminate proxy attendance and streamline classroom/office management.</p>
                
                <div style="background: rgba(255,255,255,0.4); padding: 1.5rem; border-radius: 16px; margin-bottom: 1.5rem; border: 1px solid rgba(255,255,255,0.6);">
                    <h4 style="margin-bottom: 0.8rem; font-family: var(--font-heading);">Tech Stack</h4>
                    <p style="font-size: 0.9rem; color: var(--text-main); font-weight: 600;">Python / DeepFace / WebSockets / MERN Stack Architecture</p>
                </div>

                <div style="display: flex; gap: 1rem;">
                    <a href="https://bio-sync-biometric-attendance.vercel.app" target="_blank" class="glass-btn primary" style="padding: 0.8rem 1.5rem; font-size: 0.9rem;">Live Demo</a>
                    <a href="https://github.com/rajtilakchamlagain/BioSync-Biometric-Attendance" target="_blank" class="glass-btn" style="padding: 0.8rem 1.5rem; font-size: 0.9rem;">Source Code</a>
                </div>
            </div>
        `,
        'intellifilter': `
            <div class="modal-project">
                <h2 class="gradient-text" style="font-size: 2.2rem; margin-bottom: 0.5rem; font-family: var(--font-heading);">IntelliFilter</h2>
                <h3 style="color: var(--text-muted); margin-bottom: 1.5rem; font-weight: 500;">NLP Spam Detection Engine</h3>
                
                <p style="margin-bottom: 1.5rem; line-height: 1.7;">An end-to-end Natural Language Processing (NLP) model utilizing Multinomial Naive Bayes to automatically detect and filter spam messages. Includes a full data cleaning pipeline, tokenization, and an interactive web interface for real-time testing.</p>
                
                <div style="background: rgba(255,255,255,0.4); padding: 1.5rem; border-radius: 16px; margin-bottom: 1.5rem; border: 1px solid rgba(255,255,255,0.6);">
                    <h4 style="margin-bottom: 0.8rem; font-family: var(--font-heading);">Machine Learning Pipeline</h4>
                    <p style="font-size: 0.9rem; color: var(--text-main); font-weight: 600;">Python / Scikit-Learn / NLTK / TF-IDF Vectorization / Streamlit</p>
                </div>

                <div style="display: flex; gap: 1rem;">
                    <a href="https://intellifilter-bvec.streamlit.app" target="_blank" class="glass-btn primary" style="padding: 0.8rem 1.5rem; font-size: 0.9rem;">Live Demo</a>
                    <a href="https://github.com/rajtilakchamlagain/IntelliFilter" target="_blank" class="glass-btn" style="padding: 0.8rem 1.5rem; font-size: 0.9rem;">Source Code</a>
                </div>
            </div>
        `,
        'digit-recognizer': `
            <div class="modal-project">
                <h2 class="gradient-text" style="font-size: 2.2rem; margin-bottom: 0.5rem; font-family: var(--font-heading);">Digit Recognizer</h2>
                <h3 style="color: var(--text-muted); margin-bottom: 1.5rem; font-weight: 500;">Handwritten Number Classification</h3>
                <p style="margin-bottom: 1.5rem; line-height: 1.7;">A machine learning model leveraging advanced Convolutional Neural Networks (CNNs) to accurately recognize and classify handwritten digits in real-time. Trained on the standard MNIST dataset with high validation accuracy.</p>
                <div style="background: rgba(255,255,255,0.4); padding: 1.5rem; border-radius: 16px; margin-bottom: 1.5rem; border: 1px solid rgba(255,255,255,0.6);">
                    <h4 style="margin-bottom: 0.8rem; font-family: var(--font-heading);">Architecture</h4>
                    <p style="font-size: 0.9rem; color: var(--text-main); font-weight: 600;">Python / TensorFlow / Keras / OpenCV</p>
                </div>
                <div style="display: flex; gap: 1rem;">
                    <a href="https://github.com/rajtilakchamlagain/digit-recognizer-nn" target="_blank" class="glass-btn primary" style="padding: 0.8rem 1.5rem; font-size: 0.9rem;">Source Code</a>
                </div>
            </div>
        `,
        'airscript-cv': `
            <div class="modal-project">
                <h2 class="gradient-text" style="font-size: 2.2rem; margin-bottom: 0.5rem; font-family: var(--font-heading);">AirScript CV</h2>
                <h3 style="color: var(--text-muted); margin-bottom: 1.5rem; font-weight: 500;">Gesture-Based Air Writing Recognition</h3>
                <p style="margin-bottom: 1.5rem; line-height: 1.7;">An interactive computer vision application that tracks hand gestures via webcam, allowing users to draw and write text "in the air." Uses advanced contour detection and finger tracking algorithms.</p>
                <div style="background: rgba(255,255,255,0.4); padding: 1.5rem; border-radius: 16px; margin-bottom: 1.5rem; border: 1px solid rgba(255,255,255,0.6);">
                    <h4 style="margin-bottom: 0.8rem; font-family: var(--font-heading);">Technology</h4>
                    <p style="font-size: 0.9rem; color: var(--text-main); font-weight: 600;">OpenCV / Python / MediaPipe</p>
                </div>
                <div style="display: flex; gap: 1rem;">
                    <a href="https://github.com/rajtilakchamlagain/AirScript-CV" target="_blank" class="glass-btn primary" style="padding: 0.8rem 1.5rem; font-size: 0.9rem;">Source Code</a>
                </div>
            </div>
        `,
        'homelyhub': `
            <div class="modal-project">
                <h2 class="gradient-text" style="font-size: 2.2rem; margin-bottom: 0.5rem; font-family: var(--font-heading);">HomelyHub</h2>
                <h3 style="color: var(--text-muted); margin-bottom: 1.5rem; font-weight: 500;">Full-Stack Property Booking Platform</h3>
                <p style="margin-bottom: 1.5rem; line-height: 1.7;">A comprehensive real estate and property booking platform built during my MERN stack internship. Features secure user authentication, interactive property maps, and a seamless booking checkout flow.</p>
                <div style="background: rgba(255,255,255,0.4); padding: 1.5rem; border-radius: 16px; margin-bottom: 1.5rem; border: 1px solid rgba(255,255,255,0.6);">
                    <h4 style="margin-bottom: 0.8rem; font-family: var(--font-heading);">The Stack</h4>
                    <p style="font-size: 0.9rem; color: var(--text-main); font-weight: 600;">MongoDB / Express.js / React.js / Node.js / REST APIs</p>
                </div>
                <div style="display: flex; gap: 1rem;">
                    <a href="https://github.com/rajtilakchamlagain/HomelyHub" target="_blank" class="glass-btn primary" style="padding: 0.8rem 1.5rem; font-size: 0.9rem;">Source Code</a>
                </div>
            </div>
        `,
        'pitchbid': `
            <div class="modal-project">
                <h2 class="gradient-text" style="font-size: 2.2rem; margin-bottom: 0.5rem; font-family: var(--font-heading);">PitchBid</h2>
                <h3 style="color: var(--text-muted); margin-bottom: 1.5rem; font-weight: 500;">Startup Investment & Bidding Platform</h3>
                <p style="margin-bottom: 1.5rem; line-height: 1.7;">A dynamic digital arena connecting entrepreneurs with investors. Founders can upload their pitch decks, and investors can place real-time bids on equity offers.</p>
                <div style="background: rgba(255,255,255,0.4); padding: 1.5rem; border-radius: 16px; margin-bottom: 1.5rem; border: 1px solid rgba(255,255,255,0.6);">
                    <h4 style="margin-bottom: 0.8rem; font-family: var(--font-heading);">Frontend Architecture</h4>
                    <p style="font-size: 0.9rem; color: var(--text-main); font-weight: 600;">Next.js / Server-Side Rendering / Tailwind CSS</p>
                </div>
                <div style="display: flex; gap: 1rem;">
                    <a href="https://pitch-bid.vercel.app" target="_blank" class="glass-btn primary" style="padding: 0.8rem 1.5rem; font-size: 0.9rem;">Live Demo</a>
                    <a href="https://github.com/rajtilakchamlagain/PitchBid" target="_blank" class="glass-btn" style="padding: 0.8rem 1.5rem; font-size: 0.9rem;">Source Code</a>
                </div>
            </div>
        `,
        'sahitya-sanskriti-hub': `
            <div class="modal-project">
                <h2 class="gradient-text" style="font-size: 2.2rem; margin-bottom: 0.5rem; font-family: var(--font-heading);">Sahitya Sanskriti Hub</h2>
                <h3 style="color: var(--text-muted); margin-bottom: 1.5rem; font-weight: 500;">Digital Literary Portfolio</h3>
                <p style="margin-bottom: 1.5rem; line-height: 1.7;">A live digital academic portfolio website focusing on literary and cultural publications. Engineered for high SEO performance, fast load times, and responsive content delivery across all devices.</p>
                <div style="background: rgba(255,255,255,0.4); padding: 1.5rem; border-radius: 16px; margin-bottom: 1.5rem; border: 1px solid rgba(255,255,255,0.6);">
                    <h4 style="margin-bottom: 0.8rem; font-family: var(--font-heading);">Infrastructure</h4>
                    <p style="font-size: 0.9rem; color: var(--text-main); font-weight: 600;">Vanilla JS / Custom Domain Management / Analytics / Vercel CI/CD</p>
                </div>
                <div style="display: flex; gap: 1rem;">
                    <a href="https://sahityasanskriti.online" target="_blank" class="glass-btn primary" style="padding: 0.8rem 1.5rem; font-size: 0.9rem;">Live Demo</a>
                    <a href="https://github.com/rajtilakchamlagain/Sahitya-Sanskriti-Hub" target="_blank" class="glass-btn" style="padding: 0.8rem 1.5rem; font-size: 0.9rem;">Source Code</a>
                </div>
            </div>
        `,
        'assam-tourism-portal': `
            <div class="modal-project">
                <h2 class="gradient-text" style="font-size: 2.2rem; margin-bottom: 0.5rem; font-family: var(--font-heading);">Assam Tourism Portal</h2>
                <h3 style="color: var(--text-muted); margin-bottom: 1.5rem; font-weight: 500;">DITEC Government Internship Project</h3>
                <p style="margin-bottom: 1.5rem; line-height: 1.7;">Developed during my industrial internship with DITEC, Govt. of Assam. An open-source, highly responsive tourism platform showcasing Assam's rich heritage, interactive destination maps, and cultural data.</p>
                <div style="background: rgba(255,255,255,0.4); padding: 1.5rem; border-radius: 16px; margin-bottom: 1.5rem; border: 1px solid rgba(255,255,255,0.6);">
                    <h4 style="margin-bottom: 0.8rem; font-family: var(--font-heading);">Tech Stack</h4>
                    <p style="font-size: 0.9rem; color: var(--text-main); font-weight: 600;">JavaScript / Web APIs / Government IT Infrastructure UI</p>
                </div>
                <div style="display: flex; gap: 1rem;">
                    <a href="https://assam-tourism-portal-ditecdummy.vercel.app" target="_blank" class="glass-btn primary" style="padding: 0.8rem 1.5rem; font-size: 0.9rem;">Live Demo</a>
                    <a href="https://github.com/rajtilakchamlagain/Assam-Tourism-Portal-DITEC" target="_blank" class="glass-btn" style="padding: 0.8rem 1.5rem; font-size: 0.9rem;">Source Code</a>
                </div>
            </div>
        `,
        'chessverse': `
            <div class="modal-project">
                <h2 class="gradient-text" style="font-size: 2.2rem; margin-bottom: 0.5rem; font-family: var(--font-heading);">Chessverse</h2>
                <h3 style="color: var(--text-muted); margin-bottom: 1.5rem; font-weight: 500;">Interactive Web-Based Chess Client</h3>
                <p style="margin-bottom: 1.5rem; line-height: 1.7;">A beautifully designed, highly interactive web chess application. Features flawless drag-and-drop mechanics, move validation, and elegant UI design inspired by premium gaming platforms.</p>
                <div style="background: rgba(255,255,255,0.4); padding: 1.5rem; border-radius: 16px; margin-bottom: 1.5rem; border: 1px solid rgba(255,255,255,0.6);">
                    <h4 style="margin-bottom: 0.8rem; font-family: var(--font-heading);">UI/UX Highlights</h4>
                    <p style="font-size: 0.9rem; color: var(--text-main); font-weight: 600;">CSS3 Animations / Advanced JavaScript DOM Manipulation / Game Logic</p>
                </div>
                <div style="display: flex; gap: 1rem;">
                    <a href="https://bvecchess.vercel.app" target="_blank" class="glass-btn primary" style="padding: 0.8rem 1.5rem; font-size: 0.9rem;">Live Demo</a>
                    <a href="https://github.com/rajtilakchamlagain/BVEC_Chess" target="_blank" class="glass-btn" style="padding: 0.8rem 1.5rem; font-size: 0.9rem;">Source Code</a>
                </div>
            </div>
        `,
        'lunar-registry': `
            <div class="modal-project">
                <h2 class="gradient-text" style="font-size: 2.2rem; margin-bottom: 0.5rem; font-family: var(--font-heading);">Lunar Registry</h2>
                <h3 style="color: var(--text-muted); margin-bottom: 1.5rem; font-weight: 500;">Creative Space-Themed Web Experience</h3>
                <p style="margin-bottom: 1.5rem; line-height: 1.7;">A highly creative frontend challenge showcasing advanced layout techniques. Users navigate through an immersive, cosmic visual story regarding lunar property ownership.</p>
                <div style="background: rgba(255,255,255,0.4); padding: 1.5rem; border-radius: 16px; margin-bottom: 1.5rem; border: 1px solid rgba(255,255,255,0.6);">
                    <h4 style="margin-bottom: 0.8rem; font-family: var(--font-heading);">Visual Architecture</h4>
                    <p style="font-size: 0.9rem; color: var(--text-main); font-weight: 600;">Parallax Scrolling / CSS Variables / Responsive Grid Systems</p>
                </div>
                <div style="display: flex; gap: 1rem;">
                    <a href="https://lunar-registry.vercel.app" target="_blank" class="glass-btn primary" style="padding: 0.8rem 1.5rem; font-size: 0.9rem;">Live Demo</a>
                    <a href="https://github.com/rajtilakchamlagain/lunar-registry" target="_blank" class="glass-btn" style="padding: 0.8rem 1.5rem; font-size: 0.9rem;">Source Code</a>
                </div>
            </div>
        `,
        'interactive-3d-portfolio': `
            <div class="modal-project">
                <h2 class="gradient-text" style="font-size: 2.2rem; margin-bottom: 0.5rem; font-family: var(--font-heading);">Interactive 3D Portfolio</h2>
                <h3 style="color: var(--text-muted); margin-bottom: 1.5rem; font-weight: 500;">WebGL Immersive Web App</h3>
                <p style="margin-bottom: 1.5rem; line-height: 1.7;">An experimental digital environment pushing the boundaries of frontend engineering. Utilizes 3D rendering directly in the browser to create a memorable, interactive spatial UI.</p>
                <div style="background: rgba(255,255,255,0.4); padding: 1.5rem; border-radius: 16px; margin-bottom: 1.5rem; border: 1px solid rgba(255,255,255,0.6);">
                    <h4 style="margin-bottom: 0.8rem; font-family: var(--font-heading);">Render Engine</h4>
                    <p style="font-size: 0.9rem; color: var(--text-main); font-weight: 600;">Three.js / WebGL / React Three Fiber / Camera Physics</p>
                </div>
                <div style="display: flex; gap: 1rem;">
                    <a href="https://futurist-portfolio-omega.vercel.app" target="_blank" class="glass-btn primary" style="padding: 0.8rem 1.5rem; font-size: 0.9rem;">Live Demo</a>
                </div>
            </div>
        `,
        'mobile-ui-prototyping': `
            <div class="modal-project">
                <img src="assets/projects/figma_ui.jpeg" alt="Figma UI Design" style="width: 100%; border-radius: 16px; margin-bottom: 2rem; box-shadow: 0 10px 30px rgba(0,0,0,0.1); border: 1px solid rgba(255,255,255,0.3);">
                <h2 class="gradient-text" style="font-size: 2.2rem; margin-bottom: 0.5rem; font-family: var(--font-heading);">Mobile UI Prototyping</h2>
                <h3 style="color: var(--text-muted); margin-bottom: 1.5rem; font-weight: 500;">Figma UX Engineering</h3>
                <p style="margin-bottom: 1.5rem; line-height: 1.7;">A demonstration of my ability to design beautiful, user-centric mobile applications before writing a single line of code. Features a high-fidelity interactive prototype demonstrating layout, color theory, and user flows.</p>
                <div style="background: rgba(255,255,255,0.4); padding: 1.5rem; border-radius: 16px; margin-bottom: 1.5rem; border: 1px solid rgba(255,255,255,0.6);">
                    <h4 style="margin-bottom: 0.8rem; font-family: var(--font-heading);">Design Tools</h4>
                    <p style="font-size: 0.9rem; color: var(--text-main); font-weight: 600;">Figma / Auto-Layout / Component Systems / Wireframing</p>
                </div>
                <div style="display: flex; gap: 1rem;">
                    <a href="https://www.figma.com/design/uxboXxBzN7NRS5A6O2GoPb/Untitled?node-id=0-1&t=53GaVrIKPuzdxbqt-1" target="_blank" class="glass-btn primary" style="padding: 0.8rem 1.5rem; font-size: 0.9rem;">View Prototype in Figma</a>
                </div>
            </div>
        `
    };

    // Attach click events to all project cards dynamically
    document.querySelectorAll('.project-card').forEach(card => {
        // Auto-generate ID from title if missing (ensures ALL projects work without touching HTML)
        let projectId = card.getAttribute('data-project-id');
        if (!projectId) {
            const title = card.querySelector('h3').textContent;
            projectId = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
            card.setAttribute('data-project-id', projectId);
        }
        
        // Add styling dynamically
        card.style.cursor = 'pointer';
        card.setAttribute('title', 'Click for deep dive');

        card.addEventListener('click', () => {
            if (projectDetails[projectId]) {
                window.openModal(projectDetails[projectId]);
            }
        });
    });

    // Prevent modal from opening if user clicks the external github/demo links inside the card
    document.querySelectorAll('.project-links a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    });

});

// Phase 3: Design Gallery Function (global scope so onclick works)
window.openDesignGallery = function() {
    const designs = [
        { src: 'assets/design/techflare_invitation.png', title: 'TechFlare Invitation', desc: 'Official invitation design for TechFlare 2026, the annual college tech fest at BVEC.' },
        { src: 'assets/design/cover.png', title: 'Cover — College Magazine', desc: 'Cover page design for the BVEC Annual Magazine 2026.' },
        { src: 'assets/design/the_game.png', title: 'The Game', desc: 'Magazine feature spread design — bold and dynamic sports-themed layout.' },
        { src: 'assets/design/the_people.png', title: 'The People', desc: 'Magazine editorial layout celebrating the people behind the scenes at BVEC.' },
        { src: 'assets/design/the_finish.png', title: 'The Finish', desc: 'Magazine closing feature spread — a high-impact visual conclusion.' },
        { src: 'assets/design/five.png', title: 'Visual Spread', desc: 'Special graphic layout for the college annual magazine 2026.' },
    ];

    let current = 0;

    function buildGallery(idx) {
        const d = designs[idx];
        return `
            <div class="design-gallery">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1.5rem;">
                    <h2 class="gradient-text" style="font-size:1.8rem; font-family:var(--font-heading); margin:0;">Graphic Design Work</h2>
                    <span style="font-size:0.9rem; color:var(--text-muted);">${idx + 1} / ${designs.length}</span>
                </div>
                <div style="position:relative; border-radius:16px; overflow:hidden; box-shadow: 0 20px 60px rgba(0,0,0,0.2);">
                    <img src="${d.src}" alt="${d.title}" style="width:100%; display:block; border-radius:16px;">
                </div>
                <div style="margin-top:1.5rem;">
                    <h3 style="font-size:1.3rem; margin-bottom:0.4rem; font-family:var(--font-heading);">${d.title}</h3>
                    <p style="color:var(--text-muted); line-height:1.6;">${d.desc}</p>
                </div>
                <div style="display:flex; gap:1rem; margin-top:1.5rem; justify-content:center;">
                    <button onclick="galleryNav(-1)" class="glass-btn" style="padding:0.7rem 1.8rem; font-size:0.95rem;" ${idx === 0 ? 'disabled style="opacity:0.4;padding:0.7rem 1.8rem;font-size:0.95rem;"' : ''}>← Prev</button>
                    <button onclick="galleryNav(1)"  class="glass-btn primary" style="padding:0.7rem 1.8rem; font-size:0.95rem;" ${idx === designs.length - 1 ? 'disabled style="opacity:0.4;padding:0.7rem 1.8rem;font-size:0.95rem;"' : ''}>Next →</button>
                </div>
            </div>
        `;
    }

    window.galleryNav = function(dir) {
        current = Math.max(0, Math.min(designs.length - 1, current + dir));
        const modalContent = document.getElementById('modal-content');
        if (modalContent) modalContent.innerHTML = buildGallery(current);
    };

    window.openModal(buildGallery(0));
};

// Phase 4: Hamburger Drawer Logic
(function() {
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const drawer       = document.getElementById('achievements-drawer');
    const overlay      = document.getElementById('drawer-overlay');
    const closeBtn     = document.getElementById('drawer-close');

    function openDrawer() {
        drawer.classList.add('open');
        overlay.classList.add('active');
        document.body.classList.add('modal-open');
    }
    function closeDrawer() {
        drawer.classList.remove('open');
        overlay.classList.remove('active');
        document.body.classList.remove('modal-open');
    }

    if (hamburgerBtn) hamburgerBtn.addEventListener('click', openDrawer);
    if (closeBtn)     closeBtn.addEventListener('click', closeDrawer);
    if (overlay)      overlay.addEventListener('click', closeDrawer);
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeDrawer(); });
})();

// Open a certificate in the main modal from the drawer
window.openCert = function(src, title, desc) {
    const html = `
        <div class="modal-project">
            <h2 class="gradient-text" style="font-size:1.9rem;margin-bottom:0.3rem;font-family:var(--font-heading);">${title}</h2>
            <p style="color:var(--text-muted);margin-bottom:1.5rem;font-size:0.9rem;">${desc}</p>
            <img src="${src}" alt="${title}" style="width:100%;border-radius:16px;box-shadow:0 16px 48px rgba(0,0,0,0.15);border:1px solid rgba(255,255,255,0.3);">
        </div>`;
    // Close the drawer first, then open modal
    document.getElementById('achievements-drawer').classList.remove('open');
    document.getElementById('drawer-overlay').classList.remove('active');
    setTimeout(() => window.openModal(html), 200);
};
// CHESS.COM API INTEGRATION
document.addEventListener('DOMContentLoaded', () => {
    const chessCard = document.getElementById('chess-stats-card');
    if (chessCard) {
        const username = 'RajTilakChamlagain123';
        
        // Fetch Stats
        fetch(`https://api.chess.com/pub/player/${username}/stats`)
            .then(res => res.json())
            .then(data => {
                const rapid = data.chess_rapid?.last?.rating || 'N/A';
                const blitz = data.chess_blitz?.last?.rating || 'N/A';
                document.getElementById('chess-rapid').innerText = rapid;
                document.getElementById('chess-blitz').innerText = blitz;
                document.getElementById('chess-username').innerText = username;
                document.getElementById('chess-status').innerText = 'Live Rating Active 🟢';
            })
            .catch(err => {
                document.getElementById('chess-status').innerText = 'Unable to load stats';
            });
            
        // Fetch Profile for Avatar
        fetch(`https://api.chess.com/pub/player/${username}`)
            .then(res => res.json())
            .then(data => {
                if (data.avatar) {
                    const avatarImg = document.getElementById('chess-avatar');
                    avatarImg.src = data.avatar;
                    avatarImg.style.display = 'block';
                }
            });
    }
});
