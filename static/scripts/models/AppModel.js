"use strict";

define(
    [ "knockout", "jquery" ],
    function(ko, $) {
        function AppModel() {
            var self = this;

            self.ready = true;

            self.loadPhoto = function() {
                $.getJSON("/photos", function(data) {
                    self.photos = data;
                });
            };
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
