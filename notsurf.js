
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
      
      // Remove active class from all buttons and sections
      navButtons.forEach(btn => btn.classList.remove('active'));
      Object.values(sections).forEach(section => section.classList.remove('active'));
      
      // Add active class to clicked button and corresponding section
      this.classList.add('active');
      
      if (sections[targetSection]) {
        sections[targetSection].classList.add('active');
        
        // Add animation effect
        sections[targetSection].style.animation = 'none';
        setTimeout(() => {
          sections[targetSection].style.animation = 'fadeIn 0.3s ease-in-out';
        }, 10);
      }
      
      // Log navigation for demonstration
      console.log(`Navigated to ${targetSection} section`);
    });
  });
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

// Header scroll effect (keeping original functionality)
let lastScrollTop = 0;
const header = document.querySelector('.header');
const offSet = 56;

window.addEventListener('scroll', function() {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  
  if (header) {
    if (scrollTop > lastScrollTop && scrollTop > offSet) {
      // Scrolling down
      header.style.transform = 'translateY(-100%)';
    } else {
      // Scrolling up or at top
      header.style.transform = 'translateY(0)';
    }
  }
  
  lastScrollTop = scrollTop;
});

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
