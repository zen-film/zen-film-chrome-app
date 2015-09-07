'use strict';

define(
    [
        'knockout', 'ko-es5', 'piexifjs',
        'models/AppModel'
    ],
    function(
        ko, koes5, piexifjs,
        AppModel
    ) {
        function EditorViewModel() {
            var self = this;
            var app = AppModel.instance();

            self.mapIsActive = ko.observable(false);
            self.leaveFromMapInterval = false;

            L.mapbox.accessToken = 'pk.eyJ1Ijoic2xvZ2dlciIsImEiOiIwNjY2ZmUxMmRlNzJlNmNhMzE1YjFjOGY1MmQ2ZDY0ZSJ9.TDV9k1MtJSGG1srdycqkmA';

            self._map = L.mapbox.map(document.querySelector('.map'), 'mapbox.dark', {
                featureLayer: false,
                legendControl: false,
                shareControl: false,
                infoControl: false
            }).setView([56.83732996124871, 60.59886932373047], 10);

            var cluster = new L.MarkerClusterGroup();
            self.c = cluster;
            self._map.on('click', function(event) {
                var coords = event.latlng;
                self._map.addMarker(coords, true);

                var gps = {};
                var lat_ = coords.lat.toString().split('.');
                var lng_ = coords.lng.toString().split('.');
                var _lat = lat_[1].slice(0, 7);
                var _lng = lng_[1].slice(0, 7);
                gps[piexifjs.GPSIFD.GPSLatitudeRef] = lat_ >= 0 ? 'N' : 'S';
                gps[piexifjs.GPSIFD.GPSLongitudeRef] = lng_ >= 0 ? 'E' : 'W';
                gps[piexifjs.GPSIFD.GPSLatitude] = [parseInt(Math.abs(lat_[0]) + _lat), 1000000];
                gps[piexifjs.GPSIFD.GPSLongitude] = [parseInt(Math.abs(lng_[0]) + _lng), 1000000];
                self.updateMetaWithObject({'GPS': gps});
            });

            /**
             * @param {Array} coords
             * @param {Boolean} noFit - need reset map view
             */
            self._map.addMarker = function(coords, noFit) {
                noFit = noFit || false;

                cluster.addLayer(
                    L.marker(coords, {
                        icon: L.mapbox.marker.icon({
                            'marker-symbol': 'camera',
                            'marker-color': '#9B59B6'
                        })}));

                if (!noFit) {
                    self._map.fitBounds(cluster.getBounds(), {
                        padding: [10, 10]
                    });
                }
            };

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

            self.currentState = ko.pureComputed(function() {
                var photos = app.selectPhotos;
                var state = {};

                return state;
            });

            self.updateMetaWithObject = function(obj) {
                var photos  = app.photos;
                for (var photoId in photos) {
                    photos[photoId].updateMetaWithObject(obj);
                }
            };

            ko.track(self);
        }

        return EditorViewModel;
    }
);

// {0th: Object, Exif: Object, GPS: Object, Interop: Object, 1st: Object}
