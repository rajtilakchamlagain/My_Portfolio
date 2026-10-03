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
        `
    };

    // Attach click events to project cards
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', () => {
            const projectId = card.getAttribute('data-project-id');
            if (projectId && projectDetails[projectId]) {
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
