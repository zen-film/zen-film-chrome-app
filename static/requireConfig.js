require.config({
    baseUrl: 'static/scripts',
    paths: {
        'knockout': '//cdnjs.cloudflare.com/ajax/libs/knockout/3.2.0/knockout-min',
        'jquery': '//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min',
        'material': '//cdnjs.cloudflare.com/ajax/libs/bootstrap-material-design/0.2.1/js/material.min',
        'ripples': '//cdnjs.cloudflare.com/ajax/libs/bootstrap-material-design/0.2.1/js/ripples.min',
        'ymaps' : '//api-maps.yandex.ru/2.1/?lang=ru_RU',
        'select2': '//cdnjs.cloudflare.com/ajax/libs/select2/3.5.2/select2.min'
    },
    shim: {
        'material': {
            deps: ['jquery']
        },
        'ripples': {
            deps: ['material']
        },
        'ymaps': {
            exports: 'ymaps'
        },
        'select2': {
            exports: 'jquery'
        }
    }
});
