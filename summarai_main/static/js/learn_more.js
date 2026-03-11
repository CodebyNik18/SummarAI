function toggleFaq(el) {
    const item = el.parentElement;
    const wasOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
    if (!wasOpen) item.classList.add('open');
}

const tabs = document.querySelectorAll('.nav-tab');
const sections = ['how-it-works', 'features', 'pipeline', 'faq'];
window.addEventListener('scroll', () => {
    let current = 'how-it-works';
    sections.forEach(id => {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 140) current = id;
    });
    tabs.forEach(t => {
        t.classList.toggle('active', t.getAttribute('href') === '#' + current);
    });
});