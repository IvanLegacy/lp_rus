'use strict';

export default class Forms {
    constructor() {
        function openModal(target) {
            $(target).addClass('opened');
            $('html').addClass('opened-popup');
            $('.js-hover').addClass('opened').addClass('hover--light');
        }

        function closeModal(target) {
            target.removeClass('opened');
            $('.js-hover').removeClass('opened').removeClass('hover--light');
            $('html').removeClass('opened-popup');
            target.find('.form').removeClass('form--success');
        }


        $('body').on('click', '.js-modal-open', function () {
            var target = $(this).data('target');

            openModal(target);
        });

        $('body').on('click', '.js-modal-close, .modal__body', function (e) {
            console.log(e)
            if ($(e.target).hasClass('modal__body')) {
                closeModal($(this).closest('.modal'));
            }else{
                // closeModal($(this).closest('.modal'));
            }
        });

        $('body').on('click', '.js-hover', function () {
            closeModal($('.js-modal.opened'));
        });

        $('body').on('click', '.js-modal', function (e) {
            if ($(e.target).hasClass('js-modal')) {
                closeModal($(e.target));
            }
        });
    }
}