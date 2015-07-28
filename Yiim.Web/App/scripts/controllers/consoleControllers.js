(function () {
    var app = angular.module("Yiim.Controllers", []);
    app.controller("navigation", ['$scope', '$location', '$routeParams', 'linkService', "language", function ($scope, $location, $routeParams, linkService, language) {
        $scope.lang = language(true, "navigation");
        $scope.ls = linkService;
        //绑定路由跳转成功，左导航获取和主导航的选中状态
        $scope.$on('$locationChangeSuccess', function (route, url) {
            var v = /#\/([^\/]+)/.exec(url);
            if (!v) return;
            //获取所有与当前主URL匹配的子连接
            angular.forEach(linkService, function (l) {
                l.isActive = false;
                angular.forEach(l.urls, function (u) {
                    u.isActive = url.indexOf(u.link) !== -1;
                    if (u.link.indexOf(v[1]) !== -1) {
                        $scope.urls = l.urls;
                        l.isActive = true;
                    }
                });
            });
        });
    }]);
})()