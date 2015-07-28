'use strict';
(function () {
    var app = angular.module("Yiim.Directives", []);
    app.directive('mCheck', [function () {
        return {
            restrict: 'A',
            replace: false,
            link: function (scope, iElement) {
                var all = "thead input[type='checkbox']";
                var item = "tbody input[type='checkbox']";
                iElement.on("change", all, function () {
                    var o = $(this).prop("checked");
                    var tds = iElement.find(item);
                    tds.each(function (i, check) {
                        $(check).prop("checked", o);
                    });
                });
                iElement.on("change", item, function () {
                    var o = $(this).prop("checked");
                    var isChecked = true;
                    if (o) {
                        iElement.find(item).each(function () {
                            if (!$(this).prop("checked")) {
                                isChecked = false;
                                return false;
                            }
                            return true;
                        });
                    }
                    iElement.find(all).prop("checked", o && isChecked);
                });
            }
        };
    }]);
})();