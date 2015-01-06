"use strict";

require(
    [ "knockout", "models/AppModel", "viewmodels/GridViewModel" ],
    function(ko, AppModel, GridViewModel) {
        var appModel = AppModel.instance();
        appModel.loadPhoto();
        var gridViewModel = new GridViewModel();
        ko.applyBindings(gridViewModel);
    }
);
