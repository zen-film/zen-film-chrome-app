'use strict';

define(
    [
        'viewmodels/GridViewModel',
        'viewmodels/EditorViewModel',
        'viewmodels/MapViewModel'
    ],
    function(
        GridViewModel,
        EditorViewModel,
        MapViewModel
    ) {
        function AppViewModel(){
            var self = this;
            window.AVM = self;
            self.gridViewModel = new GridViewModel();
            self.editorViewModel = new EditorViewModel();
            self.mapViewModel = new MapViewModel([55, 44]);
        }
        return AppViewModel;
    }
);
