// 모바일 메뉴
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});

function closeMenu() {
  mobileMenu.classList.remove('open');
}

// 스크롤 시 헤더 그림자
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 20);
});

// 부드러운 스크롤 (앵커 클릭)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = 80;
    window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
  });
});

// 스크롤 진입 시 카드 애니메이션
const observer = new IntersectionObserver(
  entries => entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.opacity = '1';
      e.target.style.transform = 'translateY(0)';
    }
  }),
  { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
);

document.querySelectorAll(
  '.service-card, .about-card, .target-card, .contact-item'
).forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});

// 갤러리 탭 전환
function switchTab(tabId, btn) {
  document.querySelectorAll('.gallery-grid').forEach(g => g.classList.add('hidden'));
  document.querySelectorAll('.gtab').forEach(b => b.classList.remove('active'));
  document.getElementById(tabId).classList.remove('hidden');
  btn.classList.add('active');
}

// 라이트박스
const photos = [
  'images/KakaoTalk_20260502_085106643.jpg',
  'images/KakaoTalk_20260502_085134973.jpg',
  'images/KakaoTalk_20260502_085212897.jpg',
  'images/KakaoTalk_20260502_085242945.jpg',
  'images/2.jpg',
  'images/3.jpg',
];
let currentPhoto = 0;

function openLightbox(src, idx) {
  currentPhoto = idx - 1;
  document.getElementById('lbImg').src = src;
  document.getElementById('lightbox').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
  document.body.style.overflow = '';
}
function moveLightbox(dir) {
  currentPhoto = (currentPhoto + dir + photos.length) % photos.length;
  document.getElementById('lbImg').src = photos[currentPhoto];
}

document.addEventListener('keydown', e => {
  const lb = document.getElementById('lightbox');
  if (!lb.classList.contains('open')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft')  moveLightbox(-1);
  if (e.key === 'ArrowRight') moveLightbox(1);
});

// 문의 폼 제출
function submitForm(e) {
  e.preventDefault();
  const note = document.getElementById('formNote');
  note.textContent = '✅ 문의가 접수되었습니다. 빠른 시일 내에 연락드리겠습니다!';
  note.style.color = '#10b981';
  e.target.reset();
  setTimeout(() => { note.textContent = ''; }, 5000);
}
