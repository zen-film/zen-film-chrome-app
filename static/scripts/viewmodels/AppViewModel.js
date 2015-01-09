'use strict';

define(
    [
        'viewmodels/GridViewModel',
        'viewmodels/EditorViewModel'
    ],
    function(
        GridViewModel,
        EditorViewModel
    ) {
        function AppViewModel(){
            var self = this;
            self.gridViewModel = new GridViewModel();
            self.editorViewModel = new EditorViewModel();
        }
        return AppViewModel;
    }
);
