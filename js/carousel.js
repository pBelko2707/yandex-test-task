// Данные участников
const members = [
    {
        name: "Хозе-Рауль Капабланка",
        bio: "Чемпион мира по шахматам",
        photo: "./images/participant.png"
    },
    {
        name: "Эммануил Ласкер",
        bio: "Чемпион мира по шахматам",
        photo: "./images/participant.png"
    },
    {
        name: "Александр Алехин",
        bio: "Чемпион мира по шахматам",
        photo: "./images/participant.png"
    },
    {
        name: "Арон Нимцович",
        bio: "Чемпион мира по шахматам",
        photo: "./images/participant.png"
    },
    {
        name: "Рихард Рети",
        bio: "Чемпион мира по шахматам",
        photo: "./images/participant.png"
    },
    {
        name: "Остап Бендер",
        bio: "Гроссмейстер",
        photo: "./images/participant.png"
    }
];

// Элементы DOM
const carousel = document.querySelector('.carousel');
const desktopPrevBtn = document.getElementById('desktopPrevBtn');
const desktopNextBtn = document.getElementById('desktopNextBtn');
const mobilePrevBtn = document.getElementById('mobilePrevBtn');
const mobileNextBtn = document.getElementById('mobileNextBtn');
const desktopCounter = document.querySelector('.navigation__buttons .slide-counter'); // Счетчик для десктопа
const mobileCounter = document.querySelector('.navigation__mobile .slide-counter');   // Счетчик для мобилки

let currentIndex = 0;
let intervalId;
const slideInterval = 4000; // Исправлено: 4 секунды

// Инициализация карусели
function initCarousel() {
    createMemberCards();
    updateCounter();
    startInterval();
    setupEventListeners();
}

// Создаем карточки участников
function createMemberCards() {
    carousel.innerHTML = '';

    // Для бесшовного перехода дублируем карточки
    const extendedMembers = [...members, ...members, ...members];

    extendedMembers.forEach((member, index) => {
        const card = document.createElement('div');
        card.className = 'member-card';
        card.innerHTML = `
            <img src="${member.photo}" alt="${member.name}" class="member-photo">
            <h4 class="member-name">${member.name}</h4>
            <p class="member-bio">${member.bio}</p>
            <button class="member-info" data-member-id="${index % members.length}">Подробнее</button>
        `;
        carousel.appendChild(card);
    });

    // Центрируем начальную позицию
    currentIndex = members.length;
    updateCarousel();
}

// Обновляем позицию карусели
function updateCarousel() {
    const cardWidth = document.querySelector('.member-card')?.offsetWidth || 300; // Fallback 300px
    const margin = 20;
    carousel.style.transform = `translateX(-${currentIndex * (cardWidth + margin)}px)`;
    updateCounter();
}

// Обновляем счетчик слайдов
function updateCounter() {
    const realIndex = (currentIndex % members.length) + 1;
    const totalSlides = members.length;
    const counterHTML = `${realIndex}<span>/${totalSlides}</span>`;

    if (desktopCounter) desktopCounter.innerHTML = counterHTML;
    if (mobileCounter) mobileCounter.innerHTML = counterHTML;
}

// Следующий слайд
function nextSlide() {
    currentIndex++;
    updateCarousel();

    if (currentIndex >= members.length * 2) {
        setTimeout(() => {
            currentIndex = members.length;
            carousel.style.transition = 'none';
            updateCarousel();
            setTimeout(() => carousel.style.transition = 'transform 0.5s ease-in-out', 50);
        }, 500);
    }

    resetInterval();
}

// Предыдущий слайд
function prevSlide() {
    currentIndex--;
    updateCarousel();

    if (currentIndex < 0) {
        setTimeout(() => {
            currentIndex = members.length * 2 - 1;
            carousel.style.transition = 'none';
            updateCarousel();
            setTimeout(() => carousel.style.transition = 'transform 0.5s ease-in-out', 50);
        }, 500);
    }

    resetInterval();
}

// Автопереключение слайдов
function startInterval() {
    clearInterval(intervalId);
    intervalId = setInterval(nextSlide, slideInterval);
}

// Сброс интервала
function resetInterval() {
    startInterval();
}

// Настройка обработчиков событий
function setupEventListeners() {
    // Десктопные кнопки
    desktopNextBtn?.addEventListener('click', nextSlide);
    desktopPrevBtn?.addEventListener('click', prevSlide);

    // Мобильные кнопки
    mobileNextBtn?.addEventListener('click', nextSlide);
    mobilePrevBtn?.addEventListener('click', prevSlide);

    // Пауза при наведении (только для десктопа)
    carousel.addEventListener('mouseenter', () => clearInterval(intervalId));
    carousel.addEventListener('mouseleave', startInterval);

    // Обработка касаний для мобильных устройств
    let touchStartX = 0;
    carousel.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
        clearInterval(intervalId);
    }, {passive: true});

    carousel.addEventListener('touchend', (e) => {
        const touchEndX = e.changedTouches[0].clientX;
        if (touchStartX - touchEndX > 50) nextSlide(); // Свайп влево
        if (touchEndX - touchStartX > 50) prevSlide(); // Свайп вправо
        startInterval();
    }, {passive: true});
}

// Запускаем карусель
document.addEventListener('DOMContentLoaded', initCarousel);