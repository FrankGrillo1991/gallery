const links = Array.from(document.querySelectorAll('#grid a'));
const lightbox = document.getElementById('lightbox');
const full = document.getElementById('full');
const closeBtn = document.getElementById('close');
const prev = document.getElementById('prev');
const next = document.getElementById('next');
let idx = -1;

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
