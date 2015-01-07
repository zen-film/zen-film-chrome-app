'use strict';

define(
    [
        'knockout',

        'models/AppModel'
    ],
    function(
        ko,

        AppModel
    ) {
        function GridViewModel(){
            var self = this;

            var app = AppModel.instance();

            self.photos = app.photos;
            self.selectPhotos = ko.observableArray();
        }
        return GridViewModel;
    }
);
