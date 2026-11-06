// Navigation menu
const menu = document.getElementById('menu');
const menuOpen = document.getElementById('menuOpen');
const menuClose = document.getElementById('menuClose');

function openMenu() {
  menu.classList.add('open');
  menu.setAttribute('aria-hidden', 'false');
  menuOpen.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';
}

function closeMenu() {
  menu.classList.remove('open');
  menu.setAttribute('aria-hidden', 'true');
  menuOpen.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}

menuOpen?.addEventListener('click', openMenu);
menuClose?.addEventListener('click', closeMenu);

menu?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', closeMenu);
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeMenu();
});

// Location reveal
const locationToggle = document.getElementById('locToggle');
const locationText = document.querySelector('.loc');

locationToggle?.addEventListener('click', () => {
  const expanded = locationToggle.getAttribute('aria-expanded') === 'false';
  locationToggle.setAttribute('aria-expanded', String(!expanded));
  locationText?.classList.toggle('show', !expanded);
});

// Skills accordion: one category open at a time
document.querySelectorAll('.acc-btn').forEach((button) => {
  button.setAttribute('aria-expanded', button.closest('.acc-item').classList.contains('open'));

  button.addEventListener('click', () => {
    const currentItem = button.closest('.acc-item');
    const wasOpen = currentItem.classList.contains('open');

    document.querySelectorAll('.acc-item').forEach((item) => {
      item.classList.remove('open');
      item.querySelector('.acc-btn')?.setAttribute('aria-expanded', 'false');
    });

    if (!wasOpen) {
      currentItem.classList.add('open');
      button.setAttribute('aria-expanded', 'true');
    }
  });
});

// Work slider
const slides = Array.from(document.querySelectorAll('.slide'));
const dots = Array.from(document.querySelectorAll('#dots button'));
let activeSlide = 0;

function showSlide(index) {
  if (!slides.length) return;
  activeSlide = (index + slides.length) % slides.length;

  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === activeSlide);
    slide.setAttribute('aria-hidden', String(i !== activeSlide));
  });

  dots.forEach((dot, i) => {
    dot.classList.toggle('on', i === activeSlide);
    dot.setAttribute('aria-current', i === activeSlide ? 'true' : 'false');
  });
}

dots.forEach((dot, index) => {
  dot.addEventListener('click', () => showSlide(index));
});
showSlide(0);

// Simple front-end form feedback (connect this to an email service/backend to receive messages)
const ideaForm = document.getElementById('ideaForm');
const thanks = document.getElementById('thanks');

ideaForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!ideaForm.reportValidity()) return;
  thanks.hidden = false;
  ideaForm.reset();
});
