$(function () {
    const $chooses = $('.choose');
    const $cases = $('.our-cases__case');

    // Переключение кейсов
    $chooses.each(function (index) {
        $(this).on('click', function () {
            $chooses.removeClass('active');
            $(this).addClass('active');

            $cases.removeClass('active');
            $cases.eq(index).addClass('active');

            initCarousel($cases.eq(index));
        });
    });

    // Инициализация карусели внутри конкретного кейса
    function initCarousel($caseBlock) {
        const $thumbnails = $caseBlock.find('.case__carousel .thumbnail img');
        const $mainImage = $caseBlock.find('.case__carousel .mainImage');

        // Клик по миниатюре в карусели
        $thumbnails.off('click').on('click', function () {
            const fullSrc = $(this).data('full');
            $mainImage.attr('src', fullSrc);

            $caseBlock.find('.case__carousel .thumbnail').removeClass('active');
            $(this).parent().addClass('active');
        });

        // Кнопка zoom — открывает full-image-show внутри этого кейса
        const $zoomButton = $caseBlock.find('.case__carousel .click-zoom');
        $zoomButton.off('click').on('click', function () {
            const mainImageSrc = $mainImage.attr('src');
            const $zoomContainer = $caseBlock.find('.full-image-show');
            const $zoomImage = $zoomContainer.find('.mainImage');

            $zoomImage.attr('src', mainImageSrc);
            $zoomContainer.addClass('active');
        });

        const $activeThumb = $caseBlock.find('.thumbnail.active img');
        if ($activeThumb.length) {
            const fullSrc = $activeThumb.data('full');
            $mainImage.attr('src', fullSrc);
        }

        // Клик по миниатюрам внутри full-image-show
        const $fullThumbnails = $caseBlock.find('.full-image-show .thumbnail img');
        const $fullMainImage = $caseBlock.find('.full-image-show .mainImage');

        $fullThumbnails.off('click').on('click', function () {
            const fullSrc = $(this).data('full');
            $fullMainImage.attr('src', fullSrc);

            $caseBlock.find('.full-image-show .thumbnail').removeClass('active');
            $(this).parent().addClass('active');
        });

        // Закрытие zoom только для текущего кейса
        $caseBlock.find('.full-image-show .close-zoom').off('click').on('click', function () {
            $caseBlock.find('.full-image-show').removeClass('active');
        });
    }

    // Инициализируем активный кейс при загрузке
    const $activeCase = $('.our-cases__case.active').first();
    if ($activeCase.length) {
        initCarousel($activeCase);
    }
});
