// ============================================
// ONLY CAFÉ - SCROLL ANIMATIONS
// ============================================

document.addEventListener('DOMContentLoaded', function() {

    // --- FADE IN ON SCROLL ---
    const fadeElements = document.querySelectorAll('.summary-card, .team-member-compact, .impact-card, .stakeholder-group, .wbs-column, .approach-item, .risk-card-large, .quality-item, .story-card');

    const fadeInOnScroll = () => {
        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;

            // Check if element is in viewport
            if (elementTop < window.innerHeight - 100 && elementBottom > 0) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Initialize elements with fade effect
    fadeElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    // Run on scroll
    window.addEventListener('scroll', debounce(fadeInOnScroll, 10));

    // Run on load
    fadeInOnScroll();

    // --- PARALLAX EFFECT (Hero) ---
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');

    if (hero && heroContent) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.5;

            if (scrolled < hero.offsetHeight) {
                heroContent.style.transform = `translateY(${rate}px)`;
                hero.style.opacity = 1 - (scrolled / hero.offsetHeight);
            }
        });
    }

    // --- HIDE SCROLL INDICATOR ON SCROLL ---
    const scrollIndicator = document.querySelector('.scroll-indicator');

    if (scrollIndicator) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                scrollIndicator.style.opacity = '0';
                scrollIndicator.style.pointerEvents = 'none';
            } else {
                scrollIndicator.style.opacity = '0.8';
                scrollIndicator.style.pointerEvents = 'auto';
            }
        });
    }

    // --- SECTION COUNTERS (Animated Numbers) ---
    const counters = document.querySelectorAll('.stat-number, .budget-summary h3');
    let hasCounted = false;

    const animateCounters = () => {
        if (hasCounted) return;

        counters.forEach(counter => {
            const elementTop = counter.getBoundingClientRect().top;

            if (elementTop < window.innerHeight - 100) {
                const target = counter.innerText.replace(/[^0-9]/g, '');

                if (target && !isNaN(target)) {
                    const increment = Math.ceil(target / 50);
                    let current = 0;

                    const updateCounter = () => {
                        current += increment;

                        if (current < target) {
                            counter.innerText = counter.innerText.replace(/[0-9,]+/, current.toLocaleString());
                            setTimeout(updateCounter, 30);
                        } else {
                            counter.innerText = counter.innerText.replace(/[0-9,]+/, parseInt(target).toLocaleString());
                            hasCounted = true;
                        }
                    };

                    updateCounter();
                }
            }
        });
    };

    window.addEventListener('scroll', debounce(animateCounters, 50));
    animateCounters();
});

// Helper function for debouncing (if not in main.js)
if (typeof debounce === 'undefined') {
    function debounce(func, wait = 20, immediate = true) {
        let timeout;
        return function() {
            const context = this, args = arguments;
            const later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }
}
