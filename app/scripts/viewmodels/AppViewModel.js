'use strict';

define(
    [
        'knockout', 'ko-es5',
        'models/AppModel',
        'models/UserModel',
        'viewmodels/GridViewModel',
        'viewmodels/EditorViewModel',
        'viewmodels/GalleryViewModel'
    ],
    function(
        ko, koes5,
        AppModel,
        UserModel,
        GridViewModel,
        EditorViewModel,
        GalleryViewModel
    ) {
        function AppViewModel() {
            var self = this;
            self.app = AppModel.instance();
            self.gridViewModel = new GridViewModel();
            self.editorViewModel = new EditorViewModel();
            self.galleryViewModel = new GalleryViewModel();

            self.messageHandler = function(event) {
                if (event.data.type === 'changeGPS') {
                    self.editorViewModel.changeGPSHandler(event.data.geo);
                } else if (event.data.type === 'vkAuth') {
                    console.log('auth');
                }
            };
            window.addEventListener('message', self.messageHandler);
            self.isChromeApp = chrome.fileSystem ? true : false;
            self.hasTouchScreen = 'ontouchstart' in window;
            ko.track(self);
        }

        return AppViewModel;
    }
);
