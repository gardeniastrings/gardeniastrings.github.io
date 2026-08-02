const header = document.querySelector('.site-header');
const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('.site-nav');

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 24);
}, { passive: true });

menuButton.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
});

nav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
document.getElementById('year').textContent = new Date().getFullYear();

document.getElementById('inquiry-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const value = (name) => (form.get(name) || '').toString().trim();

  const subject = `Gardenia Strings inquiry${value('date') ? ` — ${value('date')}` : ''}`;
  const body = [
    'Hello Gardenia Strings,',
    '',
    'I would like to inquire about live music for my event.',
    '',
    `Name: ${value('name')}`,
    `Email: ${value('email')}`,
    `Phone: ${value('phone') || 'Not provided'}`,
    `Event date: ${value('date') || 'Not provided'}`,
    `Event type: ${value('event_type') || 'Not provided'}`,
    `Preferred ensemble: ${value('ensemble') || 'Not sure yet'}`,
    `Venue and city: ${value('venue') || 'Not provided'}`,
    '',
    'Event vision and notes:',
    value('message') || 'No additional notes.',
    '',
    'Thank you.'
  ].join('\n');

  const mailto = `mailto:gardeniastrings@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  document.getElementById('form-status').textContent = 'Your email app is opening with the inquiry prepared.';
  window.location.href = mailto;
});
