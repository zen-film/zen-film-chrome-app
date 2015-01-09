'use strict';

define(
    [
        'knockout', 'ymaps',

        'models/AppModel'
    ],
    function(
        ko, ymaps,

        AppModel
    ) {
        function EditorViewModel() {
            var self = this;
            var app = AppModel.instance();
            self.selectPhotos = app.selectPhotos;
            self.gear = app.gear;

            self.saveMeta = app.saveMeta;

            self.watchingProps = {
                Title : {
                    handler : 'simple',
                    title: 'Title'
                },
                Description : {
                    handler : 'simple',
                    title: 'Description',
                },
                // Human info
                Creator: {
                    icon : 'mdi-account',
                    placeholder : 'Whois shot this?',
                    handler : 'simple',
                    title: 'Author'
                },
                UserComment: {
                    icon : 'mdi-message-image',
                    placeholder : 'Cool photo, all right?',
                    handler : 'simple',
                    title: 'Comments'
                },
                // About gear
                Model : {
                    handler: 'select',
                    title: 'Camera model',
                    icon: 'mdi-camera',
                    custom: true,
                    data: function() {
                        var cameras = Object.keys(self.gear().Camera || {}),
                            out = [{id: 'Unknown', text: 'Unknown'}];
                        for (var i in cameras) {
                            var model = cameras[i];
                            out.push({id: model, text: model});
                        }
                        return out;
                    }
                },
                Lens : {
                    handler: 'select',
                    title: 'Lens model',
                    icon: 'mdi-album',
                    custom: true,
                    data: function(){
                        var lens = Object.keys(self.gear().Lens || {}),
                            out = [{id: 'Unknown', text: 'Unknown'}];
                        for (var i in lens) {
                            var model = lens[i];
                            out.push({id: model, text: model});
                        }
                        return out;
                    }
                },
                Film : {
                    handler: 'select',
                    title: 'Film',
                    icon: 'mdi-film',
                    custom: true,
                    data: function() {
                        window.test = self;
                        console.log(self);
                        var filmsObj = self.gear().Film,
                            film = Object.keys(filmsObj || {}),
                            out = [{id: 'Unknown', text: 'Unknown'}];

                        for (var i in film) {
                            var filmName = [filmsObj[film[i]].Maker, film[i], filmsObj[film[i]].ISO].join(' ');
                            out.push({id: filmName, text: filmName + ' / type: ' + filmsObj[film[i]].Type});
                        }
                        return out;
                    }
                },
                ExposureNumber: {
                    icon : 'mdi-sort-numeric',
                    placeholder : 'Exposure number',
                    handler : 'simple',
                    title: 'Exposure number'
                },
                RollId: {
                    icon : 'mdi-film',
                    placeholder : '1234',
                    handler : 'simple',
                    title: 'Film roll id'
                },
                // About photo
                FocalLength: {
                    icon : 'mdi-image-filter-center-focus',
                    placeholder : 'FocalLength',
                    handler : 'simple',
                    title: 'FocalLength'
                },
                ISO: {
                    placeholder : 'ISO',
                    handler : 'simple',
                    title: 'ISO'
                },
                ShutterSpeed: {
                    handler: 'select',
                    title: 'Shutter speed',
                    custom: false,
                    icon: 'mdi-timer',
                    data: function(){
                        return [
                            { id: 0.002, text: '1/500 sec'},
                            { id: 60, text: '1 min'},
                            { id: 30, text: '30 sec'},
                            { id: 15, text: '15 sec'},
                            { id: 8, text: '8 sec'},
                            { id: 4, text: '4 sec'},
                            { id: 2, text: '2 sec'},
                            { id: 1, text: '1 sec'},
                            { id: 0.5, text: '1/2 sec'},
                            { id: 0.25, text: '1/4 sec'},
                            { id: 0.125, text: '1/8 sec'},
                            { id: 0.05, text: '1/20 sec'},
                            { id: 0.02, text: '1/50 sec'},
                            { id: 0.01, text: '1/100 sec'},
                            { id: 0.008, text: '1/125 sec'},
                            { id: 0.005, text: '1/200 sec'},
                            { id: 0.003125, text: '1/320 sec'},
                            { id: 0.0025, text: '1/400 sec'},
                            { id: 0.002, text: '1/500 sec'},
                            { id: 0.0015625, text: '1/640 sec'},
                            { id: 0.00125, text: '1/800 sec'},
                            { id: 0.000625, text: '1/1600 sec'},
                            { id: 0.0005, text: '1/2000 sec'},
                            { id: 0.0004, text: '1/2500 sec'},
                            { id: 0.0003125, text: '1/3200 sec'},
                            { id: 0.00025, text: '1/4000 sec'},
                            { id: 0.0002, text: '1/5000 sec'},
                            { id: 0.00015625, text: '1/6400 sec'},
                            { id: 0.000125, text: '1/8000 sec'},
                            { id: 0, text: 'Unknown'},
                        ];
                    }
                },
                MeteringMode : {
                    handler: 'select',
                    title: 'Metering Mode',
                    icon: 'mdi-image-filter-tilt-shift',
                    custom: false,
                    data: function(){
                        return  [
                            { id: 0, text: 'Unknown'},
                            { id: 1, text: 'Average'},
                            { id: 2, text: 'Center Weighted Average'},
                            { id: 3 , text: 'Spot'},
                            { id: 4 , text: 'MultiSpot'},
                            { id: 5 , text: 'Pattern'},
                            { id: 6 , text: 'Partial'},
                            { id: 255 , text: 'other'}
                        ];
                    }
                },
                GPSLongitude : {
                    handler: 'maps'
                }
            };

            self.currentState = ko.pureComputed(function() {
                var photos = this.selectPhotos();

                var state = {};

                var first = function(prop) {
                    var firstPhotoProp = photos[0].currentProp();
                    return firstPhotoProp[prop];
                };

                var isCommon = function(prop) {
                    var firstPhotoProp = photos[0].currentProp();
                    for(var i = 1; i < photos.length; i++) {
                        var iPhotoProp = photos[i].currentProp();
                        if(iPhotoProp[prop] !== firstPhotoProp[prop]) {
                            return false;
                        }
                    }
                    return true;
                };

                var simpleHandler = function(prop, empty, notCommon) {
                    empty = empty || '';
                    notCommon = notCommon || 'Different value';
                    var out = photos.length?
                                isCommon(prop)?
                                    first(prop):
                                    notCommon:
                                empty;
                    return out;
                };

                var selectHandler = function(prop) {
                    var warningText = {
                        MeteringMode: {
                            empty : 255,
                            notCommon : 255
                        },
                        ShutterSpeed: {
                            empty : 0,
                            notCommon : 0
                        },
                        Model: {
                            empty : 'Unknown',
                            notCommon : 'Unknown'
                        },
                        Lens: {
                            empty : 'Unknown',
                            notCommon : 'Unknown'
                        },
                        Film: {
                            empty : 'Unknown',
                            notCommon : 'Unknown'
                        }
                    };

                    var out =  simpleHandler(prop, warningText[prop].empty, warningText[prop].notCommon);

                    // if (['Model', 'Lens', 'Film'].indexOf(prop) + 1) {
                    //     var gearType;
                    //
                    //     switch (['Model', 'Lens', 'Film'].indexOf(prop)) {
                    //         case 0:
                    //             gearType = 'Camera';
                    //             break;
                    //         case 1:
                    //             gearType = 'Lens';
                    //             break;
                    //         case 2:
                    //             gearType = 'Film';
                    //             break;
                    //     }
                    //
                    //     if (out !== 'Unknown') {
                    //         var currentGear = self.gear()[gearType][out],
                    //             currentGearExtend = Object.keys(currentGear || {});
                    //
                    //         for (var i in currentGearExtend) {
                    //             self.updatePhotosProp(currentGearExtend[i],
                    //                     currentGear[currentGearExtend[i]]);
                    //         }
                    //     }
                    // }
                    return out;
                };

                var gpsHandler = function(prop) {
                    // if (!self.map) {
                    //     var mapDomElem = document.getElementsByClassName('map')[0];
                    //
                    //     self.map = new ymaps.Map(mapDomElem, {
                    //         center : [44,55],
                    //         zoom: 10,
                    //         controls: [
                    //             'zoomControl',
                    //             'searchControl',
                    //             'typeSelector',
                    //             'fullscreenControl'
                    //         ]
                    //     });
                    //
                    //     self.map.createPlacemark = function(coords){
                    //         self.map.geoObjects.add(
                    //             new ymaps.Placemark(coords, {}, {
                    //                 preset: 'islands#dotIcon',
                    //                 iconColor: '#8bc34a'
                    //             })
                    //         );
                    //         self.map.setBounds(app.map.geoObjects.getBounds());
                    //     };
                    // }
                    var out = simpleHandler(prop);
                    return out;
                };

                var fabrique = function(obj, props) {
                    (function(){
                        var handlers = {
                            simple : simpleHandler,
                            select : selectHandler,
                            maps : gpsHandler
                        };
                        for (var prop in props) {
                            var _prop = prop;
                            obj[_prop] = handlers[self.watchingProps[_prop].handler](_prop);
                        }
                    }());
                };

                fabrique(state, self.watchingProps);
                return state;

            }, self);

            self.updatePhotosProp = function(key, value) {
                var photos = this.selectPhotos();
                for (var photoId in photos) {
                    var photoObj = photos[photoId];
                    photoObj.updateProp(key, value);
                }
            };

            self.allProps = {};
            for (var prop in self.watchingProps) {
                (function(){
                    var _prop = prop;
                    if (self.watchingProps.hasOwnProperty(_prop)) {
                        self.allProps[_prop] = ko.pureComputed(
                            {
                                write: function(value) {
                                    console.log(_prop, value);
                                    self.updatePhotosProp(_prop, value);
                                },
                                read: function() {
                                    var _state = self.currentState();
                                    var state = _state[_prop] || '';
                                    return state;
                                },
                                owner: this
                            }
                        );
                    }
                }());
            }
        }
        return EditorViewModel;
    }
);
