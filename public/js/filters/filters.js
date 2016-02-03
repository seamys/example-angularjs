'use strict';
(function () {
    var app = angular.module("Yiim.Filters", []);
    app.filter("merge", function () {
        return function (ls, key, n, omit) {
            var a = [];
            ls = ls || [];
            angular.forEach(ls, function (v, i) {
                if (n && n <= i) return false;
                a.push(v[key]);
            });
            if (n && ls.length > n)
                return a.join(',') + (omit || '');
            return a.join(',');
        }
    });
    app.filter("none", function () {
        return function (obj, content) {
            if (obj == null || obj == '') {
                return content;
            }
            return obj;
        }
    });
    app.filter("state", function () {
        return function (obj) {
            obj = obj - 0;
            switch (obj) {
                case 0:
                case 1:
                    return "废弃";
                case 2:
                    return "激活";
                case 3:
                    return "锁定";
                default:
                    return "未知状态";
            }
        }
    });
})();