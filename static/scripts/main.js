"use strict";

require(
    [ "knockout", "models/AppModel", "viewmodels/AppViewModel" ],
    function(ko, AppModel, AppViewModel) {
        // Setup App
        var appModel = AppModel.instance();
        appModel.loadPhotos();
        // Setup VM
        var appViewModel = new AppViewModel();
        // Ko
        ko.applyBindings(appViewModel);
    }
);
