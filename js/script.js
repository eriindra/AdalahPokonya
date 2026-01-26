// Debug: Check if script loads
console.log('🎮 Script loaded!');

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
document.addEventListener('DOMContentLoaded', function () {
  console.log('✅ DOM loaded');

  const screen = document.querySelector('.screen');
  const screenTitle = screen?.querySelector('h1');
  const screenSubtitle = screen?.querySelector('p');
  const menuButtons = document.querySelectorAll('.btn');
  const startButton = document.getElementById('start-btn');
  const selectButton = document.getElementById('select-btn');
  const allButtons = document.querySelectorAll('.btn, .dpad-btn, .ab-btn, .control-btn');

  console.log('📱 Menu buttons found:', menuButtons.length);

  // Update screen content
  function updateScreen(screenName) {
    const content = screens[screenName];
    if (!content) return;

    currentScreen = screenName;

    if (screenTitle && screenSubtitle) {
      screenTitle.innerHTML = content.title;
      screenSubtitle.textContent = content.subtitle;

      screenTitle.style.color = content.color;
      screenTitle.style.textShadow = `
        0 0 10px ${content.color},
        0 0 20px ${content.color}
      `;

      screenSubtitle.style.color = content.subtitleColor;

      screen.style.opacity = '0.7';
      setTimeout(() => screen.style.opacity = '1', 100);
    }
  }

  // Click effect
  function addClickEffect(button) {
    button.style.transform = 'scale(0.95)';
    setTimeout(() => button.style.transform = '', 100);
  }

  // ===============================
  // 🔥 MENU BUTTON HANDLER (FIXED)
  // ===============================
  menuButtons.forEach(btn => {
    btn.addEventListener('click', function () {
      const screenName = this.getAttribute('data-screen');

      updateScreen(screenName);
      addClickEffect(this);

      // ✅ PERBAIKAN 1:
      // animasi tetap ada
      document.body.style.transition = 'opacity 0.3s ease';
      document.body.style.opacity = '0';

      // ✅ PERBAIKAN 2:
      // redirect DIPERCEPAT (≤ 200ms)
      // supaya HP menganggap ini masih user gesture
      setTimeout(() => {
        switch (screenName) {
          case 'message':
            window.location.href = 'message.html';
            break;
          case 'gallery':
            window.location.href = 'gallery.html';
            break;
          case 'music':
            window.location.href = 'music.html';
            break;
          case 'tetris':
            window.location.href = 'tetris.html';
            break;
        }
      }, 200); // ⬅️ INI KUNCI UTAMANYA
    });
  });

  // START button
  startButton?.addEventListener('click', function () {
    updateScreen('home');
    addClickEffect(this);
  });

  // SELECT button
  selectButton?.addEventListener('click', function () {
    const menuOrder = ['home', 'message', 'gallery', 'music', 'tetris'];
    const next = (menuOrder.indexOf(currentScreen) + 1) % menuOrder.length;
    updateScreen(menuOrder[next]);
    addClickEffect(this);
  });

  // Global click effect
  allButtons.forEach(btn => {
    btn.addEventListener('click', () => addClickEffect(btn));
  });

  // Keyboard
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') startButton?.click();
    if (e.key === ' ') selectButton?.click();
    if (e.key === 'Escape' && currentScreen !== 'home') updateScreen('home');
  });

  console.log('✨ HEYTML-BOY Console Ready!');
});
