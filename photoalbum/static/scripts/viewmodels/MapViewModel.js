'use strict';

define(
    [
        'ymaps', 'jquery', 'models/AppModel'
    ],
    function(
        ymaps, jquery, AppModel
    ) {
        function MapViewModel(){
            var self = this;
            var app = AppModel.instance();


            ymaps.ready(function(){
                var mapDomElem = jquery('.map');

                app.map = new ymaps.Map(mapDomElem, {
                    center : [44,55],
                    zoom: 10,
                    controls: [
                        'zoomControl',
                        'searchControl',
                        'typeSelector',
                        'fullscreenControl'
                    ]
                });
            });

            // self.createPlacemark = function(coords){
            //     app.map.geoObjects.add(
            //         new ymaps.Placemark(coords, {}, {
            //             preset: 'islands#dotIcon',
            //             iconColor: '#8bc34a'
            //         })
            //     );
            //     app.map.setBounds(app.map.geoObjects.getBounds());
            // };
        }
        return MapViewModel;
    }
);
