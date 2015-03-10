'use strict';

require(
    [
        'knockout', 'ymaps', 'fotorama', 'jquery',

        'models/AppModel', 'viewmodels/AppViewModel'
    ],
    function(
        ko, ymaps, fotoramka, jQuery,

        AppModel, AppViewModel
        ) {
        var appModel = AppModel.instance();
        appModel.loadPhotos();
        appModel.loadGear();

        var appViewModel = new AppViewModel();
        window.av = appViewModel;

        ko.applyBindings(appViewModel);
    }
);
