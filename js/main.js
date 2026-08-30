/**
 * Marshel Portfolio - Main JavaScript
 * Handles mobile navigation toggle, accessibility, and interactions
 */

document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const siteHeader = document.querySelector('.site-header');

    if (!menuToggle || !navLinks) return;

    // Toggle Mobile Menu
    function toggleMenu(isOpen) {
        const expanded = isOpen !== undefined ? isOpen : menuToggle.getAttribute('aria-expanded') !== 'true';
        
        menuToggle.setAttribute('aria-expanded', String(expanded));
        menuToggle.classList.toggle('active', expanded);
        navLinks.classList.toggle('open', expanded);
        
        if (siteHeader) {
            siteHeader.classList.toggle('menu-active', expanded);
        }

        // Prevent body scroll when mobile menu is open
        if (window.innerWidth <= 768) {
            document.body.style.overflow = expanded ? 'hidden' : '';
        }
    }

    // Event Listeners
    menuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleMenu();
    });

    // Close menu when clicking on any nav link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (menuToggle.getAttribute('aria-expanded') === 'true') {
                toggleMenu(false);
            }
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (menuToggle.getAttribute('aria-expanded') === 'true') {
            if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
                toggleMenu(false);
            }
        }
    });

    // Close menu on Escape key press
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
            toggleMenu(false);
            menuToggle.focus();
        }
    });

    // Reset styles on window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            if (menuToggle.getAttribute('aria-expanded') === 'true') {
                toggleMenu(false);
            }
            document.body.style.overflow = '';
        }
    });
});
