$(function () {
    const $chooses = $('.choose');
    const $cases = $('.our-cases__case');

    // Обработчики для переключения кейсов
    $chooses.each(function (index) {
        $(this).on('click', function () {
            $chooses.removeClass('active');
            $(this).addClass('active');

            $cases.removeClass('active');
            $cases.eq(index).addClass('active');

            initCarousel($cases.eq(index));
        });
    });

    // Функция инициализации карусели внутри конкретного кейса
    function initCarousel($caseBlock) {
        const $thumbnails = $caseBlock.find('.thumbnail img');
        const $mainImage = $caseBlock.find('.mainImage');

        $thumbnails.each(function () {
            $(this).on('click', function () {
                const fullSrc = $(this).data('full');
                $mainImage.attr('src', fullSrc);

                $caseBlock.find('.thumbnail').removeClass('active');
                $(this).parent().addClass('active');
            });
        });

        // Инициализация zoom
        const $zoomButton = $caseBlock.find('.click-zoom');
        $zoomButton.on('click', function () {
            const mainImageSrc = $mainImage.attr('src');
            const $zoomContainer = $('.full-image-show');
            const $zoomImage = $zoomContainer.find('.full-image__inspect');

            $zoomImage.attr('src', mainImageSrc);
            $zoomContainer.addClass('active');
        });
    }

    // Закрытие zoom
    $('.close-zoom').on('click', function () {
        $('.full-image-show').removeClass('active');
    });

    // Инициализируем карусель для активного кейса при загрузке
    const $activeCase = $('.our-cases__case.active').first();
    if ($activeCase.length) {
        initCarousel($activeCase);
    }
});
