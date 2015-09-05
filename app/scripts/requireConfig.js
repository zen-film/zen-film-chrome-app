require.config({
    baseUrl: 'scripts',
    paths: {
        'knockout': '../bower_components/knockout/dist/knockout',
        'ko-es5': '../bower_components/knockout-es5/dist/knockout-es5.min',
        'knockout-secure-binding': '../bower_components/knockout-secure-binding/dist/knockout-secure-binding.min',
        'fotorama': '//cdnjs.cloudflare.com/ajax/libs/fotorama/4.6.3/fotorama',
        'mapbox': '../vendor/mapbox',
        'piexifjs': '../bower_components/piexifjs/piexif'
    },
    shim: {
        'ko-es5': {
            deps: ['knockout']
        },
        'knockout-secure-binding': {
            deps: ['knockout']
        },
        'fotorama': {
            exports: 'fotorama'
        },
        'piexifjs': {
            exports: 'piexif'
        },
        'mapbox': {
            exports: 'mapbox'
        }
    }
});
