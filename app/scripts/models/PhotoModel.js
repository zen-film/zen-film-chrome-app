'use strict';

define(
    ['knockout', 'ko-es5', 'piexifjs', 'utils/extend'],
    function(ko, koes5, piexifjs, extend) {
        function PhotoModel(fileEntry) {
            var self = this;

            /**
             * @param {fileEntry} fileEntry
             */
            var fileEntryHandler = function(fileEntry) {
                fileEntry.file(function(file) {
                    self.fileEntry = fileEntry;
                    fileLoaderHandler(file);
                });
            };

            /**
             * @param {File} file
             */
            var fileLoaderHandler = function(file) {
                self.file = file;
                var reader = new FileReader();

                reader.onload = (function() {
                    return function(e) {
                        self.img = e.target.result;
                        self.exif = piexifjs.load(self.img);
                        for (var ifd in self.exif) {
                            if (ifd == 'thumbnail') {
                                continue;
                            }
                            console.log('-' + ifd);
                            for (var tag in self.exif[ifd]) {
                                var name = 'name';
                                console.log('  ' + piexif.TAGS[ifd][tag][name] + ':' + self.exif[ifd][tag]);
                            }
                        }
                        console.log(self.exif);
                    };
                })(file);

                reader.readAsDataURL(file);
            };

            // HACK: if we run app just in chrome, fileEntry is File
            if (chrome.fileSystem) {
                fileEntryHandler(fileEntry);
            } else {
                fileLoaderHandler(fileEntry);
            }

            self.unsavedProp = ko.observable({'0th': {}, 'Exif': {}, 'GPS': {}});

            self.currentProp = ko.pureComputed(function() {
                return extend(self.exif, self.unsavedProp);
            }, this);

            self.updateMetaWithObject = function(obj) {
                self.unsavedProp = extend(self.unsavedProp, obj);
            };

            ko.track(self);
        }

        return PhotoModel;
    }
);
