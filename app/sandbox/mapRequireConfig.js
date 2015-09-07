require.config({
    baseUrl: '../scripts',
    paths: {
        'knockout': '../bower_components/knockout/dist/knockout',
        'ko-es5': '../bower_components/knockout-es5/dist/knockout-es5.min',
        'mapbox': '../vendor/mapbox'
    },
    shim: {
        'ko-es5': {
            deps: ['knockout']
        },
        'mapbox': {
            exports: 'mapbox'
        }
    }
});
