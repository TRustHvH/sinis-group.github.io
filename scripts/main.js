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

    // Work stages

    function find_height() {

        let case_height

        let img_height = $(".case__img").height();

        let text_height = 0

        $('.case__info').each(function() {
            let currentHeight = $(this).height();
            if (currentHeight > text_height) {
                text_height = currentHeight;
            }
        });

        if($(window).width() > 764)
        {
            case_height = text_height + 50
        }
        else
            case_height = img_height + text_height + 28;

        $(".work-stages__cases").height(case_height);
    }

    find_height();

    $(window).on("resize", function () {
        find_height();
    })

});