document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. PANEL SLIDING & NAVIGATION LOGIC
    // ==========================================
    const navItems = document.querySelectorAll('.nav-links li');
    const panels = document.querySelectorAll('.panel');
    const navTriggers = document.querySelectorAll('.nav-trigger');

    /**
     * Switch active panel with a sliding transition
     * @param {string} targetPage - The data-page attribute value
     */
    function switchPanel(targetPage) {
        // Update sidebar active link state
        navItems.forEach(item => {
            if (item.getAttribute('data-page') === targetPage) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });

        // Switch visible panel with CSS transition
        panels.forEach(panel => {
            if (panel.id === targetPage) {
                panel.classList.add('active');
            } else {
                panel.classList.remove('active');
            }
        });

        // Scroll back to top of the content area smoothly
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Sidebar navigation click events
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const page = item.getAttribute('data-page');
            switchPanel(page);
        });
    });

    // In-content CTA button navigation triggers (e.g., "View Work", "Get in Touch")
    navTriggers.forEach(btn => {
        btn.addEventListener('click', () => {
            const page = btn.getAttribute('data-page');
            switchPanel(page);
        });
    });

    // ==========================================
    // 2. PROJECT CATEGORY FILTERING
    // ==========================================
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active filter button
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            // Show or hide project cards based on category
            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');

                if (filter === 'all' || category === filter) {
                    card.style.display = 'block';
                    // Trigger reflow for smooth opacity re-entry
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(10px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // ==========================================
    // 3. CONTACT FORM INTERACTIVITY
    // ==========================================
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent full-page refresh

            const nameInput = document.getElementById('name').value;
            const submitBtn = contactForm.querySelector('button[type="submit"]');

            // Temporary visual feedback on button
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;

            setTimeout(() => {
                alert(`Thank you, ${nameInput}! Your message has been recorded.`);
                contactForm.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 1200);
        });
    }
});