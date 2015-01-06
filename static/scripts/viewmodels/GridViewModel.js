"use strict";

define(
    [ "knockout", "jquery" ],
    function(ko, $) {
        function GridViewModel(){
            var self = this;
            self.photos = ko.observableArray([]);
            self.loadPhoto = function() {
                $.getJSON("/photos").done(
                    function(data) {
                        self.photos = data;
                    }
                );
            };
        }
        return GridViewModel;
    }
);
