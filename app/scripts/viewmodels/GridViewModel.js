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

            self.selectPhoto = function(ctx, event) {
                var labelNode = event.currentTarget;
                var inputNode = document.getElementById(labelNode.id);
                var checkedState = inputNode.getAttribute('data-checked');
                var checked = checkedState === 'true' ? false : true;
                inputNode.setAttribute('data-checked', checked);
                labelNode.setAttribute('data-checked', checked);
                if (checked) {
                    app.selectPhotos.push(ctx);
                } else {
                    var index = app.selectPhotos.indexOf(ctx);
                    if (index > -1) {
                        app.selectPhotos.splice(index, 1);
                    }
                }
            };

            self.fileChooseHandle = function() {
                console.log('CHROME POWER!');
                chrome.fileSystem.chooseEntry({
                    type: 'openWritableFile',
                    accepts: [{mimeTypes: ['image/jpg']}],
                    acceptsMultiple: true
                }, app.choosePhotosHandler);

            };

            self._fileChooseHandle = function(ctx, event) {
                var _files = event.target.files;
                var files = [];

                for (var i = 0; i < _files.length; i++) {
                    files.push(_files[i]);
                }

                app.choosePhotosHandler(files);
            };

            ko.track(self);
        }

        return GridViewModel;
    }
);
