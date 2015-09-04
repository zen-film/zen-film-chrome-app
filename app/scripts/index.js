'use strict';

(function(document) {
    var highlights = document.querySelector('.selection-highlights');
    var content = document.querySelector('.selection-content');
    var fileLoader = document.querySelector('#file-loader');

    var toggleCheckboxHandler = function() {
        var label = document.querySelector('label[for="' + this.getAttribute('id') + '"]');
        label.setAttribute('data-checked', this.getAttribute('checked'));
    };

    [].forEach.call(document.querySelectorAll('.selection-checkbox'), function(node) {
        node.addEventListener('change', toggleCheckboxHandler, false);
    });

    var fileSelectHandle = function(event) {
        var photos = event.target.files;
        for (var i = 0, f; f = photos[i]; i++) {

            // Only process image files.
            if (!f.type.match('image.*')) {
                continue;
            }
            console.log(f);
            var reader = new FileReader();

            // Closure to capture the file information.
            reader.onload = (function(theFile) {
                return function(e) {
                    var img = e.target.result;

                    var id = theFile.name;

                    var checkbox = document.createElement('input');
                    checkbox.setAttribute('type', 'checkbox');
                    checkbox.classList.add('selection-checkbox');
                    checkbox.id = id;
                    highlights.insertBefore(checkbox, fileLoader);

                    var highlight = document.createElement('div');
                    highlight.classList.add('selection-highlight');
                    highlights.insertBefore(highlight, fileLoader);

                    var label = document.createElement('label');
                    label.setAttribute('for', id);
                    label.classList.add('selection-item');
                    content.insertBefore(label, fileLoader.labels[0]);

                    var imgContainer = document.createElement('span');
                    imgContainer.classList.add('selection-item-container');
                    imgContainer.style.backgroundImage = 'url(' + img + ')';
                    label.appendChild(imgContainer);
                };
            })(f);

            // Read in the image file as a data URL.
            reader.readAsDataURL(f);
        }
    };

    fileLoader.addEventListener('change', fileSelectHandle, false);
})(document);
