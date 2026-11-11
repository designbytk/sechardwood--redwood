document.documentElement.classList.add("js");
// Small progressive enhancements; content and navigation are rendered in HTML.
const menu = document.querySelector('.site-nav__toggle');
const nav = document.querySelector('#navigation');
const submenu = document.querySelector('.site-nav__services-toggle');
const setMenu = open => { menu.setAttribute('aria-expanded', String(open)); nav.classList.toggle('is-open', open); };
menu.addEventListener('click', () => setMenu(menu.getAttribute('aria-expanded') !== 'true'));
submenu?.addEventListener('click', () => submenu?.setAttribute('aria-expanded', String(submenu?.getAttribute('aria-expanded') !== 'true')));
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') { if (nav.classList.contains('is-open')) { setMenu(false); menu.focus(); } if (submenu?.getAttribute('aria-expanded') === 'true') { submenu?.setAttribute('aria-expanded', 'false'); submenu.focus(); } }
});
document.addEventListener('click', e => { if (!e.target.closest('.site-header')) { setMenu(false); submenu?.setAttribute('aria-expanded','false'); } });
document.querySelectorAll('[data-inquiry]').forEach(form => form.addEventListener('submit', e => {
  e.preventDefault();
  const data = new FormData(form);
  const labels = { first: 'First name', last: 'Last name', name: 'Name', phone: 'Phone', email: 'Email', location: 'City & Zipcode', service: 'Service', timing: 'Timing', message: 'Project details' };
  const body = Array.from(data, ([key, value]) => `${labels[key] || key}: ${value}`).join('\n');
  const href = `mailto:jeff@secservices.net?subject=${encodeURIComponent('SEC project inquiry')}&body=${encodeURIComponent(body)}`;
  form.querySelector('.inquiry-form__status').textContent = 'Your request has not been sent yet. Send the draft in your email app. If it does not open, copy the details below and email jeff@secservices.net.';
  let copy = form.querySelector('.inquiry-form__email-draft');
  if (!copy) { copy = document.createElement('textarea'); copy.className = 'inquiry-form__email-draft'; copy.readOnly = true; copy.rows = 7; copy.setAttribute('aria-label', 'Email draft to copy'); form.append(copy); }
  copy.value = body;
  window.location.href = href;
}));
document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
  let count = 0;
  document.querySelectorAll('[data-filter]').forEach(b => b.setAttribute('aria-pressed', String(b === button)));
  document.querySelectorAll('[data-category]').forEach(card => { card.hidden = button.dataset.filter !== 'all' && card.dataset.category !== button.dataset.filter; if (!card.hidden) count++; });
  document.querySelector('#filter-status').textContent = `${count} articles shown`;
}));
document.querySelectorAll('[data-scroll]').forEach(button => button.addEventListener('click', () => {
  const track = document.querySelector('.review-track');
  track.scrollBy({left: Number(button.dataset.scroll) * track.clientWidth, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'});
}));
const search = document.querySelector('#search-query');
if (search) {
  search.value = new URLSearchParams(location.search).get('q') || '';
  function filterSearch() { const query = search.value.trim().toLowerCase(); let count = 0; document.querySelectorAll('[data-search-item]').forEach(item => { item.hidden = !item.textContent.toLowerCase().includes(query); if (!item.hidden) count++; }); document.querySelector('#search-status').textContent = count ? `${count} results` : 'No matches. Try flooring, kitchen, or contact.'; }
  search.addEventListener('input', filterSearch); filterSearch();
}
