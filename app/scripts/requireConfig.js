require.config({
    baseUrl: 'scripts',
    paths: {
        'knockout': '../bower_components/knockout/dist/knockout',
        'ko-es5': '../bower_components/knockout-es5/dist/knockout-es5.min',
        'knockout-secure-binding': '../bower_components/knockout-secure-binding/dist/knockout-secure-binding.min',
        'mapbox': '../vendor/mapbox',
        'piexifjs': '../bower_components/piexifjs/piexif',
        'photoswipe': '../bower_components/photoswipe/dist/photoswipe',
        'photoswipe-ui': '../bower_components/photoswipe/dist/photoswipe-ui-default'
    },
    shim: {
        'ko-es5': {
            deps: ['knockout']
        },
        'knockout-secure-binding': {
            deps: ['knockout']
        },
        'piexifjs': {
            exports: 'piexif'
        },
        'mapbox': {
            exports: 'mapbox'
        },
        'photoswipe-ui': {
            deps: ['photoswipe']
        }
    }
});
