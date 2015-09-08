'use strict';

define(
    [
        'knockout', 'ko-es5'
    ],
    function(
        ko, koes5
    ) {
        function UserModel() {
            var self = this;

            self.id = ko.observable();
            self.name = ko.observable();
            self.isAuth = ko.observable(false);

            ko.track(self);
        }

        UserModel.instance = function() {
            if (!UserModel._instance) {
                var instance = new UserModel();
                UserModel._instance = instance;
            }
            return UserModel._instance;
        };

        return UserModel;
    }
);
