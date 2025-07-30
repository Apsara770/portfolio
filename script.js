// Function to handle CV download
function downloadCV() {
  const cvUrl = 'Sandamini_CV1.pdf'; // CV file in the same directory
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
  const navbar = document.querySelector('.navbar');
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  const sections = document.querySelectorAll('section');
  const navLi = document.querySelectorAll('nav .nav-links li a');
  const scrollToTopBtn = document.getElementById('scrollToTopBtn');
  const currentYearSpan = document.getElementById('current-year');

  // Hide preloader on page load
  window.addEventListener('load', () => {
    if (preloader) {
      preloader.classList.add('hidden');
      preloader.addEventListener('transitionend', () => {
        preloader.remove();
      });
    }
  });

  // Set current year if applicable
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }

  // Navbar mobile toggle
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('active');
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
      });
    });
  }

  // Smooth scroll for nav links
  document.querySelectorAll('nav .nav-links a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        const offsetTop = targetSection.offsetTop - navbar.offsetHeight;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });

  // Scroll animations and active link highlighting
  const checkScroll = () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    if (window.scrollY > 300) {
      scrollToTopBtn.classList.add('show');
    } else {
      scrollToTopBtn.classList.remove('show');
    }

    let currentSectionId = '';
    const scrollPosition = window.scrollY + navbar.offsetHeight + 150;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionBottom = sectionTop + section.offsetHeight;

      if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
        currentSectionId = '#' + section.getAttribute('id');

        if (!section.classList.contains('show-elements')) {
          section.classList.add('show-elements');

          if (section.id === 'skills') {
            section.querySelectorAll('.skill-category').forEach((card, index) => {
              card.style.animationDelay = `${index * 0.1}s`;
              card.style.animationName = 'fadeInUp';
              card.style.opacity = 1;
              card.style.transform = 'translateY(0)';
            });
          } else if (section.id === 'projects') {
            section.querySelectorAll('.project-card').forEach((card, index) => {
              card.style.animationDelay = `${index * 0.15}s`;
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
            const aboutParagraph = section.querySelector('#about p');
            if (aboutParagraph) {
              aboutParagraph.style.transitionDelay = '0.5s';
              aboutParagraph.style.opacity = '1';
              aboutParagraph.style.transform = 'translateY(0)';
            }
          }
        }
      }
    });

    navLi.forEach(a => {
      a.classList.remove('active');
      if (a.getAttribute('href') === currentSectionId) {
        a.classList.add('active');
      }
    });
  };

  window.addEventListener('scroll', checkScroll);
  checkScroll();

  if (scrollToTopBtn) {
    scrollToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
});
