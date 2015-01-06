"use strict";

define(
    [ "knockout", "models/AppModel" ],
    function(ko, AppModel) {
        function GridViewModel(){
            var self = this;

            self.app = AppModel.instance();
            self.photos = ko.observableArray(Array(self.app.photos));
        }
        return GridViewModel;
    }
);
