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
            self.gear = ko.observable({});

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

            self.saveMeta = function() {
                var output = {};
                for (var i = 1; i < self.photos().length; i++) {
                    var currentPhoto = self.photos()[i];
                    if (Object.keys(currentPhoto.unsavedProp()).length > 0) {
                        var photoName = currentPhoto.currentProp().SourceFile;
                        output[photoName] = currentPhoto.unsavedProp();
                    }
                }
                output = JSON.stringify(output);
                console.log(output);

                var onSuccess = function() {
                    console.log('Saved!');
                    // window.app = self;
                    // self.photos = ko.observableArray([]);
                    // self.selectPhotos = ko.observableArray([]);
                    // self.loadPhotos();
                };

                jQuery.ajax({
                    type: 'POST',
                    url: '/update',
                    data: output,
                    success: onSuccess,
                    contentType : 'application/json',
                    dataType: 'json'
                });
            };

            self.loadGear = function() {
                var self = this;

                jQuery.getJSON('/gear').done(
                    function(data) {
                        self.gear(data);
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
