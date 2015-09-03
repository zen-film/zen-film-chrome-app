'use strict';

// Listens for the app launching then creates the window
chrome.app.runtime.onLaunched.addListener(function() {
    var width = 900;
    var height = 600;

    chrome.app.window.create('index.html', {
        id: 'main',
        bounds: {
            width: width,
            height: height,
        },
        innerBounds: {
            minWidth: width,
            minHeight: height
        }
    });
});
