'use strict';

export default class Clients{
    constructor() {
        $('.js-clients').each(function() {
            
            let image = $(this).find('.js-clients-image');

            $(this).find('.clients__item').click(function() {

                const newImage = $(this).data('image');

                $(this).closest('.clients').find('.clients__item').removeClass('active');

                $(this).addClass('active');

                image.find('img').attr('src', newImage);
                image.find('img').parent().attr('href', newImage);

                $('.venobox').venobox();
                
            });
            
        });
    }
}