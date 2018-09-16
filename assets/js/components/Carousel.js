'use strict';

export default class Carousel {
    constructor() {
        var th = this;

        $('.owl-carousel').each(function (i, el) {
            var $this = $(this);
            var items = parseFloat($this.data('items'));
            var nav = $this.data('nav');
            var dots = $this.data('dots');
            var loop = $this.data('loop');
            var responsive = options($this.data('responsive'));
            var prev = $this.data('prev');
            var next = $this.data('next');
            var center = $this.data('center');
            var autoplay = $this.data('autoplay');
            var autoWidth = $this.data('auto-width');
            var autoplayTimeout = parseFloat($this.data('autoplay-timeout'));

            var autoplayHoverPause = $this.data('autoplay-hover-pause');

            $this.owlCarousel({
				items: items,
				nav: nav,
				dots: dots,
				autoHeight: true,
				slideBy: 1,
				loop: loop,
				scrollPerPage: true,
				center: center,
				responsive: responsive,
				navText: [prev, next],
				mouseDrag: false,
				autoWidth: autoWidth,
				autoplay: autoplay,
				autoplayTimeout: autoplayTimeout,
				autoplayHoverPause: autoplayHoverPause
			});
        });
        function options(string) {
            if (typeof string != 'string') return string;

            if (string.indexOf(':') != -1 && string.trim().substr(-1) != '}') {
                string = '{' + string + '}';
            }

            var start = (string ? string.indexOf("{") : -1), options = {};

            if (start != -1) {
                try {
                    options = str2json(string.substr(start));
                } catch (e) { }
            }
            return options;
        }
        function str2json(str, notevil) {
            try {
                if (notevil) {
                    return JSON.parse(str
                        .replace(/([\$\w]+)\s*:/g, function (_, $1) { return '"' + $1 + '":'; })
                        .replace(/'([^']+)'/g, function (_, $1) { return '"' + $1 + '"'; })
                    );
                } else {
                    return (new Function("", "var json = " + str + "; return JSON.parse(JSON.stringify(json));"))();
                }
            } catch (e) { return false; }
        }
    }
}