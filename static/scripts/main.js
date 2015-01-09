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
        // Setup App
        var appModel = AppModel.instance();
        appModel.loadPhotos();
        appModel.loadGear();

        jQuery('.fotorama').on('.fotorama:ready', function(e, fotorama){
            jQuery('#fullscreen').on('click', function(){
                debugger;
                fotorama.requestFullScreen();
            });
        });

        // Setup VM
        var appViewModel = new AppViewModel();
        window.av = appViewModel;
        // Ko
        ko.applyBindings(appViewModel);
    }
);
