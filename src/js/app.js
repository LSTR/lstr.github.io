document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a, .btn-glow').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId && targetId.startsWith('#')) {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const headerOffset = 80;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Apply animation tracking to layout blocks
    // Including the new timeline elements
    const animateElements = document.querySelectorAll('.bento-item, .project-card, .section-header, .animate-elem');
    
    // Apply default pre-animation styles dynamically so it degrades gracefully without JS
    animateElements.forEach(el => {
        const delay = el.dataset.delay || '0s';
        el.style.opacity = '0';
        el.style.transform = 'translateY(15px)';
        el.style.transition = `opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1) ${delay}, transform 0.9s cubic-bezier(0.16, 1, 0.3, 1) ${delay}`;
        
        // Remove animation-specific transition after it finishes so hover states (like our 3D tilt) work perfectly
        el.addEventListener('transitionend', function(e) {
            if(e.propertyName === 'opacity' && el.classList.contains('visible')) {
                el.style.transition = ''; 
                el.classList.remove('visible'); // we don't need !important anymore once it's loaded
                el.style.opacity = '1';
                el.style.transform = 'none'; // Clear transform so hover works
            }
        });
        
        observer.observe(el);
    });

    // Dynamic style for .visible class
    const style = document.createElement('style');
    style.innerHTML = `
        .visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);

    // Navigation active state highlight on scroll
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('#desktop-nav a');
    
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // --- Dynamic Typing Effect ---
    const dynamicText = document.getElementById('dynamic-text');
    const phrases = [
        'Mobile Experiences.',
        'Android Applications.',
        'iOS Solutions.',
        'Kotlin Ecosystems.',
        'SwiftUI Interfaces.'
    ];
    let phraseIndex = 0;
    let charIndex = phrases[0].length;
    let isDeleting = false;
    let typeSpeed = 100;

    function type() {
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            dynamicText.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50;
        } else {
            dynamicText.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 100;
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            isDeleting = true;
            typeSpeed = 2000; // Pause at end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typeSpeed = 500; // Small pause before next
        }

        setTimeout(type, typeSpeed);
    }

    // Start typing effect after a small delay
    setTimeout(type, 1000);
});
