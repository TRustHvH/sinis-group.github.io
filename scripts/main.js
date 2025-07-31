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
                        find_height(currentStep);
                    }
                });
            }

            if ($prevBtn.length && !$prevBtn.hasClass('disabled')) {
                $prevBtn.on('click', function () {
                    if (currentStep > 0) {
                        currentStep--;
                        updateCases(currentStep);
                        find_height(currentStep);
                    }
                });
            }
        });
    }

    function find_height(step) {
        let case_height;

        // Берём конкретный активный кейс по индексу
        const $activeCase = $cases.eq(step);

        let img_height = $activeCase.find(".case__img").height();
        let text_height = 0;

        // Высота текста только для активного кейса
        $activeCase.find('.case__info').each(function () {
            let currentHeight = $(this).height();
            if (currentHeight > text_height) {
                text_height = currentHeight;
            }
        });

        if ($(window).width() > 960) {
            case_height = text_height + 50;
        } else {
            case_height = img_height + text_height + 28;
        }

        $(".work-stages__cases").height(case_height);
    }

    find_height(currentStep);
    updateCases(currentStep);
    attachButtonListeners();
    $(window).on("resize", function () {
        find_height(currentStep);
    });

    // FAQ

    $('.faq__question').on('click', function () {
        $(this).closest('.faq__question').toggleClass('active');
    });


});