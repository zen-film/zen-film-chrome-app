'use strict';

require(
    [
        'knockout',
        'material', 'ripples',
        'select2', 'bindings/select2',

        'models/AppModel', 'viewmodels/AppViewModel'
    ],
    function(
        ko,

        material, ripples,
        select2, bindSelect2,

        AppModel, AppViewModel
        ) {
        ko.bindingHandlers.select2 = bindSelect2;
        // Setup App
        var appModel = AppModel.instance();
        appModel.loadPhotos();
        // Setup VM
        var appViewModel = new AppViewModel();
        appViewModel.gear = appModel.loadGear();
        window.av = appViewModel;
        // Ko
        ko.applyBindings(appViewModel);
    }
);
