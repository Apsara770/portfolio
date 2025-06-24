// Function to handle CV download
function downloadCV() {
  const cvUrl = 'Sandamini_CV1.pdf'; //  CV file is named 'Sandamini_CV1.pdf' in the same directory!
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
  const contactForm = document.getElementById('contact-form');
  const currentYearSpan = document.getElementById('current-year');
  const navbar = document.querySelector('.navbar');
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  const sections = document.querySelectorAll('section');
  const navLi = document.querySelectorAll('nav .nav-links li a');
  const scrollToTopBtn = document.getElementById('scrollToTopBtn');

  // --- Preloader Logic ---
  // Hide preloader once the page content is fully loaded
  window.addEventListener('load', () => {
    if (preloader) {
      preloader.classList.add('hidden');
      // Ensure smooth transition and then remove from DOM after fading out
      preloader.addEventListener('transitionend', () => {
        preloader.remove();
      });
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
        // Calculate scroll position, accounting for fixed navbar height
        const offsetTop = targetSection.offsetTop - navbar.offsetHeight;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });

  // --- Scroll-based Animations and UI Updates ---

  const checkScroll = () => {
    // Navbar background change on scroll
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Scroll to Top Button visibility
    if (window.scrollY > 300) { // Show button after scrolling 300px
      scrollToTopBtn.classList.add('show');
    } else {
      scrollToTopBtn.classList.remove('show');
    }

    // Highlight active nav link on scroll & trigger section animations
    let currentSectionId = '';
    const scrollPosition = window.scrollY + navbar.offsetHeight + 150; // Adjusted offset for section entry

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionBottom = sectionTop + section.offsetHeight;

      // Check if section is in viewport
      if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
        currentSectionId = '#' + section.getAttribute('id');
        // Add a class to trigger CSS animations for the section
        if (!section.classList.contains('show-elements')) {
          section.classList.add('show-elements');
          // Staggered animations for cards/elements within sections
          if (section.id === 'skills') {
            section.querySelectorAll('.skill-category').forEach((card, index) => {
              card.style.animationDelay = `${index * 0.1}s`; // Faster stagger
              card.style.animationName = 'fadeInUp';
              card.style.opacity = 1;
              card.style.transform = 'translateY(0)';
            });
          } else if (section.id === 'projects') {
            section.querySelectorAll('.project-card').forEach((card, index) => {
              card.style.animationDelay = `${index * 0.15}s`; // Faster stagger
              card.style.animationName = 'fadeInUp';
              card.style.opacity = 1;
              card.style.transform = 'translateY(0)';
            });
          } else if (section.id === 'contact') {
            const formElements = section.querySelector('#contact-form');
            if (formElements) {
              formElements.style.animationDelay = '0.3s';
              formElements.style.animationName = 'fadeInUp';
              formElements.style.opacity = 1;
              formElements.style.transform = 'translateY(0)';
            }
          } else if (section.id === 'about') {
             // For the About section's paragraph
            const aboutParagraph = section.querySelector('#about p');
            if (aboutParagraph) {
                aboutParagraph.style.transitionDelay = '0.5s'; // Delay the paragraph fade-in
                aboutParagraph.style.opacity = '1';
                aboutParagraph.style.transform = 'translateY(0)';
            }
          }
        }
      }
    });

    // Update active class for nav links
    navLi.forEach(a => {
      a.classList.remove('active');
      if (a.getAttribute('href') === currentSectionId) {
        a.classList.add('active');
      }
    });
  };

  // Run on scroll and on load
  window.addEventListener('scroll', checkScroll);
  checkScroll(); // Initial check on page load

  // Scroll to Top Button functionality
  if (scrollToTopBtn) {
    scrollToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

 
});
