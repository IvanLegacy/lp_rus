'use strict';

export default class Burger{
    constructor(){
        $('.js-burger').click(function () {

            if ($(this).hasClass('active')) {
                $('.js-menu').removeClass('menu--visible');
                $(this).removeClass('active');
            } else {
                $('.js-menu').addClass('menu--visible');
                $(this).addClass('active');
            }

        });
    }
}