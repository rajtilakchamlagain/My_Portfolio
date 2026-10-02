document.addEventListener("DOMContentLoaded", () => {
    // 1. Set current year in footer
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // 2. Custom Cursor Logic (only active on desktop)
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    let mouseX = 0, mouseY = 0;
    let outlineX = 0, outlineY = 0;

    if (window.innerWidth > 1100 && cursorDot && cursorOutline) {
        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            // Dot follows instantly
            cursorDot.style.left = `${mouseX}px`;
            cursorDot.style.top = `${mouseY}px`;
        });

        // Smooth outline follow
        function animateCursor() {
            let dx = mouseX - outlineX;
            let dy = mouseY - outlineY;
            
            outlineX += dx * 0.15;
            outlineY += dy * 0.15;
            
            cursorOutline.style.left = `${outlineX}px`;
            cursorOutline.style.top = `${outlineY}px`;
            
            requestAnimationFrame(animateCursor);
        }
        animateCursor();
    }

    // 3. Magnetic Hover Effect
    const magneticElements = document.querySelectorAll('.magnetic');
    
    magneticElements.forEach(elem => {
        elem.addEventListener('mousemove', (e) => {
            if(window.innerWidth <= 1100) return;
            
            const position = elem.getBoundingClientRect();
            const x = e.clientX - position.left - position.width / 2;
            const y = e.clientY - position.top - position.height / 2;
            
            // Move element slightly
            elem.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
            
            // Expand cursor
            if(cursorOutline) cursorOutline.classList.add('hovering');
        });

        elem.addEventListener('mouseleave', () => {
            if(window.innerWidth <= 1100) return;
            elem.style.transform = 'translate(0px, 0px)';
            if(cursorOutline) cursorOutline.classList.remove('hovering');
        });
    });

    // 4. Cinematic Text Reveals & Stagger Items
    const revealElements = document.querySelectorAll('.reveal-mask, .stagger-item');
    
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach((el, index) => {
        // Add a slight delay based on index for staggered entry
        if(el.classList.contains('stagger-item')) {
            el.style.transitionDelay = `${(index % 3) * 0.1}s`;
        }
        revealObserver.observe(el);
    });

    // 5. Active Nav Highlighting
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.navigation a');
    
    const navObserverOptions = {
        threshold: 0.2,
        rootMargin: "-20% 0px -60% 0px"
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

    // 6. Project Filter System
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
                    // Re-trigger stagger animation
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    requestAnimationFrame(() => {
                        requestAnimationFrame(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        });
                    });
                } else {
                    card.classList.add('filter-hidden');
                }
            });
        });

        // Hover effect for cursor
        btn.addEventListener('mouseenter', () => {
            if(cursorOutline) cursorOutline.classList.add('hovering');
        });
        btn.addEventListener('mouseleave', () => {
            if(cursorOutline) cursorOutline.classList.remove('hovering');
        });
    });
});
