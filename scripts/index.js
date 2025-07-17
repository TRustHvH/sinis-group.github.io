$(function () {

    // Этапы работ

    const $cases = $('.work-stages__case');
    const $car = $('.cases__car');
    const $circles = $('.cases__circle');
    const $circleContainer = $('.cases__car-stages');
    let currentStep = 0;

    function updateCases(step) {
        $cases.each(function (index) {
            if (index === step) {
                $(this).removeClass('disabled');
            } else {
                $(this).addClass('disabled');
            }
        });

        // Перемещение машины — рассчитываем в %
        const $circle = $circles.eq(step);
        const containerWidth = $circleContainer.outerWidth();
        const circleLeft = $circle.position().left;
        const percent = (circleLeft / containerWidth) * 100;
        $car.css('left', `calc(${percent}% - 40px)`);
    }

    function attachButtonListeners() {
        $cases.each(function (index) {
            const $caseElement = $(this);
            const $nextBtn = $caseElement.find('.main-button');
            const $prevBtn = $caseElement.find('.black-button');

            if ($nextBtn.length) {
                $nextBtn.on('click', function () {
                    if (currentStep < $cases.length - 1) {
                        currentStep++;
                        updateCases(currentStep);
                    }
                });
            }

            if ($prevBtn.length && !$prevBtn.hasClass('disabled')) {
                $prevBtn.on('click', function () {
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

    // FAQ

    $('.faq__question .plus').on('click', function () {
        $(this).closest('.faq__question').toggleClass('active');
    });

    // Валидация номера телефона

    $(".phone").mask("+999 (99) 999-99-99");

    // Форма заявки


    $('.open-form').on('click', function (e) {
        e.preventDefault();
        $('.call').addClass('active');
    });

    $('#call__submit').on('click', function (e) {
        e.preventDefault();

        let isValid = true;

        // Проверяем все input внутри .call__form
        $('.call__form input').each(function () {
            const $input = $(this);
            if ($input.prop('required') && !$input.val().trim()) {
                $input.addClass('input-error');
                $input.removeClass('input-success');
                isValid = false;
            } else {
                $input.removeClass('input-error');
                $input.addClass('input-success');
            }
        });

        if (isValid) {
            // Скрываем форму, показываем сообщение об успехе
            $('.call__form').addClass('disabled');
            $('.call__success').removeClass('disabled');
        }
    });

    $('.call__close').on('click', function () {
        $('.call').removeClass('active');

        // Сбросить на начальную форму, если было сообщение об успехе
        if (!$('.call__success').hasClass('disabled')) {
            $('.call__success').addClass('disabled');
            $('.call__form').removeClass('disabled');
        }
    });

});