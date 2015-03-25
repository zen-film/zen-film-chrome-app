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
            self.photos = app.photos;
            self.gear = app.gear;

            self.mapIsActive = ko.observable(false);
            self.leaveFromMapInterval = false;

            self.mouseleaveMapHandler = function() {
                self.leaveFromMapInterval = setTimeout(
                    function() {
                        self.mapIsActive(false);
                    },
                    1500
                );
            };

            self.mouseenterMapHandler = function() {
                clearTimeout(self.leaveFromMapInterval);
                self.mapIsActive(true);
            };

            self.saveMeta = app.saveMeta;

            /**
             * Параметры за которыми мы следим
             *
             * Формат описания
             *
             * Название объекта = название параметра из exif
             * Поля объекта
             * Общие:
             *  handler (String) с название обработчика
             *  title (String) заголовок поля
             *  icon (String) название иконки
             * Для handler == 'simple'
             *  placeholdel (String) Заглушка
             * Для handler == 'select'
             *  data (function) функция, которая возвращает список доступных опций, в формате {id: id, text: 'text'}
             *  custom (Boolean) флаг (не реализована), возможность ввести своё значение
             */
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
                    icon: 'mdi-account',
                    placeholder : 'Whois shot this?',
                    handler: 'simple',
                    title: 'Author'
                },
                UserComment: {
                    icon: 'mdi-message-image',
                    placeholder: 'Cool photo, all right?',
                    handler: 'simple',
                    title: 'Commentaries'
                },
                DateTime: {
                    icon: 'mdi-calendar',
                    placeholder: 'When shot this photo?',
                    handler: 'simple',
                    title: 'Date with format: YYYY:MM:DD HH:MM:SS'
                },
                // About gear
                Model : {
                    handler: 'select',
                    title: 'Camera model',
                    icon: 'mdi-camera',
                    custom: true,
                    data: function() {
                        var cameras = Object.keys(self.gear().Camera || {});
                        var out = [{id: 'Unknown', text: 'Unknown'}];
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
                    data: function() {
                        var lens = Object.keys(self.gear().Lens || {});
                        var out = [{id: 'Unknown', text: 'Unknown'}];
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
                        var filmsObj = self.gear().Film;
                        var film = Object.keys(filmsObj || {});
                        var out = [{id: 'Unknown', text: 'Unknown'}];

                        for (var i in film) {
                            var filmName = film[i];
                            out.push({id: filmName, text: filmName + ' / type: ' + filmsObj[film[i]].Type});
                        }
                        return out;
                    }
                },
                GPSLongitude : {
                    handler: 'maps'
                },
                ExposureNumber: {
                    icon : 'mdi-sort-numeric',
                    placeholder : 'Exposure number',
                    handler : 'simple',
                    title: 'Exposure number'
                },
                RollId: {
                    icon : 'mdi-film',
                    placeholder : '3512',
                    handler : 'simple',
                    title: 'Film roll id'
                },
                // About photo
                FocalLength: {
                    icon : 'mdi-eye',
                    placeholder : 'FocalLength',
                    handler : 'simple',
                    title: 'FocalLength'
                },
                Aperture: {
                    icon : 'mdi-camera-iris',
                    placeholder : 'Aperture',
                    handler : 'simple',
                    title: 'Aperture'
                },
                ISO: {
                    icon: 'mdi-earth',
                    placeholder : 'ISO',
                    handler : 'simple',
                    title: 'ISO'
                },
                ShutterSpeed: {
                    handler: 'select',
                    title: 'Shutter speed',
                    icon: 'mdi-clock',
                    custom: true,
                    data: function() {
                        var out = [];
                        var shutterSpeedList = [
                                8000, 6400, 5000, 4000, 3200, 2500, 2000, 1600, 800,
                                640, 500, 400, 320, 200, 125, 100, 50, 20, 8, 2,
                                (1 / 1), (1 / 2), (1 / 4), (1 / 8), (1 / 15), (1 / 30),
                                (1 / 60), (1 / (60 * 1.3)), (1 / (60 * 1.6)), (1 / (60 * 2)),
                                (1 / (60 * 2.5)), (1 / (60 * 3.2)), (1 / (60 * 4)), (1 / (60 * 5)),
                                (1 / (60 * 6)), (1 / (60 * 8)), (1 / (60 * 10)), (1 / (60 * 13)),
                                (1 / (60 * 15)), (1 / (60 * 20)), (1 / (60 * 25)), (1 / (60 * 30))
                            ];

                        for (var i in shutterSpeedList) {
                            var mathSpeed = 1 / shutterSpeedList[i];
                            var rawSpeed = shutterSpeedList[i];
                            var outText = '';

                            (mathSpeed < 1) ?
                                outText = '1/' + rawSpeed + ' sec' :
                                (mathSpeed < 60) ?
                                    outText = mathSpeed + ' sec' :
                                    outText = (mathSpeed / 60) + ' min';

                            out.push({id: mathSpeed, text: outText });

                        }
                        out.push({ id: 0, text: 'Unknown'});
                        return out;
                    }
                },
                MeteringMode : {
                    handler: 'select',
                    title: 'Metering Mode',
                    icon: 'mdi-image-filter-tilt-shift',
                    custom: false,
                    data: function() {
                        return [
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
            };

            /**
             * Определение того что показать в редакторе
             */
            self.currentState = ko.pureComputed(function() {
                var photos = this.selectPhotos();

                var state = {};

                var first = function(prop) {
                    var firstPhotoProp = photos[0].currentProp();
                    return firstPhotoProp[prop];
                };

                var isCommon = function(prop) {
                    var firstPhotoProp = photos[0].currentProp();
                    for (var i = 1; i < photos.length; i++) {
                        var iPhotoProp = photos[i].currentProp();
                        if (iPhotoProp[prop] !== firstPhotoProp[prop]) {
                            return false;
                        }
                    }
                    return true;
                };

                var simpleHandler = function(prop, empty, notCommon) {
                    empty = empty || '';
                    notCommon = notCommon || 'Different value';
                    var out = photos.length ?
                                isCommon(prop) ?
                                    first(prop) :
                                    notCommon :
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

                    // if (out !== 'Unknown') {
                    //     if (['Model', 'Lens', 'Film'].indexOf(prop) + 1) {
                    //         var gearType;
                    //
                    //         switch (['Model', 'Lens', 'Film'].indexOf(prop)) {
                    //             case 0:
                    //                 gearType = 'Camera';
                    //                 break;
                    //             case 1:
                    //                 gearType = 'Lens';
                    //                 break;
                    //             case 2:
                    //                 gearType = 'Film';
                    //                 break;
                    //         }
                    //
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

                var gpsHandler = function() {
                    if (!self.map) {
                        ymaps.ready(function() {
                            var mapDomElem = document.getElementsByClassName('map')[0];

                            self.map = new ymaps.Map(mapDomElem, {
                                center : [44, 55],
                                zoom: 2,
                                controls: [
                                    'zoomControl',
                                    'searchControl',
                                    'typeSelector',
                                    'fullscreenControl'
                                ]
                            });

                            self.map.geoObjects.add(new ymaps.Clusterer());

                            self.map.events.add('click', function(e) {
                                var coords = e.get('coords');

                                self.map.geoObjects.get(0).removeAll();
                                // self.map.geoObjects.removeAll();

                                self.map.createPlacemark(coords, true);

                                self.updatePhotosProp('GPSLatitude', coords[0]);
                                self.updatePhotosProp('GPSLatitudeRef', 'N');
                                self.updatePhotosProp('GPSLongitude', coords[1]);
                                self.updatePhotosProp('GPSLongitudeRef', 'E');
                                self.updatePhotosProp('GPSMapDatum', 'WGS-84');
                                self.updatePhotosProp('GPSVersionId', '2 0 0 0');
                                self.updatePhotosProp('GPSPosition', coords.join(' '));
                            });

                            self.map.createPlacemark = function(coords, noBounds) {
                                noBounds = noBounds || false;

                                var collection = self.map.geoObjects.get(0);
                                // var collection = self.map.geoObjects;

                                collection.add(
                                    new ymaps.Placemark(coords, {}, {
                                        preset: 'islands#dotIcon',
                                        iconColor: '#8bc34a'
                                    })
                                );
                                !noBounds && self.map.setBounds(collection.getBounds(),
                                    {checkZoomRange: true, zoomMargin: 2});
                            };
                        });
                    } else {
                        self.map.geoObjects.get(0).removeAll();
                        for (var photoId in photos) {
                            var currentPhoto = photos[photoId].currentProp();
                            if (currentPhoto.GPSLongitude && currentPhoto.GPSLatitude) {
                                ymaps.ready(self.map.createPlacemark(
                                    [currentPhoto.GPSLatitude, currentPhoto.GPSLongitude]
                                ));
                            }
                        }
                    }
                };

                var handlersBind = {
                    simple : simpleHandler,
                    select : selectHandler,
                    maps : gpsHandler
                };

                for (var _prop in self.watchingProps) {
                    var prop = _prop;
                    state[prop] = handlersBind[self.watchingProps[prop].handler](prop);
                }

                return state;

            }, self);

            self.updatePhotosProp = function(key, value) {
                var photos = this.selectPhotos();
                for (var photoId in photos) {
                    var photoObj = photos[photoId];
                    photoObj.updateProp(key, value);
                }
            };

            self.haveUnsavedProp = function() {
                var photos = self.photos();
                for (var photoId in photos) {
                    var unsaved = photos[photoId].unsavedProp();
                    if (Object.keys(unsaved).length > 1) {
                        return true;
                    }
                }
                return false;
            };

            self.allProps = {};
            for (var _prop in self.watchingProps) {
                (function() {
                    var prop = _prop;
                    self.allProps[prop] = ko.pureComputed(
                        {
                            write: function(value) {
                                self.updatePhotosProp(prop, value);
                            },
                            read: function() {
                                var _state = self.currentState();
                                var state = _state[prop] || '';
                                return state;
                            },
                            owner: this
                        }
                    );
                }());
            }
        }
        return EditorViewModel;
    }
);
