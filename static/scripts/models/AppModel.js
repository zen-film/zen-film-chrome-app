'use strict';

define(
    [
        'knockout', 'jquery', 'models/PhotoModel'
    ],
    function(
        ko, jQuery, PhotoModel
    ) {
        function AppModel(){
            var self = this;

            self.photos = ko.observableArray();
            self.selectPhotos = ko.observableArray();

            self.loadPhotos = function() {
                var self = this;

                jQuery.getJSON('/photos').done(
                    function(data) {
                        data.map(function(photoProp) {
                            var photoObj = new PhotoModel(photoProp);
                            self.photos.push(photoObj);
                        });
                    }
                );
            };

            self.loadGear = function() {
                var self = this;

                jQuery.getJSON('/gear').done(
                    function(data) {
                        return data;
                    }
                );
            };
        }


        AppModel.instance = function() {
            if (!AppModel._instance) {
                var instance = new AppModel();
                AppModel._instance = instance;
            }
            return AppModel._instance;
        };

        return AppModel;
    }
);
