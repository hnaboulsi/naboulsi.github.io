// ===== Mobile Navigation Toggle =====
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle mobile menu
navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
});

// Close mobile menu when a link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// ===== Smooth Scrolling for Anchor Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const navHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = targetElement.offsetTop - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== Navbar Background on Scroll =====
const navbar = document.querySelector('.navbar');
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    
    // Add shadow when scrolled
    if (currentScrollY > 50) {
        navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = 'none';
    }
    
    lastScrollY = currentScrollY;
});

// ===== Scroll Reveal Animation =====
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Unobserve after animation to improve performance
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Apply fade-in animation to sections and cards
document.addEventListener('DOMContentLoaded', () => {
    // Add fade-in class to elements
    const animateElements = document.querySelectorAll(
        '.timeline-item, .skill-category, .leadership-card, .about-content, .contact-text'
    );
    
    animateElements.forEach((el, index) => {
        el.classList.add('fade-in');
        // Add staggered delay for cards in the same section
        el.style.transitionDelay = `${index * 0.05}s`;
        observer.observe(el);
    });
});

// ===== Active Navigation Link on Scroll =====
const sections = document.querySelectorAll('section[id]');

function highlightNavOnScroll() {
    const scrollY = window.scrollY;
    const navHeight = document.querySelector('.navbar').offsetHeight;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - navHeight - 100;
        const sectionBottom = sectionTop + section.offsetHeight;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        
        if (navLink) {
            if (scrollY >= sectionTop && scrollY < sectionBottom) {
                navLink.classList.add('active');
            } else {
                navLink.classList.remove('active');
            }
        }
    });
}

window.addEventListener('scroll', highlightNavOnScroll);

// ===== Typing Effect for Hero (Optional Enhancement) =====
// Uncomment if you want a typing effect on the tagline
/*
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

document.addEventListener('DOMContentLoaded', () => {
    const tagline = document.querySelector('.hero-tagline');
    const text = tagline.textContent;
    setTimeout(() => typeWriter(tagline, text), 1000);
});
*/

// ===== Preloader (Optional) =====
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// ===== Console Easter Egg =====
console.log('%cHey there! 👋', 'font-size: 24px; font-weight: bold; color: #0f4c75;');
console.log('%cThanks for checking out my portfolio. Feel free to reach out!', 'font-size: 14px; color: #64748b;');
console.log('%cnaboulsi@berkeley.edu', 'font-size: 14px; color: #3282b8;');
