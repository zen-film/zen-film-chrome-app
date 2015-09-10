'use strict';

define(
    [
        'knockout', 'ko-es5',
        'photoswipe', 'photoswipe-ui',
        'models/AppModel'
    ],
    function(
        ko, koes5,
        PhotoSwipe, PhotoSwipeUIDefault,
        AppModel
    ) {
        function GalleryViewModel() {
            var self = this;
            var app = AppModel.instance();
            self.galleryNode = document.querySelector('.pswp');
            self.gallery = new PhotoSwipe(self.galleryNode, PhotoSwipeUIDefault, [], {
                history: false,
                focus: false,
                index: 0,
                showAnimationDuration: 0,
                hideAnimationDuration: 0
            });

            self.openGallery = function(ctx, event) {
                event.preventDefault();
                var photos = [];
                self.gallery.items = [];
                for (var i = 0; i < app.selectPhotos.length; i++) {
                    console.log(i);

                    var img = new Image();

                    img.onload = (function() {
                        var k = i;
                        return function(e) {
                            photos.push({
                                src: e.target.src,
                                w: e.target.width,
                                h: e.target.height
                            });
                            if (app.selectPhotos.length - 1 === k) {
                                self.gallery.shout('loadPhotos', photos);
                            }
                        };
                    })();

                    img.src = app.selectPhotos[i].img;
                }

                self.gallery.listen('loadPhotos', function(photos) {
                    self.gallery.items = photos;
                    self.gallery.init();
                    // self.gallery.ui.getFullscreenAPI().enter();
                });
            };

            ko.track(self);
        }

        return GalleryViewModel;
    }
);
