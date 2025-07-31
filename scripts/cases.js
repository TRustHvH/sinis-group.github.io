$(function () {
    const $choosesDesktopContainer = $('.our-cases__choose');
    const $choosesMobileContainer = $('.our-cases__choose-mobile');
    const $choosesMobileHtml = $('.our-cases__choose-mobile div');
    const $cases = $('.our-cases__case');

    function syncChooseElements() {
        const $choosesDesktop = $choosesDesktopContainer.find('.choose');
        const $choosesMobile = $choosesMobileContainer.find('.choose');

        function activateCase(index) {
            $choosesDesktop.removeClass('active').eq(index).addClass('active');
            $choosesMobile.removeClass('active').eq(index).addClass('active');

            $cases.removeClass('active').eq(index).addClass('active');
            const $activeCase = $cases.eq(index);

            initCarousel($activeCase);

            // Вызов пересчета высоты для активного кейса
            findHeight($activeCase);
        }

        $choosesDesktop.each(function (index) {
            $(this).off('click').on('click', function () {
                activateCase(index);
            });
        });

        $choosesMobile.each(function (index) {
            $(this).off('click').on('click', function () {
                activateCase(index);
            });
        });
    }

    // Перенос HTML из mobile в desktop при ширине < 960px
    function moveMobileToDesktop() {
        if (window.innerWidth < 961) {
            // Переносим HTML
            $choosesDesktopContainer.html($choosesMobileHtml.html());
        }
    }

    // Вызов при загрузке
    moveMobileToDesktop();
    syncChooseElements();

    // При ресайзе (если нужно динамически)
    $(window).on('resize', function () {
        moveMobileToDesktop();
        syncChooseElements();
    });

    // Инициализация карусели
    function initCarousel($caseBlock) {
        const $thumbnails = $caseBlock.find('.case__carousel .thumbnail img');
        const $mainImage = $caseBlock.find('.case__carousel .mainImage');

        $thumbnails.off('click').on('click', function () {
            const fullSrc = $(this).data('full');
            $mainImage.attr('src', fullSrc);

            $caseBlock.find('.case__carousel .thumbnail').removeClass('active');
            $(this).parent().addClass('active');
        });

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

        const $fullThumbnails = $caseBlock.find('.full-image-show .thumbnail img');
        const $fullMainImage = $caseBlock.find('.full-image-show .mainImage');

        $fullThumbnails.off('click').on('click', function () {
            const fullSrc = $(this).data('full');
            $fullMainImage.attr('src', fullSrc);

            $caseBlock.find('.full-image-show .thumbnail').removeClass('active');
            $(this).parent().addClass('active');
        });

        $caseBlock.find('.full-image-show .close-zoom').off('click').on('click', function () {
            $caseBlock.find('.full-image-show').removeClass('active');
        });
    }

    const $activeCase = $('.our-cases__case.active').first();
    if ($activeCase.length) {
        initCarousel($activeCase);
        findHeight($activeCase);
    }

    function findHeight($activeCase) {
        let caseHeight;
        let imgHeight = $activeCase.find(".case__left").height();
        let chooseHeight = $(".our-cases__choose").height();
        let chooseMobileHeight = $(".our-cases__choose-mobile").height();

        // Берем только текст активного кейса
        let textHeight = $activeCase.find('.case__right').height();

        if($(window).width() > 960) {
            caseHeight = textHeight + 32 + chooseHeight;
        } else {
            caseHeight = imgHeight + textHeight + 112 + chooseMobileHeight + chooseHeight;
        }

        $(".our-cases__cases").height(caseHeight);
    }

    $(window).on('resize', function () {
        findHeight($activeCase);
    })
});
