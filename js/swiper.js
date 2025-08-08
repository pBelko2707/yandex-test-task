document.addEventListener('DOMContentLoaded', function() {
    const track = document.getElementById('stagesTrack');
    const prevBtn = document.getElementById('stagePrevBtn');
    const nextBtn = document.getElementById('stageNextBtn');
    const pagination = document.getElementById('stagesPagination');
    const cards = document.querySelectorAll('.stage-card');
    let currentStageIndex = 0;
    const cardWidth = 335; // Фиксированная ширина карточки
    const gap = 20; // Расстояние между карточками

    // Создаем пагинацию
    cards.forEach((card, index) => {
        const dot = document.createElement('div');
        dot.classList.add('stage-pagination-dot');
        if(index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToStage(index));
        pagination.appendChild(dot);
    });

    // Обновляем состояние кнопок
    function updateStageButtons() {
        prevBtn.disabled = currentStageIndex === 0;
        nextBtn.disabled = currentStageIndex === cards.length - 1;

        // Обновляем пагинацию
        document.querySelectorAll('.stage-pagination-dot').forEach((dot, index) => {
            dot.classList.toggle('active', index === currentStageIndex);
        });
    }

    // Переход к конкретному этапу
    function goToStage(index) {
        currentStageIndex = index;
        const offset = -(currentStageIndex * (cardWidth + gap));
        track.style.transform = `translateX(${offset}px)`;
        updateStageButtons();
    }

    // Следующий этап
    function nextStage() {
        if(currentStageIndex < cards.length - 1) {
            currentStageIndex++;
            const offset = -(currentStageIndex * (cardWidth + gap));
            track.style.transform = `translateX(${offset}px)`;
            updateStageButtons();
        }
    }

    // Предыдущий этап
    function prevStage() {
        if(currentStageIndex > 0) {
            currentStageIndex--;
            const offset = -(currentStageIndex * (cardWidth + gap));
            track.style.transform = `translateX(${offset}px)`;
            updateStageButtons();
        }
    }

    // Назначаем обработчики
    nextBtn.addEventListener('click', nextStage);
    prevBtn.addEventListener('click', prevStage);

    // Инициализация
    updateStageButtons();

    // Центрируем первый слайд при загрузке
    track.style.transform = `translateX(calc(50% - ${cardWidth/2}px))`;
});