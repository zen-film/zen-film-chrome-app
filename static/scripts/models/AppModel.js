"use strict";

define(
    [ "knockout", "jquery" ],
    function(ko, $) {
        function AppModel() {
            var self = this;

            self.loadPhoto = function() {
                $.getJSON("/photos", function(data) {
                    return data;
                });
            };

            self.photos = ko.observableArray(self.loadPhoto());

        }

        AppModel.instance = function() {
            if (!AppModel._instance) {
                var instance = new AppModel();
                AppModel._instance = instance;
            }
            return AppModel._instance;
        };

        return AppModel;
    });
