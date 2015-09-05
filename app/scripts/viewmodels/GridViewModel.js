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
        function GridViewModel() {
            var app = AppModel.instance();
            var self = this;
            self.photos = app.photos;
            self.fileSelectHandle = function() {
                console.log('CHROME POWER!');
                chrome.fileSystem.chooseEntry({
                    type: 'openWritableFile',
                    accepts: [{mimeTypes: ['image/jpg']}],
                    acceptsMultiple: true
                }, app.selectPhotosHandler);

            };
            ko.track(self);
        }

        return GridViewModel;
    }
);
