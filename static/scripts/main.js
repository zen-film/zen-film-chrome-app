"use strict";

require(
    [ "knockout", "models/AppModel", "viewmodels/GridViewModel" ],
    function(ko, AppModel, GridViewModel) {
        // debugger;
        // var appModel = AppModel.instance();
        // appModel.loadPhoto();
        ko.applyBindings(new GridViewModel());
    }
);
