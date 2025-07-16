document.addEventListener('DOMContentLoaded', () => {
    const cases = Array.from(document.querySelectorAll('.work-stages__case'));
    const car = document.querySelector('.cases__car');
    const circles = document.querySelectorAll('.cases__circle');
    const circleContainer = document.querySelector('.cases__car-stages'); // родитель кругов
    let currentStep = 0;

    function updateCases(step) {
        cases.forEach((item, index) => {
            if (index === step) {
                item.classList.remove('disabled');
            } else {
                item.classList.add('disabled');
            }
        });

        // Перемещение машины — рассчитываем в %
        const circle = circles[step];
        const containerWidth = circleContainer.offsetWidth;
        const circleLeft = circle.offsetLeft;
        const percent = (circleLeft / containerWidth) * 100;
        car.style.left = `calc(${percent}% - 40px)`;
    }

    function attachButtonListeners() {
        cases.forEach((caseElement, index) => {
            const nextBtn = caseElement.querySelector('.main-button');
            const prevBtn = caseElement.querySelector('.black-button');

            if (nextBtn) {
                nextBtn.addEventListener('click', () => {
                    if (currentStep < cases.length - 1) {
                        currentStep++;
                        updateCases(currentStep);
                    }
                });
            }

            if (prevBtn && !prevBtn.classList.contains('disabled')) {
                prevBtn.addEventListener('click', () => {
                    if (currentStep > 0) {
                        currentStep--;
                        updateCases(currentStep);
                    }
                });
            }
        });
    }

    updateCases(currentStep);
    attachButtonListeners();
});