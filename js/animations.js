// ============================================
// ONLY CAFÉ - INTERACTIVE ANIMATIONS
// ============================================

document.addEventListener('DOMContentLoaded', function() {

    // --- CARD HOVER EFFECTS ---
    const cards = document.querySelectorAll('.card, .option-card, .team-member');

    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
        });
    });

    // --- TABLE ROW HIGHLIGHT ---
    const tableRows = document.querySelectorAll('tbody tr');

    tableRows.forEach(row => {
        row.addEventListener('click', function() {
            // Remove highlight from all rows
            tableRows.forEach(r => r.classList.remove('highlighted'));
            // Add highlight to clicked row
            this.classList.add('highlighted');
        });
    });

    // --- RISK SCORE COLOR CODING ---
    const riskScores = document.querySelectorAll('.risk-score');

    riskScores.forEach(score => {
        const value = parseInt(score.textContent);

        if (value >= 50) {
            score.classList.add('high');
        } else if (value >= 30) {
            score.classList.add('medium');
        } else {
            score.classList.add('low');
        }
    });

    // --- USER STORY CARDS RANDOM ROTATION ---
    const storyCards = document.querySelectorAll('.story-card');

    storyCards.forEach((card, index) => {
        // Random rotation between -2 and 2 degrees
        const rotation = (Math.random() - 0.5) * 4;
        card.style.transform = `rotate(${rotation}deg)`;

        // Reset on hover
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'rotate(0deg) scale(1.05)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = `rotate(${rotation}deg)`;
        });
    });

    // --- ACCORDION FUNCTIONALITY (for scenarios, if needed) ---
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const content = this.nextElementSibling;
            const isOpen = content.classList.contains('active');

            // Close all accordions
            document.querySelectorAll('.accordion-content').forEach(item => {
                item.classList.remove('active');
                item.style.maxHeight = null;
            });

            // Open clicked accordion if it was closed
            if (!isOpen) {
                content.classList.add('active');
                content.style.maxHeight = content.scrollHeight + 'px';
            }
        });
    });

    // --- LAZY LOAD IMAGES ---
    const images = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));

    // --- TOOLTIP FUNCTIONALITY ---
    const tooltipTriggers = document.querySelectorAll('[data-tooltip]');

    tooltipTriggers.forEach(trigger => {
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.textContent = trigger.getAttribute('data-tooltip');
        document.body.appendChild(tooltip);

        trigger.addEventListener('mouseenter', function(e) {
            tooltip.style.display = 'block';
            tooltip.style.left = e.pageX + 10 + 'px';
            tooltip.style.top = e.pageY + 10 + 'px';
        });

        trigger.addEventListener('mousemove', function(e) {
            tooltip.style.left = e.pageX + 10 + 'px';
            tooltip.style.top = e.pageY + 10 + 'px';
        });

        trigger.addEventListener('mouseleave', function() {
            tooltip.style.display = 'none';
        });
    });

    // --- COPY TO CLIPBOARD (for code snippets if any) ---
    const copyButtons = document.querySelectorAll('.copy-btn');

    copyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            const target = document.getElementById(targetId);

            if (target) {
                navigator.clipboard.writeText(target.textContent).then(() => {
                    this.textContent = 'Copied!';
                    setTimeout(() => {
                        this.textContent = 'Copy';
                    }, 2000);
                });
            }
        });
    });

    // --- BACK TO TOP BUTTON ---
    const backToTop = document.createElement('button');
    backToTop.className = 'back-to-top';
    backToTop.innerHTML = '↑';
    backToTop.setAttribute('aria-label', 'Back to top');
    document.body.appendChild(backToTop);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // --- PRINT PAGE BUTTON ---
    const printButtons = document.querySelectorAll('.print-btn');

    printButtons.forEach(button => {
        button.addEventListener('click', () => {
            window.print();
        });
    });
});

// --- CSS for Back to Top Button ---
const style = document.createElement('style');
style.textContent = `
    .back-to-top {
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: var(--color-primary);
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 1.5rem;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        z-index: 999;
    }

    .back-to-top.visible {
        opacity: 1;
        visibility: visible;
    }

    .back-to-top:hover {
        background: var(--color-primary-dark);
        transform: translateY(-5px);
    }

    .tooltip {
        position: absolute;
        background: rgba(0,0,0,0.9);
        color: white;
        padding: 8px 12px;
        border-radius: 4px;
        font-size: 0.85rem;
        z-index: 1000;
        display: none;
        pointer-events: none;
        white-space: nowrap;
    }

    .highlighted {
        background: var(--color-secondary-light) !important;
        border-left: 4px solid var(--color-primary) !important;
    }
`;
document.head.appendChild(style);
