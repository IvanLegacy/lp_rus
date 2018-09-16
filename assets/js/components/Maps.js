'use strict';

export default class Maps{
    constructor() {
        $('.js-map').each(function(i, el) {
            var myMap;
            var lat = $(el).data('lat');
            var lng = $(el).data('lng');
            var marker = $(el).data('marker');
            var markerWidth = $(el).data('marker-width');
            var markerHeight = $(el).data('marker-height');
            var id = $(el).find('.map__yandex').attr('id');
            var zoom = $(el).data('zoom');
            var uluru = [lat, lng];

            if (ymaps !== undefined) {
                ymaps.ready(init);
            }

            function init() {

                myMap = new ymaps.Map(id, {
                    center: uluru,
                    zoom: zoom,
                    controls: ['smallMapDefaultSet', 'searchControl'],
                });
                var placemark = new ymaps.Placemark(
                    uluru,
                    {},
                    {
                        iconLayout: 'default#image',
                        iconImageHref: marker,
                        iconImageSize: [markerWidth, markerHeight],
                        iconImageOffset: [-(markerWidth / 2), -markerHeight]
                    }
                );

                myMap.geoObjects.add(placemark);
                myMap.behaviors.disable('scrollZoom');
            }
        });
    }
}