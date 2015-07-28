'use strict';
(function () {
    var app = angular.module("Yiim", ['ngRoute', "ui.bootstrap", "Yiim.Controllers", "Yiim.Services", "Yiim.Filters", "Yiim.Directives"]);
    app.config(['$routeProvider', function ($routeProvider) {
        //路由配置
        var route = $routeProvider;
        route.when("/users/list", { controller: 'users', templateUrl: '/users-list' });
        route.when("/users/form/", { controller: 'usersForm', templateUrl: '/users-form' });
        route.when("/users/form/:id", { controller: 'usersForm', templateUrl: '/users-form' });
        route.when("/roles/list", { controller: 'roles', templateUrl: '/roles-list' });
        route.when("/functions/list", { controller: 'functions', templateUrl: '/functions-list' });
        route.when("/", { redirectTo: '/users/list' });
        route.otherwise({ templateUrl: '/utils-404' });
    }
    ]);
})();
