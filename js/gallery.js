// Photo gallery data
const photos = [
  {
    url: 'gambar/1.jpg',
    caption: 'Birthday Memories 🎂'
  },
  {
    url: 'gambar/1.jpg',
    caption: 'Best Moments ✨'
  },
  {
    url: 'gambar/1.jpg',
    caption: 'Sweet Times 🎈'
  }
];

// Current state
let currentPhotoIndex = 0;
let isAnimating = false;

// DOM Elements
const photoCounter = document.getElementById('photo-counter');
const currentPhoto = document.getElementById('current-photo');
const polaroidCaption = document.getElementById('polaroid-caption');
const polaroid = document.getElementById('polaroid');
const dotsContainer = document.getElementById('navigation-dots');
let navigationDots = [];
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const backBtn = document.getElementById('back-btn');
const startBtn = document.getElementById('start-btn');
const viewBtn = document.getElementById('view-btn');
const dpadLeft = document.getElementById('dpad-left');
const dpadRight = document.getElementById('dpad-right');

function generateDots() {
  dotsContainer.innerHTML = '';
  navigationDots = [];

  photos.forEach((_, index) => {
    const dot = document.createElement('span');
    dot.className = 'dot'; // penting: cuma "dot"

    dot.addEventListener('click', () => goToPhoto(index));
    dot.addEventListener('touchend', (e) => {
      e.preventDefault();
      goToPhoto(index);
    });

    dotsContainer.appendChild(dot);
    navigationDots.push(dot);
  });
}

navigationDots.forEach((dot, index) => {
  dot.classList.toggle('active', index === currentPhotoIndex);
});


// Update photo display
function updatePhoto(direction = 'none') {
  if (isAnimating) return;
  
  const photo = photos[currentPhotoIndex];
  
  // Add animation class
  if (direction !== 'none') {
    isAnimating = true;
    polaroid.classList.add(direction === 'next' ? 'slide-left' : 'slide-right');
    
    setTimeout(() => {
      currentPhoto.src = photo.url;
      polaroidCaption.textContent = photo.caption;
      polaroid.classList.remove('slide-left', 'slide-right');
      isAnimating = false;
    }, 400);
  } else {
    currentPhoto.src = photo.url;
    polaroidCaption.textContent = photo.caption;
  }
  
  // Update counter
  photoCounter.textContent = `${currentPhotoIndex + 1}/${photos.length}`;
  
  // Update dots
  navigationDots.forEach((dot, index) => {
    if (index === currentPhotoIndex) {
      dot.classList.add('active');
    } else {
      dot.classList.remove('active');
    }
  });
  
  // Update button states
  prevBtn.disabled = currentPhotoIndex === 0;
  nextBtn.disabled = currentPhotoIndex === photos.length - 1;
}

// Previous photo
function prevPhoto() {
  if (currentPhotoIndex > 0 && !isAnimating) {
    currentPhotoIndex--;
    updatePhoto('prev');
  }
}

// Next photo
function nextPhoto() {
  if (currentPhotoIndex < photos.length - 1 && !isAnimating) {
    currentPhotoIndex++;
    updatePhoto('next');
  }
}

// Go to specific photo
function goToPhoto(index) {
  if (index !== currentPhotoIndex && !isAnimating) {
    const direction = index > currentPhotoIndex ? 'next' : 'prev';
    currentPhotoIndex = index;
    updatePhoto(direction);
  }
}

// Back to menu
function backToMenu() {
  document.body.style.transition = 'opacity 0.5s ease';
  document.body.style.opacity = '0';
  
  setTimeout(() => {
    window.location.href = 'menu.html';
  }, 500);
}

// View full (simulate zoom - visual effect only)
function viewFull() {
  if (isAnimating) return;
  
  polaroid.style.transform = 'rotate(0deg) scale(1.05)';
  setTimeout(() => {
    polaroid.style.transform = '';
  }, 300);
}

// Event Listeners
prevBtn.addEventListener('click', prevPhoto);
nextBtn.addEventListener('click', nextPhoto);
backBtn.addEventListener('click', backToMenu);
startBtn.addEventListener('click', backToMenu);
viewBtn.addEventListener('click', viewFull);

// Touch support
prevBtn.addEventListener('touchend', (e) => {
  e.preventDefault();
  prevPhoto();
});

nextBtn.addEventListener('touchend', (e) => {
  e.preventDefault();
  nextPhoto();
});

backBtn.addEventListener('touchend', (e) => {
  e.preventDefault();
  backToMenu();
});

startBtn.addEventListener('touchend', (e) => {
  e.preventDefault();
  backToMenu();
});

viewBtn.addEventListener('touchend', (e) => {
  e.preventDefault();
  viewFull();
});

// D-pad navigation
dpadLeft.addEventListener('click', prevPhoto);
dpadRight.addEventListener('click', nextPhoto);

dpadLeft.addEventListener('touchend', (e) => {
  e.preventDefault();
  prevPhoto();
});

dpadRight.addEventListener('touchend', (e) => {
  e.preventDefault();
  nextPhoto();
});

// Dot navigation
navigationDots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    goToPhoto(index);
  });
  
  dot.addEventListener('touchend', (e) => {
    e.preventDefault();
    goToPhoto(index);
  });
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
  if (isAnimating) return;
  
  switch(e.key) {
    case 'ArrowLeft':
      prevPhoto();
      break;
    case 'ArrowRight':
      nextPhoto();
      break;
    case 'Enter':
    case ' ':
      viewFull();
      break;
    case 'Escape':
    case 'Backspace':
      backToMenu();
      break;
  }
});

// Swipe support for mobile
let touchStartX = 0;
let touchEndX = 0;

polaroid.addEventListener('touchstart', (e) => {
  touchStartX = e.changedTouches[0].screenX;
}, { passive: true });

polaroid.addEventListener('touchend', (e) => {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipe();
}, { passive: true });

function handleSwipe() {
  const swipeThreshold = 50;
  const diff = touchStartX - touchEndX;
  
  if (Math.abs(diff) > swipeThreshold) {
    if (diff > 0) {
      // Swipe left - next photo
      nextPhoto();
    } else {
      // Swipe right - prev photo
      prevPhoto();
    }
  }
}

// Initialize
window.addEventListener('load', () => {
  // Fade in effect
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.5s ease';

  setTimeout(() => {
    document.body.style.opacity = '1';
  }, 100);

  // Generate dots sesuai jumlah foto
  generateDots();

  // Tampilkan foto pertama + aktifkan dot
  updatePhoto();
});


// Console log
console.log('📷 Photo Gallery Loaded');
console.log('Total photos:', photos.length);
console.log('Controls: ◀/▶ for prev/next, Dots for direct access');
console.log('A button: View (zoom effect)');
console.log('Swipe: Left/Right on polaroid');

console.log('Back: B button, START, ESC, or Backspace');
