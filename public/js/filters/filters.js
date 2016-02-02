'use strict';
(function () {
    var app = angular.module("Yiim.Filters", []);
    app.filter("merge", function () {
        return function (ls, key, n, omit) {
            var a = [];
            angular.forEach(ls, function (v, i) {
                if (n && n <= i) return false;
                a.push(v[key]);
            })
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
            switch (obj) {
                case 1:
                    return "激活";
                case 2:
                    return "锁定";
                case 3:
                    return "废弃";
                default:
                    return "未知状态";
            }
        }
    })
})();