'use strict';

define(
    ['knockout', 'jquery', 'select2'],
    function(ko, jquery) {
        var select2 = {
            init: function(element, valueAccessor, allBindingsAccessor) {
                var obj = valueAccessor(),
                    allBindings = allBindingsAccessor(),
                    lookupKey = allBindings.lookupKey;
                jquery(element).select2({});

                if (lookupKey) {
                    var value = ko.utils.unwrapObservable(allBindings.value);
                    jquery(element).select2('data', ko.utils.arrayFirst(obj.data.results, function(item) {
                        return item[lookupKey] === value;
                    }));
                }

                ko.utils.domNodeDisposal.addDisposeCallback(element, function() {
                    jquery(element).select2('destroy');
                });
            },
            update: function (element, valueAccessor) {
                jquery(element).on('change', function () {
                    var id = jquery(this).val();
                    jquery(this).select2().select2('val', id);
                    var valAccesor = valueAccessor();
                    if (valAccesor && id && id > 0) {
                        valueAccessor(id);
                    }
                });
            }
        };

        return select2;
    }
);
