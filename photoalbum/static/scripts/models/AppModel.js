'use strict';

define(
    [
        'knockout', 'jquery', 'models/PhotoModel'
    ],
    function(
        ko, jQuery, PhotoModel
    ) {
        function AppModel() {
            var self = this;

            self.photos = ko.observableArray();
            self.photosWithGroups = ko.observable();
            self.selectPhotos = ko.observableArray();
            self.gear = ko.observable({});

            self.loadPhotos = function() {
                jQuery.getJSON('/similar').done(
                    function(similarResult) {
                        var photosWithGroups = [];
                        var i;
                        for (i = 0; i < similarResult.length; i++) {
                            photosWithGroups.push([]);
                        }
                        jQuery.getJSON('/photos').done(
                            function(data) {
                                data.forEach(function(photoProp) {
                                    var photoObj = new PhotoModel(photoProp);
                                    self.photos.push(photoObj);
                                    var similarGroupIndex = null;
                                    similarResult.forEach(function(simGroup, index) {
                                        if (simGroup.indexOf(photoObj.SourceFile) > -1) {
                                            similarGroupIndex = index;
                                            photosWithGroups[index].push(photoObj);
                                        }
                                    });
                                    if (similarGroupIndex === null) {
                                        photosWithGroups.push(photoObj);
                                    }
                                });
                                self.photosWithGroups(photosWithGroups);
                                console.log(self.photosWithGroups);
                            }
                        );
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
