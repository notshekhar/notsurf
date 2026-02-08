
// Service Worker Registration
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/pwabuilder-sw.js').then(function(registration) {
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, function(err) {
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}

// Navigation and Sprite Demo Functionality
document.addEventListener('DOMContentLoaded', function() {
  // Initialize navigation
  initializeNavigation();
  
  // Initialize sprite demonstrations
  initializeSpriteDemos();
  
  // Initialize interactive elements
  initializeInteractions();
});

function initializeNavigation() {
  const navButtons = document.querySelectorAll('.nav-btn');
  const sections = {
    'home': document.querySelector('.conthome'),
    'search': document.querySelector('.contsearch'),
    'menu': document.querySelector('.contmenu')
  };

  navButtons.forEach(button => {
    button.addEventListener('click', function() {
      const targetSection = this.getAttribute('data-section');
      
      // Remove active class and aria-current from all buttons and sections
      navButtons.forEach(btn => {
        btn.classList.remove('active');
        btn.removeAttribute('aria-current');
      });
      Object.values(sections).forEach(section => {
        if (section) section.classList.remove('active');
      });
      
      // Add active class and aria-current to clicked button and corresponding section
      this.classList.add('active');
      this.setAttribute('aria-current', 'page');
      
      if (sections[targetSection]) {
        sections[targetSection].classList.add('active');
        
        // Add animation effect
        sections[targetSection].style.animation = 'none';
        setTimeout(() => {
          sections[targetSection].style.animation = 'fadeIn 0.3s ease-in-out';
        }, 10);
      }
    });
  });
}

// Announce content changes to screen readers
function announceToScreenReader(message) {
  const announcement = document.createElement('div');
  announcement.setAttribute('role', 'status');
  announcement.setAttribute('aria-live', 'polite');
  announcement.className = 'sr-only';
  announcement.textContent = message;
  document.body.appendChild(announcement);
  
  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 1000);
}

function initializeSpriteDemos() {
  // Add hover effects to sprite icons
  const iconItems = document.querySelectorAll('.icon-item, .menu-item');
  
  iconItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
      const icon = this.querySelector('.icon-preview, .menu-icon');
      if (icon) {
        icon.style.transform = 'scale(1.1)';
      }
    });
    
    item.addEventListener('mouseleave', function() {
      const icon = this.querySelector('.icon-preview, .menu-icon');
      if (icon) {
        icon.style.transform = 'scale(1)';
      }
    });
  });

  // Add click feedback
  const clickableElements = document.querySelectorAll('.menu-item, .state-item');
  clickableElements.forEach(element => {
    element.addEventListener('click', function() {
      this.style.animation = 'none';
      setTimeout(() => {
        this.style.animation = 'pulse 0.3s ease';
      }, 10);
    });
  });
}

function initializeInteractions() {
  // Sprite sheet hover effect
  const spriteSheet = document.querySelector('.sprite-sheet');
  const spriteContainer = document.querySelector('.sprite-container');
  
  if (spriteSheet && spriteContainer) {
    spriteContainer.addEventListener('mouseenter', function() {
      spriteSheet.style.filter = 'brightness(1.1)';
    });
    
    spriteContainer.addEventListener('mouseleave', function() {
      spriteSheet.style.filter = 'brightness(1)';
    });
  }

  // Add smooth scroll behavior
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
}

// Throttle function for performance
function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  }
}

// Header and footer scroll effect with consistent behavior
let lastScrollTop = 0;
const header = document.querySelector('.header');
const footer = document.querySelector('.footer');
const offSet = 56;

// Check for reduced motion preference
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const handleScroll = function() {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  
  // Update content padding dynamically
  updateContentPadding();
  
  if (header && footer) {
    if (scrollTop > lastScrollTop && scrollTop > offSet) {
      // Scrolling down - hide both for consistent experience
      header.style.transform = prefersReducedMotion ? 'translateY(-100%)' : 'translateY(-100%)';
      footer.style.transform = prefersReducedMotion ? 'translateY(100%)' : 'translateY(100%)';
    } else {
      // Scrolling up or at top - show both
      header.style.transform = 'translateY(0)';
      footer.style.transform = 'translateY(0)';
    }
  }
  
  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
};

// Throttled scroll event listener
window.addEventListener('scroll', throttle(handleScroll, 100));

// Update content padding based on current element heights
function updateContentPadding() {
  const content = document.querySelector('.content');
  if (!content) return;
  
  const headerHeight = header ? header.offsetHeight : 56;
  const footerHeight = footer ? footer.offsetHeight : 56;
  
  content.style.paddingTop = `${headerHeight}px`;
  content.style.paddingBottom = `${footerHeight}px`;
  content.style.minHeight = `calc(100vh - ${headerHeight + footerHeight}px)`;
}

// Add pulse animation dynamically
const style = document.createElement('style');
style.textContent = `
  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(0.95); }
    100% { transform: scale(1); }
  }
  
  .icon-preview, .menu-icon {
    transition: transform 0.2s ease;
  }
  
  .sprite-sheet {
    transition: filter 0.2s ease;
  }
`;
document.head.appendChild(style);

// Console messages for sprite demo debugging
console.log('CSS Sprite Demo - notSurf');
console.log('Sprite sheet: statics/icons.png (494 x 437 pixels)');
console.log('Navigation icons use background-position to display different parts of the sprite');
