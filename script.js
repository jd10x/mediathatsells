document.addEventListener('DOMContentLoaded', function() {
  // Sticky Navigation
  const stickyNav = document.getElementById('sticky-nav');
  const stickyCtaButton = document.getElementById('sticky-cta');
  const servicesSection = document.getElementById('services');
  const portfolioSection = document.getElementById('portfolio');
  const aboutSection = document.getElementById('about');
  const footer = document.querySelector('footer');
  const navLinks = document.querySelectorAll('.nav-link');
  const navIndicator = document.querySelector('.nav-indicator');
  
  // Set initial position for nav indicator
  function setNavIndicator(link) {
      const linkRect = link.getBoundingClientRect();
      navIndicator.style.width = `${linkRect.width}px`;
      navIndicator.style.left = `${linkRect.left - stickyNav.getBoundingClientRect().left}px`;
  }
  
  // Update active nav link and handle footer fade
  function updateActiveNavLink() {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const footerTop = footer.getBoundingClientRect().top;
      const documentHeight = document.documentElement.scrollHeight;
      
      // Show/hide sticky nav with footer fade effect
      if (scrollPosition > servicesSection.offsetTop - 100) {
          stickyNav.classList.add('visible');
          
          // Calculate when to start fading (when footer is within 300px of viewport bottom)
          if (footerTop < windowHeight + 300) {
              const fadeDistance = 300; // Distance over which to fade
              const opacity = Math.max(0, (footerTop - windowHeight) / fadeDistance);
              stickyNav.style.opacity = opacity;
          } else {
              stickyNav.style.opacity = '1';
          }
          
          // Hide completely if at very bottom
          if (scrollPosition + windowHeight >= documentHeight - 50) {
              stickyNav.style.opacity = '0';
          }
      } else {
          stickyNav.classList.remove('visible');
          stickyNav.style.opacity = '0';
      }
      
      // Show/hide sticky CTA button
      if (scrollPosition > portfolioSection.offsetTop - 100) {
          stickyCtaButton.classList.add('visible');
      } else {
          stickyCtaButton.classList.remove('visible');
      }
      
      // Update active nav link
      let activeLink = navLinks[0];
      
      if (scrollPosition >= aboutSection.offsetTop - 100) {
          activeLink = navLinks[2];
      } else if (scrollPosition >= portfolioSection.offsetTop - 100) {
          activeLink = navLinks[1];
      } else if (scrollPosition >= servicesSection.offsetTop - 100) {
          activeLink = navLinks[0];
      }
      
      navLinks.forEach(link => {
          link.classList.remove('active');
      });
      
      activeLink.classList.add('active');
      setNavIndicator(activeLink);
  }
  
  // Initialize nav indicator
  if (navLinks.length > 0) {
      setNavIndicator(navLinks[0]);
  }
  
  // Testimonial Carousel
  const testimonials = document.querySelectorAll('.testimonial');
  const dots = document.querySelectorAll('.dot');
  const prevButton = document.querySelector('.testimonial-prev');
  const nextButton = document.querySelector('.testimonial-next');
  let currentTestimonial = 0;
  
  function showTestimonial(index) {
      testimonials.forEach(testimonial => {
          testimonial.classList.remove('active');
      });
      
      dots.forEach(dot => {
          dot.classList.remove('active');
      });
      
      testimonials[index].classList.add('active');
      dots[index].classList.add('active');
      currentTestimonial = index;
  }
  
  if (prevButton && nextButton) {
      prevButton.addEventListener('click', () => {
          let index = currentTestimonial - 1;
          if (index < 0) {
              index = testimonials.length - 1;
          }
          showTestimonial(index);
      });
      
      nextButton.addEventListener('click', () => {
          let index = currentTestimonial + 1;
          if (index >= testimonials.length) {
              index = 0;
          }
          showTestimonial(index);
      });
  }
  
  dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
          showTestimonial(index);
      });
  });
  
  // Auto-rotate testimonials
  setInterval(() => {
      let index = currentTestimonial + 1;
      if (index >= testimonials.length) {
          index = 0;
      }
      showTestimonial(index);
  }, 8000);
  
  // FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
      const question = item.querySelector('.faq-question');
      
      question.addEventListener('click', () => {
          const isActive = item.classList.contains('active');
          
          // Close all FAQ items
          faqItems.forEach(faqItem => {
              faqItem.classList.remove('active');
          });
          
          // Open clicked item if it wasn't already open
          if (!isActive) {
              item.classList.add('active');
          }
      });
  });
  
  // Smooth scrolling for nav links
  navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
          e.preventDefault();
          
          const targetId = link.getAttribute('href');
          const targetSection = document.querySelector(targetId);
          
          window.scrollTo({
              top: targetSection.offsetTop - 100,
              behavior: 'smooth'
          });
      });
  });
  
  // CTA buttons
  const ctaButtons = document.querySelectorAll('.cta-button, .cta-button-small');
  
  ctaButtons.forEach(button => {
      button.addEventListener('click', () => {
          alert('Thank you for your interest! This would open a calendar booking page in a real implementation.');
      });
  });
  
  // Initialize
  updateActiveNavLink();
  
  // Event listeners
  window.addEventListener('scroll', updateActiveNavLink);
  window.addEventListener('resize', () => {
      const activeLink = document.querySelector('.nav-link.active');
      if (activeLink) {
          setNavIndicator(activeLink);
      }
  });
});