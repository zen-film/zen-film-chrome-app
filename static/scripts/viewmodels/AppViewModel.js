'use strict';

define(
    [
        'viewmodels/GridViewModel'
    ],
    function(
        GridViewModel
    ) {
        function AppViewModel(){
            var self = this;

            self.gridViewModel = new GridViewModel();
        }
        return AppViewModel;
    }
);
