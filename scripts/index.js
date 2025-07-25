$(function() {

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

    // Валидация номера телефона

    $(".phone").mask("+375 (99) 999-99-99");

    // Мобильное меню

    let bars = $('.header__bars')
    let mobile = $('.header__mobile')

    bars.on('click', function () {

        if(bars.hasClass('active')) {
            mobile.removeClass('active');
            bars.removeClass('active');

            return
        }

        bars.addClass('active');
        mobile.addClass('active');
    })
})