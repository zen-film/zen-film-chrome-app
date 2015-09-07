'use strict';

define(
    [
        'knockout', 'ko-es5', 'models/PhotoModel', 'models/UserModel'
    ],
    function(
        ko, koes5, PhotoModel, UserModel
    ) {
        function AppModel() {
            var self = this;

            self.photos = ko.observableArray();
            self.selectPhotos = ko.observableArray();

            self.user = UserModel.instance();

            /**
             * @param {fileEntry[]} filesEntry
             */
            self.choosePhotosHandler = function(filesEntry) {
                filesEntry.forEach(function(fileEntry) {
                    self.photos.push(new PhotoModel(fileEntry));
                });
            };

            ko.track(self);
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
