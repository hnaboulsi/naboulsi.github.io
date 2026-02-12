// ===== Mobile Navigation Toggle =====
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// ===== Scroll Animations =====
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Optional: stop observing after animation
            // fadeInObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all fade-in elements
document.querySelectorAll('.fade-in').forEach(el => {
    fadeInObserver.observe(el);
});

// ===== Navbar Background on Scroll =====
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add/remove scrolled class for styling
    if (currentScroll > 50) {
        navbar.style.background = 'rgba(10, 10, 26, 0.95)';
    } else {
        navbar.style.background = 'rgba(10, 10, 26, 0.8)';
    }
    
    lastScroll = currentScroll;
});

// ===== Active Navigation Link Highlighting =====
const sections = document.querySelectorAll('section[id]');

const highlightNavOnScroll = () => {
    const scrollY = window.pageYOffset;
    const viewportProbe = scrollY + window.innerHeight * 0.45;
    const atPageBottom = window.innerHeight + scrollY >= document.documentElement.scrollHeight - 2;
    let activeSectionId = sections[0]?.getAttribute('id');

    sections.forEach(section => {
        if (viewportProbe >= section.offsetTop) {
            activeSectionId = section.getAttribute('id');
        }
    });

    // Ensure the final section can become active even when it is short.
    if (atPageBottom && sections.length > 0) {
        activeSectionId = sections[sections.length - 1].getAttribute('id');
    }

    navLinks.forEach(link => {
        const targetId = link.getAttribute('href')?.replace('#', '');
        if (targetId === activeSectionId) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
};

window.addEventListener('scroll', highlightNavOnScroll);

// ===== Smooth Scroll for Safari =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== Parallax Effect for Particles =====
const particles = document.querySelectorAll('.particle');
let ticking = false;

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const scrolled = window.pageYOffset;
            particles.forEach((particle, index) => {
                const speed = 0.1 + (index * 0.05);
                particle.style.transform = `translateY(${scrolled * speed}px)`;
            });
            ticking = false;
        });
        ticking = true;
    }
});

// ===== Skill Tags Hover Effect =====
const skillTags = document.querySelectorAll('.skill-tag');

skillTags.forEach(tag => {
    tag.addEventListener('mouseenter', () => {
        tag.style.transform = 'translateY(-2px) scale(1.02)';
    });
    
    tag.addEventListener('mouseleave', () => {
        tag.style.transform = 'translateY(0) scale(1)';
    });
});

// ===== Timeline Marker Animation =====
const timelineItems = document.querySelectorAll('.timeline-item');

const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.querySelector('.timeline-marker').style.transform = 'scale(1.2)';
            setTimeout(() => {
                entry.target.querySelector('.timeline-marker').style.transform = 'scale(1)';
            }, 300);
        }
    });
}, { threshold: 0.5 });

timelineItems.forEach(item => {
    timelineObserver.observe(item);
});

// ===== Gallery Drag-to-Scroll =====
const gallery = document.getElementById('galleryScroll');
if (gallery) {
    let isDown = false;
    let startX;
    let scrollLeft;

    gallery.addEventListener('mousedown', (e) => {
        isDown = true;
        gallery.style.cursor = 'grabbing';
        startX = e.pageX - gallery.offsetLeft;
        scrollLeft = gallery.scrollLeft;
    });

    gallery.addEventListener('mouseleave', () => {
        isDown = false;
        gallery.style.cursor = 'grab';
    });

    gallery.addEventListener('mouseup', () => {
        isDown = false;
        gallery.style.cursor = 'grab';
    });

    gallery.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - gallery.offsetLeft;
        const walk = (x - startX) * 1.5;
        gallery.scrollLeft = scrollLeft - walk;
    });

    // Hide hint after first scroll
    const galleryHint = document.querySelector('.gallery-hint');
    if (galleryHint) {
        gallery.addEventListener('scroll', () => {
            if (gallery.scrollLeft > 50) {
                galleryHint.style.opacity = '0';
                galleryHint.style.transition = 'opacity 0.3s ease';
            } else {
                galleryHint.style.opacity = '1';
            }
        }, { passive: true });
    }
}

// ===== Add CSS for active nav link =====
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: var(--color-text);
    }
    .nav-link.active::after {
        width: 100%;
    }
`;
document.head.appendChild(style);
