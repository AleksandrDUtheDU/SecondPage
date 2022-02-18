$(document).ready(function(){    //силк слайдер
    $('.carousel__inner').slick({
        speed: 1200,
        prevArrow: '<button type="button" class="slick-prev"><img src="icons/chevron-left-solid.svg"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="icons/chevron-right-solid.svg"></button>',
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    dots: true,
                    arrows: false,
                }
            }
        ]
    });

    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {  // настраиваем кнопку таба, если клик > добавляем класс активности и убираем его у всех остальных
        $(this)
          .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
          .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active'); // при активации таба по порядку активируем клас контента 
    });

    function toggleSlide(item) {
        $(item).each(function(i) {
            $(this).on('click', function(e) {
                e.preventDefault();
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active'); //создаем фукцию которая принимает и перключаем карточку товара так же классами активности
                $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
            });
        });
    };
    
    toggleSlide('.catalog-item__detail'); //вызываем 
    toggleSlide('.catalog-item__back');

    //MODAL

    $('[data-modal=consultation]').on('click', function() {  //включаем оверлэй
        $('.overlay, #consultation').fadeIn('slow');
    });
    $('.modal__close').on('click', function() {   // нажимаем на крестик и закрывем все модальные формы
        $('.overlay, #consultation, #order, #thanks').fadeOut('slow');
    });
    // $('.button_catalog-item').on('click', function() {
    //     $('.overlay, #order').fadeIn('slow');
    // }); просто открываем статичное модальное окно

    $('.button_catalog-item').each(function(i) {  
        $(this).on('click', function() {
            $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text()); // берем текст из карточки
            $('.overlay, #order').fadeIn('slow');
        });
    });
    // $('#consultation-form').validate();
    // $('#order form').validate({
    //     rules: {
    //         name: "required",
    //         phone: "required",
    //         email: {
    //             required: true,
    //             email: true
    //         }
    //     },
    //     messages: {
    //         name: "Пожайлуста, введите своё имя",
    //         phone: "Пожайлуста, введите свой телефон",
    //         email: {
    //           required: "Пожайлуста, введите свою почту",
    //           email: "Неправильно введен адрес почты"
    //         }
    //       }
    // });
    // $('#order form').validate();

    function valideForms(form){         // создаем функцию которая устанавливает правила для наших форм, можем использовать ее с разными формами
        $(form).validate({
            rules: {
                name: "required",
                phone: "required",
                email: {
                    required: true,
                    email: true
                }
            },
            messages: {
                name: "Пожайлуста, введите своё имя",
                phone: "Пожайлуста, введите свой телефон",
                email: {
                  required: "Пожайлуста, введите свою почту",
                  email: "Неправильно введен адрес почты"
                }
            }
        });
    };

    valideForms ('#order form'); 
    valideForms ('#consultation form');
    valideForms ('#consultation-form');

    $('input[name=phone]').mask("+7 (999) 999-99-99"); // подключаем маску телефона через плагин

    $('form').submit(function(e) { // берем все формы при подтверждении > запускаем функцию 1) отменяем пезагрузку страницы 2) проводим валидацию заполнения формы (что бы не слать пустые письма) 3) отправляем POST данные на сервер в формате для сервера 3) дан при выполнении запускаем функцию > чистим импуты > закрываем форму отправки > открываем форму благодарности
        e.preventDefault();
        if (!$(this).valid()) {
            return;
        }
        $.ajax({
            type: "POST",
            url:  "mailer/smart.php",
            data: $(this).serialize()
        }).done(function() {
            $(this).find("input").val("");
            $('#consultation, #order').fadeOut();
            $('.overlay, #thanks').fadeIn('slow');


            $('from').trigger('reset');
        });
        return false;
    });
});

