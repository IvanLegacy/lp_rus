window.$ = $;
window.jQuery = $;

require ('./vendor/jquery.validate.min');
require('./vendor/owl.carousel.min');
require('./vendor/venobox');

import Carousel from './components/Carousel';
import Solutions from './components/Solutions';
import Clients from './components/Clients';
import Maps from './components/Maps';
import Forms from './components/Forms';
import Burger from './components/Burger';

$(function(){

	new Carousel();
	new Solutions();
	new Clients();
	new Maps();
	new Forms();
	new Burger();

	let stockSlider = $('.js-slider-stock').owlCarousel();

	stockSlider.on('changed.owl.carousel', function(event) {

		let index = event.property.value;
		let client = $('.js-slider-stock').find('.slider__item').eq(index).data('client');
		$('.js-stock-client img').attr('src', client);
		
	});

	$('.js-anchors .menu__item').on('click', function () {
		var scrollAnchor = $(this).attr('data-anchor');
		var el = $('.js-anchor-section#' + scrollAnchor);
		if (el && el.length > 0) {
			var scrollPoint = el.offset().top;
			$('body,html').animate({
				scrollTop: scrollPoint
			}, 500);
		}
		$('.js-burger').click();
		return false;
	});

	$ ('.venobox').venobox ();
	
});