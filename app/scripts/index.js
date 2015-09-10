'use strict';

require(
    [
        'knockout', 'ko-es5', 'knockout-secure-binding',

        'viewmodels/AppViewModel'
    ],
    function(
        ko, koes5, KSB,

        AppViewModel
        ) {
        var appViewModel = new AppViewModel();
        var options = {
            attribute: 'data-sbind',
            globals: {},
            bindings: ko.bindingHandlers,
            noVirtualElements: false
        };
        window.avm = appViewModel;
        ko.bindingProvider.instance = new KSB(options);
        ko.applyBindings(appViewModel);
    }
);
