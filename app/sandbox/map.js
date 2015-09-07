'use strict';

require(
    [
        'knockout', 'ko-es5', 'knockout-secure-binding',

        'viewmodels/MapViewModel'
    ],
    function(
        ko, koes5, KSB,

        MapViewModel
        ) {
        var mapViewModel = new MapViewModel();
        var options = {
            attribute: 'data-sbind',
            globals: {},
            bindings: ko.bindingHandlers,
            noVirtualElements: false
        };
        window.avm = mapViewModel;
        ko.bindingProvider.instance = new KSB(options);
        ko.applyBindings(mapViewModel);
    }
);
