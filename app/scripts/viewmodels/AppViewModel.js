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
            self.isChromeApp = chrome.fileSystem ? true : false;
        }

        return AppViewModel;
    }
);
