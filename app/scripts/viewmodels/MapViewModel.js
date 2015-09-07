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

            L.mapbox.accessToken = 'pk.eyJ1Ijoic2xvZ2dlciIsImEiOiIwNjY2ZmUxMmRlNzJlNmNhMzE1YjFjOGY1MmQ2ZDY0ZSJ9.TDV9k1MtJSGG1srdycqkmA';

            self.map = L.mapbox.map(document.querySelector('.map'), 'mapbox.dark', {
                featureLayer: false,
                legendControl: false,
                shareControl: false,
                infoControl: false
            }).setView([56.83732996124871, 60.59886932373047], 10);

            var cluster = new L.MarkerClusterGroup();

            self.map.on('click', function(event) {
                var coords = event.latlng;
                self.map.addMarker(coords, true);

                self.appWindow.postMessage(coords, self.app.origin);
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

            self.messageHandler = function(event) {
                if (event.data = "EHLO") {
                    alert('Hello app!');
                    self.appWindow = event.source;
                    self.appOrigin = event.origin;
                } else {
                    if (self.appWindow) {
                        alert(event.data);
                    } else {
                        alert('app not found');
                    }
                }
            }

            self.map.addLayer(cluster)
            // var messagehandler = function(event) {
            //     alert(event.origin);
            //
            //     event.source.postMessage(msg, event.origin)
            // }
            //
            window.addEventListener("message", self.messageHandler, false);

            ko.track(self);
        }

        return MapViewModel;
    }
);
