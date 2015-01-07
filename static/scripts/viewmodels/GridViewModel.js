"use strict";

define(
    [ "knockout", "jquery" ],
    function(ko, $) {
        function GridViewModel(){
            var self = this;
            self.photos = ko.observableArray([]);
            self.selectPhotos = ko.observableArray([]);

            self.loadPhoto = function() {
                $.getJSON("/photos").done(
                    function(data) {
                        self.photos(data);
                    }
                );
            };

            self.selectToggle = function() {
                this.domElem = $("img[src=" + "\'/photo/" + this.SourceFile + "\']");
                this.domElem.parent().toggleClass("photo_selected");
                self.selectPhotos.append(this);
            };

            self.selectAllToggle = function() {
                // TODO: FIX THEM
                var allImage = $("img"),
                    selectedStatus = allImage.parent().forEach(function(index) {
                        return allImage[index].classList.contains("photo_selected");
                    });
                console.log(selectedStatus);

                // allImage.parent().toggleClass("photo_selected", !allSelected);
            };

            self.runEditor = function() {

            };
        }
        return GridViewModel;
    }
);
