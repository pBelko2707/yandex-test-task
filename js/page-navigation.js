const primaryBtn = document.querySelector('.hero__button-primary');
const secondaryBtn = document.querySelector('.hero__button-secondary');

primaryBtn.addEventListener('click', () => {
    document.getElementById('donate')?.scrollIntoView({ behavior: 'smooth' });
});

secondaryBtn.addEventListener('click', () => {
    document.getElementById('tournament')?.scrollIntoView({ behavior: 'smooth' });
});