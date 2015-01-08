'use strict';

define(
    [
        'ymaps', 'jquery'
    ],
    function(
        ymaps, jquery
    ) {
        function MapViewModel(center){
            var self = this;

            ymaps.ready(function(){
                var mapDomElem = jquery('.map');

                self._map = new ymaps.Map(mapDomElem, {
                    center : center,
                    zoom: 10,
                    controls: [
                        'zoomControl',
                        'searchControl',
                        'typeSelector',
                        'fullscreenControl'
                    ]
                });

                self._map.events.add('click', function (e){
                    var coords = e.get('coords');

                    // self._map.geoObjects.each(function(geoObject){
                    //     self._map.geoObjects.remove(geoObject);
                    // });

                    self.createPlacemark(coords);
                });
            });

            self.createPlacemark = function(coords){
                self._map.geoObjects.add(
                    new ymaps.Placemark(coords, {}, {
                        preset: 'islands#dotIcon',
                        iconColor: '#8bc34a',
                        draggable: true
                    })
                );
                self._map.setBounds(self._map.geoObjects.getBounds());
            };
        }
        return MapViewModel;
    }
);
