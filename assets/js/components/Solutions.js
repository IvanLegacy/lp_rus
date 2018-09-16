'use strict';

export default class Solutions{
    constructor() {

        let
            el = $ ('.js-solutions-click'),
            oldText = el.text();
        
        el.click(function() {

            var clickedText = $(this).data('clicked');
            
            if ($(this).hasClass('clicked')) {

                $('.js-solutions-items').removeClass('solutions__items--hidden');
                
                $('.js-solutions-all').removeClass('solutions__all--visible');
                
                $(this).text(oldText);

                $(this).removeClass('clicked');
                
            }else{
                
                $('.js-solutions-items').addClass('solutions__items--hidden');
                
                $('.js-solutions-all').addClass('solutions__all--visible');

                $(this).text(clickedText);

                $(this).addClass('clicked');

            }
        
        });
    }
}