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

            self.changeGPSHandler = function(coords) {
                var gps = {};
                var lat_ = coords.lat.toString().split('.');
                var lng_ = coords.lng.toString().split('.');
                var _lat = lat_[1].slice(0, 7);
                var _lng = lng_[1].slice(0, 7);
                gps[piexifjs.GPSIFD.GPSLatitudeRef] = lat_ >= 0 ? 'N' : 'S';
                gps[piexifjs.GPSIFD.GPSLongitudeRef] = lng_ >= 0 ? 'E' : 'W';
                gps[piexifjs.GPSIFD.GPSLatitude] = [parseInt(Math.abs(lat_[0]) + _lat), 1000000];
                gps[piexifjs.GPSIFD.GPSLongitude] = [parseInt(Math.abs(lng_[0]) + _lng), 1000000];
                console.log(gps);
                self.updateMetaWithObject({'GPS': gps});
            };

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
        };

        return EditorViewModel;
    }
);

// {0th: Object, Exif: Object, GPS: Object, Interop: Object, 1st: Object}
