'use strict';

define(
    [
        'knockout', 'jquery',

        'models/AppModel'
    ],
    function(
        ko, jQuery,

        AppModel
    ) {
        function GridViewModel() {
            var self = this;

            var app = AppModel.instance();

            self.photos = app.photos;
            self.selectPhotos = app.selectPhotos;

            self.showGallery = function() {
                var gallery = jQuery('.fotorama');
                gallery.fotorama();
                gallery.data('fotorama').requestFullScreen();
                gallery.on('fotorama:fullscreenexit', function() {
                    gallery.data('fotorama').destroy();
                });
            };
        }
        return GridViewModel;
    }
);
