// ================================================
// ONLY CAFÉ - MODERN INTERACTIONS
// ================================================

// === DOM READY ===
document.addEventListener('DOMContentLoaded', () => {
    initProgressBar();
    initNavigationDots();
    initSmoothScroll();
    initScrollAnimations();
    initActiveNavigation();
    initBurgerMenu();
    initNavbarScroll();
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
                const navbarHeight = 64; // Hauteur de la navbar
                const targetPosition = target.offsetTop - navbarHeight;

                window.scrollTo({
                    top: targetPosition,
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

// === ACTIVE NAVIGATION (Indicateur qui se déplace) ===
function initActiveNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    // Fonction pour mettre à jour le lien actif
    function updateActiveLink() {
        let current = 'hero'; // Par défaut sur hero

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            // Prendre en compte la hauteur de la navbar (64px)
            if (window.scrollY >= (sectionTop - 100)) {
                current = section.getAttribute('id');
            }
        });

        // Retirer la classe active de tous les liens
        navLinks.forEach(link => {
            link.classList.remove('active');
            // Ajouter la classe active au lien correspondant
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    // Mettre à jour au scroll
    window.addEventListener('scroll', updateActiveLink);

    // Mettre à jour au chargement
    updateActiveLink();
}

// === BURGER MENU (Menu mobile) ===
function initBurgerMenu() {
    const burger = document.querySelector('.burger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (!burger) return;

    // Toggle menu au clic sur le burger
    burger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        burger.classList.toggle('active');

        // Bloquer le scroll du body quand le menu est ouvert
        if (navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        // Animation des barres du burger
        const spans = burger.querySelectorAll('span');
        if (burger.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(7px, 7px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -7px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });

    // Fermer le menu au clic sur un lien
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            burger.classList.remove('active');
            document.body.style.overflow = ''; // Réactiver le scroll

            // Réinitialiser l'animation du burger
            const spans = burger.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });

    // Fermer le menu au clic en dehors
    document.addEventListener('click', (e) => {
        if (!burger.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
            burger.classList.remove('active');
            document.body.style.overflow = ''; // Réactiver le scroll

            const spans = burger.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
}

// === NAVBAR SCROLL EFFECT ===
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');

    if (!navbar) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}
