// Debug: Check if script loads
console.log('🎮 Script loaded!');

// GLOBAL testClick function - MUST be defined before HTML loads
window.testClick = function(screenName) {
  console.log('🎯 testClick called! Screen:', screenName);
  console.log('📍 Device:', /Android|iPhone|iPad|iPod/i.test(navigator.userAgent) ? 'Mobile' : 'Desktop');
  
  // Fade out
  document.body.style.transition = 'opacity 0.5s ease';
  document.body.style.opacity = '0';
  
  // Navigate after fade
  setTimeout(function() {
    console.log('🚀 Redirecting now to:', screenName + '.html');
    window.location.href = screenName + '.html';
  }, 500);
};

// Current screen state
let currentScreen = 'home';

// Screen content configuration
const screens = {
  home: {
    title: 'Happy<br>Birthday!',
    subtitle: 'Press Start Button',
    color: '#4eff7a',
    subtitleColor: '#ffd700'
  },
  message: {
    title: 'MESSAGE',
    subtitle: 'Loading messages...',
    color: '#5a9eff',
    subtitleColor: '#5a9eff'
  },
  gallery: {
    title: 'GALLERY',
    subtitle: 'Photo memories',
    color: '#ff5a5a',
    subtitleColor: '#ff5a5a'
  },
  music: {
    title: 'MUSIC',
    subtitle: 'Loading song...',
    color: '#bd6fff',
    subtitleColor: '#bd6fff'
  },
  tetris: {
    title: 'TETRIS',
    subtitle: 'Press START',
    color: '#3edd6a',
    subtitleColor: '#3edd6a'
  }
};

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
  console.log('✅ DOM loaded');

  // Get DOM elements
  const screen = document.querySelector('.screen');
  const screenTitle = screen ? screen.querySelector('h1') : null;
  const screenSubtitle = screen ? screen.querySelector('p') : null;
  const menuButtons = document.querySelectorAll('.btn');
  const startButton = document.getElementById('start-btn');
  const selectButton = document.getElementById('select-btn');
  const allButtons = document.querySelectorAll('.btn, .dpad-btn, .ab-btn, .control-btn');

  console.log('📱 Menu buttons found:', menuButtons.length);
  console.log('🔍 Device type:', /Android|iPhone|iPad|iPod/i.test(navigator.userAgent) ? 'MOBILE' : 'DESKTOP');

  // Update screen content
  function updateScreen(screenName) {
    const content = screens[screenName];
    
    if (!content) return;
    
    currentScreen = screenName;
    
    console.log('🖥️ Updating screen to:', screenName);
    
    // Update content
    if (screenTitle && screenSubtitle) {
      screenTitle.innerHTML = content.title;
      screenSubtitle.textContent = content.subtitle;
      
      // Update colors with smooth transition
      screenTitle.style.color = content.color;
      screenTitle.style.textShadow = `
        0 0 10px ${content.color},
        0 0 20px ${content.color},
        0 0 30px ${content.color}80
      `;
      
      screenSubtitle.style.color = content.subtitleColor;
      screenSubtitle.style.textShadow = `
        0 0 8px ${content.subtitleColor},
        0 0 16px ${content.subtitleColor}80
      `;
      
      // Add screen flash effect
      screen.style.opacity = '0.7';
      setTimeout(() => {
        screen.style.opacity = '1';
      }, 100);
    }
  }

  // Add click effect to buttons
  function addClickEffect(button) {
    button.style.transform = 'scale(0.95)';
    setTimeout(() => {
      button.style.transform = '';
    }, 100);
  }

  // Add MULTIPLE event listeners for maximum compatibility
  menuButtons.forEach((btn, index) => {
    const screenName = btn.getAttribute('data-screen');
    console.log(`🔘 Setup button ${index}: ${btn.textContent.trim()} → ${screenName}`);
    
    // Method 1: Click event (desktop + some mobile)
    btn.addEventListener('click', function(e) {
      console.log('🖱️ CLICK event fired on:', screenName);
      // onclick will handle navigation, just add visual feedback
      addClickEffect(this);
    }, { passive: false });
    
    // Method 2: Touchstart (immediate feedback)
    btn.addEventListener('touchstart', function(e) {
      console.log('👆 TOUCHSTART on:', screenName);
      addClickEffect(this);
    }, { passive: true });
    
    // Method 3: Touchend (backup navigation)
    btn.addEventListener('touchend', function(e) {
      console.log('👆 TOUCHEND on:', screenName);
      e.preventDefault();
      e.stopPropagation();
      
      // Call testClick as backup if onclick doesn't fire
      setTimeout(function() {
        console.log('⏰ Backup navigation triggered');
        window.testClick(screenName);
      }, 100);
    }, { passive: false });
    
    // Method 4: Pointer events (modern browsers)
    if ('PointerEvent' in window) {
      btn.addEventListener('pointerdown', function(e) {
        console.log('🖊️ POINTER event on:', screenName);
        addClickEffect(this);
      }, { passive: true });
    }
  });

  // START button - return to home
  if (startButton) {
    startButton.addEventListener('click', function() {
      updateScreen('home');
      addClickEffect(this);
    });
    
    startButton.addEventListener('touchend', function(e) {
      e.preventDefault();
      updateScreen('home');
      addClickEffect(this);
    });
  }

  // SELECT button - cycle through menus
  if (selectButton) {
    selectButton.addEventListener('click', function() {
      const menuOrder = ['home', 'message', 'gallery', 'music', 'tetris'];
      const currentIndex = menuOrder.indexOf(currentScreen);
      const nextIndex = (currentIndex + 1) % menuOrder.length;
      updateScreen(menuOrder[nextIndex]);
      addClickEffect(this);
    });
    
    selectButton.addEventListener('touchend', function(e) {
      e.preventDefault();
      const menuOrder = ['home', 'message', 'gallery', 'music', 'tetris'];
      const currentIndex = menuOrder.indexOf(currentScreen);
      const nextIndex = (currentIndex + 1) % menuOrder.length;
      updateScreen(menuOrder[nextIndex]);
      addClickEffect(this);
    });
  }

  // Add hover effect for menu buttons (desktop only)
  menuButtons.forEach(btn => {
    btn.addEventListener('mouseenter', function() {
      this.style.filter = 'brightness(1.1)';
    });
    
    btn.addEventListener('mouseleave', function() {
      this.style.filter = '';
    });
  });

  // D-pad navigation
  const dpadButtons = document.querySelectorAll('.dpad-btn');
  dpadButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      console.log('D-pad button clicked:', this.className);
    });
    
    btn.addEventListener('touchend', function(e) {
      e.preventDefault();
      console.log('D-pad button touched:', this.className);
    });
  });

  // A and B button handlers
  const aButton = document.querySelector('.a-btn');
  const bButton = document.querySelector('.b-btn');

  if (aButton) {
    aButton.addEventListener('click', function() {
      console.log('A button pressed');
    });
    
    aButton.addEventListener('touchend', function(e) {
      e.preventDefault();
      console.log('A button touched');
    });
  }

  if (bButton) {
    bButton.addEventListener('click', function() {
      console.log('B button pressed - Go back');
      if (currentScreen !== 'home') {
        updateScreen('home');
      }
    });
    
    bButton.addEventListener('touchend', function(e) {
      e.preventDefault();
      console.log('B button touched - Go back');
      if (currentScreen !== 'home') {
        updateScreen('home');
      }
    });
  }

  // Keyboard controls
  document.addEventListener('keydown', function(e) {
    switch(e.key) {
      case 'Enter':
        if (startButton) startButton.click();
        break;
      case ' ':
        if (selectButton) selectButton.click();
        break;
      case 'Escape':
        if (currentScreen !== 'home') {
          updateScreen('home');
        }
        break;
      case 'ArrowUp':
      case 'ArrowDown':
      case 'ArrowLeft':
      case 'ArrowRight':
        console.log('Arrow key pressed:', e.key);
        break;
    }
  });

  // Initialize
  console.log('✨ ERIINDRAA Console Ready!');
  console.log('📍 Current screen:', currentScreen);
  console.log('🎮 testClick function:', typeof window.testClick);
  
  // Test button accessibility
  menuButtons.forEach((btn, i) => {
    const rect = btn.getBoundingClientRect();
    console.log(`Button ${i} bounds:`, {
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height,
      visible: rect.width > 0 && rect.height > 0
    });
  });

});
