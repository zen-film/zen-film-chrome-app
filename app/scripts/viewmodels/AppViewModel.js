'use strict';

define(
    [
        'models/AppModel',
        'models/UserModel',
        'viewmodels/GridViewModel',
        'viewmodels/EditorViewModel'
    ],
    function(
        AppModel,
        UserModel,
        GridViewModel,
        EditorViewModel
    ) {
        function AppViewModel() {
            var self = this;
            self.app = AppModel.instance();
            self.gridViewModel = new GridViewModel();
            self.editorViewModel = new EditorViewModel();

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
        }

        return AppViewModel;
    }
);
