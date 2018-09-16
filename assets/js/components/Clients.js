'use strict';

export default class Clients{
    constructor() {
        $('.js-clients').each(function() {
            
            let image = $(this).find('.js-clients-image');

            $(this).find('.clients__item').click(function() {

                const newImage = $(this).data('image');

                image.find('img').attr('src', newImage);
                
            });
            
        });
    }
}