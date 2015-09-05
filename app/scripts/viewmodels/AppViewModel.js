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
            var app = AppModel.instance();
            var self = this;
            self.user = app.user;
            self.gridViewModel = new GridViewModel();
            self.editorViewModel = new EditorViewModel();
        }

        return AppViewModel;
    }
);
