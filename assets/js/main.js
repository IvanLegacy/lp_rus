window.$ = $;
window.jQuery = $;

require ('./vendor/jquery.validate.min');
require('./vendor/owl.carousel.min');

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
	
});