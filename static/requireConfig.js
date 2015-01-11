require.config({
    baseUrl: 'static/scripts',
    paths: {
        'knockout': '//cdnjs.cloudflare.com/ajax/libs/knockout/3.2.0/knockout-min',
        'jquery': '//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min',
        'material': '//cdnjs.cloudflare.com/ajax/libs/bootstrap-material-design/0.2.1/js/material.min',
        'ripples': '//cdnjs.cloudflare.com/ajax/libs/bootstrap-material-design/0.2.1/js/ripples.min',
        'ymaps' : '//api-maps.yandex.ru/2.1/?lang=en_US',
        'fotorama': '//cdnjs.cloudflare.com/ajax/libs/fotorama/4.6.3/fotorama'
        // 'select2': '//cdnjs.cloudflare.com/ajax/libs/select2/3.5.2/select2.min'
    },
    shim: {
        'ymaps': {
            exports: 'ymaps'
        },
        'fotorama': {
            exports: 'fotorama'
        },
        'material': {
            deps: ['jquery']
        },
        'ripples': {
            deps: ['material']
        },
        // 'select2': {
        //     exports: 'jquery'
        // }
    }
});
