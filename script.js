// Function to handle CV download
function downloadCV() {
    const cvUrl = 'Sandamini_CV1.pdf'; // Ensure CV file is named 'Sandamini_CV1.pdf' in the same directory!
    const a = document.createElement('a');
    a.href = cvUrl;
    a.download = 'Sandamini_CV1.pdf';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    alert('Your CV download should begin shortly!');
}

document.addEventListener('DOMContentLoaded', () => {
    const preloader = document.getElementById('preloader');
    const currentYearSpan = document.getElementById('current-year');
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const sections = document.querySelectorAll('section');
    const navLi = document.querySelectorAll('nav .nav-links li a');
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');
    const heroContent = document.querySelector('.hero-content');
    const profilePhoto = document.querySelector('.profile-photo');
    const aboutParagraph = document.querySelector('#about p');
    const contactForm = document.getElementById('contact-form');

    // --- Preloader Logic ---
    window.addEventListener('load', () => {
        if (preloader) {
            preloader.classList.add('hidden');
            preloader.addEventListener('transitionend', () => {
                preloader.remove();
                // After preloader is gone, trigger hero content animation
                if (heroContent) {
                    heroContent.classList.add('show-elements');
                }
            });
        } else {
            // Fallback if preloader doesn't exist (e.g., for local testing without full reload)
            if (heroContent) {
                heroContent.classList.add('show-elements');
            }
        }
    });

    // --- Initial Setup and Event Listeners ---

    // Set current year in footer
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // Navbar functionality for mobile
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close navbar when a link is clicked (for mobile)
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('nav .nav-links a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const offsetTop = targetSection.offsetTop - (navbar ? navbar.offsetHeight : 0);
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Scroll-based UI Updates ---

    const handleScrollUI = () => {
        // Navbar background change on scroll
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Scroll to Top Button visibility
        if (window.scrollY > 400) { // Show button after scrolling more pixels
            scrollToTopBtn.classList.add('show');
        } else {
            scrollToTopBtn.classList.remove('show');
        }
    };

    window.addEventListener('scroll', handleScrollUI);
    handleScrollUI(); // Initial check on page load

    // Scroll to Top Button functionality
    if (scrollToTopBtn) {
        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // --- Intersection Observer for Animations ---
    const observerOptions = {
        root: null, // relative to the viewport
        rootMargin: '0px',
        threshold: 0.2 // Trigger when 20% of the element is visible
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const section = entry.target;
                section.classList.add('show-elements');

                // Staggered animations for specific sections
                if (section.id === 'skills') {
                    section.querySelectorAll('.skill-category').forEach((card, index) => {
                        card.style.animation = `fadeInUp 0.8s cubic-bezier(0.25, 0.8, 0.25, 1) ${index * 0.15 + 0.2}s forwards`;
                    });
                } else if (section.id === 'projects') {
                    section.querySelectorAll('.project-card').forEach((card, index) => {
                        card.style.animation = `fadeInUp 0.8s cubic-bezier(0.25, 0.8, 0.25, 1) ${index * 0.2 + 0.2}s forwards`;
                    });
                } else if (section.id === 'about') {
                    if (profilePhoto) {
                        profilePhoto.style.animation = `zoomIn 1s cubic-bezier(0.68, -0.55, 0.27, 1.55) 0.3s forwards`;
                    }
                    if (aboutParagraph) {
                        aboutParagraph.style.animation = `fadeInUp 1s ease-out 0.7s forwards`;
                    }
                } else if (section.id === 'contact') {
                    if (contactForm) {
                        contactForm.style.animation = `fadeInUp 1s ease-out 0.3s forwards`;
                    }
                }
                observer.unobserve(section); // Stop observing once animated
            }
        });
    }, observerOptions);

    // Observe all sections for animation
    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // --- Active Nav Link Highlight ---
    const updateActiveNavLink = () => {
        let currentSectionId = '';
        const scrollPosition = window.scrollY + (navbar ? navbar.offsetHeight : 0) + 50; // Add buffer

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSectionId = '#' + section.getAttribute('id');
            }
        });

        navLi.forEach(a => {
            a.classList.remove('active');
            if (a.getAttribute('href') === currentSectionId) {
                a.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', updateActiveNavLink);
    updateActiveNavLink(); // Initial check on load
});
