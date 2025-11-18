// ================================================
// ONLY CAFÉ - MODERN INTERACTIONS
// ================================================

// === DOM READY ===
document.addEventListener('DOMContentLoaded', () => {
    initProgressBar();
    initNavigationDots();
    initSmoothScroll();
    initScrollAnimations();
});

// === PROGRESS BAR ===
function initProgressBar() {
    const progressBar = document.querySelector('.progress-bar');

    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = `${scrolled}%`;
    });
}

// === NAVIGATION DOTS ===
function initNavigationDots() {
    const dots = document.querySelectorAll('.nav-dots .dot');

    // Only initialize if navigation dots exist
    if (dots.length === 0) return;

    const sections = document.querySelectorAll('section[id]');

    // Update active dot on scroll
    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (window.scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        dots.forEach(dot => {
            dot.classList.remove('active');
            if (dot.getAttribute('href') === `#${current}`) {
                dot.classList.add('active');
            }
        });
    });
}

// === SMOOTH SCROLL ===
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));

            if (target) {
                window.scrollTo({
                    top: target.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// === SCROLL ANIMATIONS ===
function initScrollAnimations() {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        },
        {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        }
    );

    // Observe animated elements
    const animatedElements = document.querySelectorAll('.summary-card, .team-member-compact, .impact-card, .stakeholder-group, .wbs-column, .approach-item, .risk-card-large, .quality-item, .story-card');

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// === PARALLAX EFFECT (subtle) ===
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const hero = document.querySelector('.hero');

    if (hero && scrolled < window.innerHeight) {
        hero.style.opacity = 1 - (scrolled / (window.innerHeight * 0.8));
    }
});
