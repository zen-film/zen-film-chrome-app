'use strict';

define(
    [
        'knockout', 'ko-es5',
        'models/AppModel'
    ],
    function(
        ko, koes5,
        AppModel
    ) {
        function EditorViewModel() {
            var self = this;
            var app = AppModel.instance();
            self.selectPhotos = app.selectPhotos;

            self.mapIsActive = ko.observable(false);
            self.leaveFromMapInterval = false;

            L.mapbox.accessToken = 'pk.eyJ1Ijoic2xvZ2dlciIsImEiOiIwNjY2ZmUxMmRlNzJlNmNhMzE1YjFjOGY1MmQ2ZDY0ZSJ9.TDV9k1MtJSGG1srdycqkmA';
            // Create a map in the div #map
            self._map = L.mapbox.map(document.querySelector('.map'), 'mapbox.dark', {
                featureLayer: false,
                legendControl: false,
                shareControl: false,
                infoControl: false
            }).setView([56.83732996124871, 60.59886932373047], 10);

            var cluster = new L.MarkerClusterGroup();
            self.c = cluster;
            self._map.on('click', function(event) {
                var coord = event.latlng;
                var marker = L.marker(coord, {
                    icon: L.mapbox.marker.icon({
                        'marker-symbol': 'camera',
                        'marker-color': '#9B59B6'
                    })});
                console.log(coord);
                console.log(cluster);
                cluster.addLayer(marker);
            });
            self._map.addLayer(cluster);
            self.mouseleaveMapHandler = function() {
                self.leaveFromMapInterval = setTimeout(
                    function() {
                        self.toggleMapActiveState();
                    },
                    1500
                );
            };

            self.mouseenterMapHandler = function() {
                clearTimeout(self.leaveFromMapInterval);
                self.mapIsActive = true;
            };

            self.toggleMapActiveState = function() {
                self.mapIsActive = !self.mapIsActive;
            };

            ko.track(self);
        }

        return EditorViewModel;
    }
);
