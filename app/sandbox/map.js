'use strict';

require(
    [
        'knockout',

        'viewmodels/MapViewModel'
    ],
    function(ko, MapViewModel) {
        ko.applyBindings(new MapViewModel());
    }
);
