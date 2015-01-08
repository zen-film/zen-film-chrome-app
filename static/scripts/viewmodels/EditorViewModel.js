'use strict';

define(
    [
        'knockout',

        'models/AppModel'
    ],
    function(
        ko,

        AppModel
    ) {
        function EditorViewModel(){
            var self = this;
            window.EVM = self;

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
                // About camera
                UserComment: {
                    icon : 'mdi-message-image',
                    placeholder : 'Cool photo, all right?',
                    handler : 'simple',
                    title: 'Comments'
                },
                MeteringMode : {
                    handler: 'select',
                    title: 'Metering Mode',
                    icon: 'image-filter-tilt-shift',
                    custom: false,
                    data: [
                        { id: 0, text: 'Unknown'},
                        { id: 1, text: 'Average'},
                        { id: 2, text: 'Center Weighted Average'},
                        { id: 3 , text: 'Spot'},
                        { id: 4 , text: 'MultiSpot'},
                        { id: 5 , text: 'Pattern'},
                        { id: 6 , text: 'Partial'},
                        { id: 255 , text: 'other'}

                    ]
                }
            };

            // [
            //     'Description', // 'Title',
            //     'Creator', 'TagsList', 'UserComment',
            //     'Creator', 'TagsList', 'UserComment',
            //     'DateTime', 'GPSLongitude', 'GPSLatitude',
            //     // 'ExposureNumber', 'Film', 'FilmMaker', 'FilmType', 'RollId',
            //     // 'Make', 'Model',
            //     // 'LensModel', 'Lens', 'LensManufacturer',
            //     // 'FocalLength', 'ISO', 'ShutterSpeed',
            //     // 'Orientation'
            // ];

            var app = AppModel.instance();

            self.selectPhotos = app.selectPhotos;

            self.currentState = ko.pureComputed(function() {
                var photos = this.selectPhotos();

                var state = {};

                var first = function(key) {
                    var firstPhotoProp = photos[0].currentProp();
                    return firstPhotoProp[key];
                };

                var isCommon = function(key) {
                    var firstPhotoProp = photos[0].currentProp();
                    for(var i = 1; i < photos.length; i++) {
                        var iPhotoProp = photos[i].currentProp();
                        if(iPhotoProp[key] !== firstPhotoProp[key]) {
                            return false;
                        }
                    }
                    return true;
                };

                var simpleHandler = function(prop, empty, notCommon) {
                    empty = empty || '';
                    notCommon = notCommon || 'Undefined';
                    var out = photos.length?
                                isCommon(prop)?
                                    first(prop) :
                                    notCommon :
                                empty;
                    return out;
                };

                var selectHandler = function(prop) {
                    var out =  simpleHandler(prop, '', 255);
                    console.log(out);
                    return out;
                };

                var fabrique = function(obj, props) {
                    var handlers = {
                        simple : simpleHandler,
                        select : selectHandler
                    };
                    for (var prop in props) {
                        console.log(self.watchingProps);
                        obj[prop] = handlers[self.watchingProps[prop].handler](prop);
                    }
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
                    if (self.watchingProps.hasOwnProperty(prop)) {
                        self.allProps[prop] = ko.pureComputed(
                            {
                                write: function(value) {
                                    console.log(prop, value);
                                    self.updatePhotosProp(prop, value);
                                },
                                read: function() {
                                    var _state = self.currentState();
                                    var state = _state[_prop] || '';
                                    console.log(state);
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
