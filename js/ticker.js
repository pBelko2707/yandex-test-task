document.addEventListener('DOMContentLoaded', function() {
    const tickers = document.querySelectorAll('.ticker-content');

    tickers.forEach(ticker => {
        const content = ticker.innerHTML;
        ticker.innerHTML = content + content + content;

        let position = 0;
        const speed = 1;
        let animationId;

        function animate() {
            position -= speed;
            ticker.style.transform = `translateX(${position}px)`;

            if (-position > ticker.scrollWidth / 3) {
                position = 0;
            }

            animationId = requestAnimationFrame(animate);
        }

        // Запуск анимации
        animate();

        // Остановка анимации при скрытии (опционально)
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (!animationId) animate();
                } else {
                    cancelAnimationFrame(animationId);
                    animationId = null;
                }
            });
        });
        observer.observe(ticker);
    });
});