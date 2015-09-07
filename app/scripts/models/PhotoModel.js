'use strict';

define(
    ['knockout', 'ko-es5', 'piexifjs', 'utils/extend'],
    function(ko, koes5, piexifjs, extend) {
        function PhotoModel(fileEntry) {
            var self = this;

            var fileEntryHandler = function(fileEntry) {
                fileEntry.file(function(file) {
                    self.fileEntry = fileEntry;
                    fileLoaderHandler(file);
                });
            };

            var fileLoaderHandler = function(file) {
                self.file = file;
                var reader = new FileReader();

                reader.onload = (function() {
                    return function(e) {
                        self.img = e.target.result;
                        self.exif = piexifjs.load(self.img);
                        console.log(self.exif);
                    };
                })(file);

                reader.readAsDataURL(file);
            };

            if (chrome.fileSystem) {
                fileEntryHandler(fileEntry);
            } else {
                fileLoaderHandler(fileEntry);
            }

            self.unsavedProp = ko.observable({'0th': {}, 'Exif': {}, 'GPS': {}});

            self.currentProp = ko.pureComputed(function() {
                var currentProp = extend(
                    self.exif, self.unsavedProp());
                return currentProp;
            }, this);

            // self.updateProp = function(key, value) {
            //     var prop = self.unsavedProp;
            //     prop[key] = value;
            //     self.unsavedProp = prop;
            // };

            ko.track(self);
        }

        return PhotoModel;
    }
);
