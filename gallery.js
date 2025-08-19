// Step 5: Dynamic Image Loading
const images = [
  { src: 'assets/pic1.webp', alt: 'Photo 1' },
  { src: 'assets/pic2.webp', alt: 'Photo 2' },
  { src: 'assets/pic3.webp', alt: 'Photo 3' }
  // Add more images here
];

const grid = document.getElementById('grid');
grid.innerHTML = images.map(img =>
  `<a href="${img.src}"><img src="${img.src}" alt="${img.alt}" loading="lazy"></a>`
).join('');

const links = Array.from(document.querySelectorAll('#grid a'));
const lightbox = document.getElementById('lightbox');
const full = document.getElementById('full');
const closeBtn = document.getElementById('close');
const prev = document.getElementById('prev');
const next = document.getElementById('next');
let idx = -1;

// Placeholder image (use your own path if you have a placeholder asset)
const placeholder = 'https://via.placeholder.com/600x400?text=Image+not+found';

// Add error handler to grid images
document.querySelectorAll('#grid img').forEach(img => {
  img.onerror = function() {
    this.onerror = null;
    this.src = placeholder;
    this.alt = 'Image not found';
  };
});

// Add error handler to lightbox image
full.onerror = function() {
  this.onerror = null;
  this.src = placeholder;
  this.alt = 'Image not found';
};

function open(i){
  idx = i;
  full.src = links[idx].href;
  lightbox.hidden = false;
    lightbox.focus(); // Focus the lightbox container for accessibility
}
function move(d){
  idx = (idx + d + links.length) % links.length;
  full.src = links[idx].href;
}
links.forEach((a,i)=>a.addEventListener('click', (e)=>{ e.preventDefault(); open(i); }));
closeBtn.addEventListener('click', ()=> lightbox.hidden = true);
prev.addEventListener('click', ()=> move(-1));
next.addEventListener('click', ()=> move(1));
window.addEventListener('keydown', (e)=>{
  if(lightbox.hidden) return;
  if(e.key==='Escape') lightbox.hidden = true;
  if(e.key==='ArrowLeft') move(-1);
  if(e.key==='ArrowRight') move(1);
});

// Focus trap for lightbox
lightbox.addEventListener('keydown', function(e) {
  if (lightbox.hidden) return;
  const focusable = [closeBtn, prev, next];
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  if (e.key === 'Tab') {
    if (e.shiftKey) {
      if (document.activeElement === first) {
        e.preventDefault();
        last.focus();
      }
    } else {
      if (document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  }
});

// Swipe gesture support for mobile
let startX = 0;
full.addEventListener('touchstart', function(e) {
  if (e.touches.length === 1) {
    startX = e.touches[0].clientX;
  }
});
full.addEventListener('touchend', function(e) {
  if (e.changedTouches.length === 1) {
    let endX = e.changedTouches[0].clientX;
    let diff = endX - startX;
    if (Math.abs(diff) > 50) { // swipe threshold
      if (diff > 0) {
        // Swipe right: previous image
        move(-1);
      } else {
        // Swipe left: next image
        move(1);
      }
    }
  }
});
