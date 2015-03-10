'use strict';

define(
    ['knockout', 'jquery'],
    function(ko, jquery) {
        function PhotoModel(prop) {
            var self = this;

            self.prop = prop || {};
            self.unsavedProp = ko.observable({});

            self.SourceFile = prop.SourceFile;

            self.currentProp = ko.pureComputed(function() {
                var currentProp = jquery.extend(
                    true, self.prop, self.unsavedProp());
                return currentProp;
            }, this);

            self.updateProp = function(key, value) {
                var prop = self.unsavedProp();
                prop[key] = value;
                self.unsavedProp(prop);
            };
        }

        return PhotoModel;
    }
);
