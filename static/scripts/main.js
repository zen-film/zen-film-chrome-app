"use strict";

require(
    [ "knockout", "viewmodels/GridViewModel" ],
    function(ko, GridViewModel) {
        var gridViewModel = new GridViewModel();
        gridViewModel.loadPhoto();
        ko.applyBindings(gridViewModel);
    }
);
