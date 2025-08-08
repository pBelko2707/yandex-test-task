// Мониторим брейкпоинт
const mobileMediaQuery = window.matchMedia('(max-width: 768px)');

function updateMobileView(e) {
    document.body.classList.toggle('is-mobile', e.matches);
}

mobileMediaQuery.addListener(updateMobileView);
updateMobileView(mobileMediaQuery);