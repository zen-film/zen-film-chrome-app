'use strict';

define(
    [
        'knockout', 'ko-es5'
    ],
    function(
        ko, koes5
    ) {
        function MapViewModel() {
            var self = this;

            var token = [
                'pk',
                'eyJ1Ijoic2xvZ2dlciIsImEiOiIwNjY2ZmUxMmRlNzJlNmNhMzE1YjFjOGY1MmQ2ZDY0ZSJ9',
                'TDV9k1MtJSGG1srdycqkmA'
            ];
            L.mapbox.accessToken = token.join('.');
            self.map = L.mapbox.map(document.querySelector('.map'), 'mapbox.dark', {
                featureLayer: false,
                legendControl: false,
                shareControl: false,
                infoControl: false
            }).setView([56.83732996124871, 60.59886932373047], 10);

            self.map.locate();

            self.map.on('locationfound', function(e) {
                self.map.fitBounds(e.bounds);
            });

            self.map.on('locationerror', function() {
                console.log('locate err');
            });

            var cluster = new L.MarkerClusterGroup();

            self.map.on('click', function(event) {
                var coords = event.latlng;
                cluster.clearLayers();
                self.map.addMarker(coords, true);

                parent.postMessage({
                    'type': 'changeGPS',
                    'geo': coords
                }, '*');
            });

            /**
             * @param {Array} coords
             * @param {Boolean} noFit - need reset map view
             */
            self.map.addMarker = function(coords, noFit) {
                noFit = noFit || false;

                cluster.addLayer(
                    L.marker(coords, {
                        icon: L.mapbox.marker.icon({
                            'marker-symbol': 'camera',
                            'marker-color': '#9B59B6'
                        })}));

                if (!noFit) {
                    self.map.fitBounds(cluster.getBounds(), {
                        padding: [10, 10]
                    });
                }
            };

            self.map.addLayer(cluster);

            ko.track(self);
        }

        return MapViewModel;
    }
);
