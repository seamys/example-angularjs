(function () {
    //创建一个 angularjs 服务模块
    var service = angular.module("Yiim.Services");
    service.factory("linkService", [function () {
        var links = [];
        links.push({
            name: '用户管理', urls: [
                { link: '/users/list', title: '用户管理' },
                { link: '/users/form', title: "添加用户" },
            ]
        });
        links.push({
            name: '权限管理', urls: [
                 { link: '/roles/list', title: "角色管理" },
                 { link: '/functions/list', title: "功能管理" }
            ]
        });
        return links;
    }]);
    service.factory("http", ['$http', '$uibModal', 'utils', 'language', function ($http, $uibModal, utils, language) {
        var lang = language(true);
        var methods = {
            'call': function (type, url, params, data) {
                return $http({ method: type, url: url, params: params, data: data }).success(methods.success).error(methods.errorModal);
            },
            'success': function (data) {
                if (data.Message)
                    utils.confirm({ msg: lang[data.Message], ok: lang.ok });
                return data;
            },
            'errorModal': function (data) {
                $uibModal.open({
                    templateUrl: 'utils-errorModal ',
                    backdrop: "static",
                    controller: "errorModal",
                    resolve: {
                        error: function () {
                            return data;
                        }
                    }
                });
            },
            'get': function (url, params) {
                return methods.call('GET', url, params);
            },
            'put': function (url, data) {
                return methods.call('PUT', url, null, data);
            },
            'post': function (url, data) {
                return methods.call('POST', url, null, data);
            },
            'delete': function (url, data) {
                return methods.call('DELETE', url, data, null);
            }
        }
        return methods;
    }])
    service.factory("utils", ["$http", '$uibModal', function ($http, $uibModal) {
        var methods = {
            confirm: function (text) {
                return $uibModal.open({
                    templateUrl: 'utils-confirmModal ',
                    backdrop: "static",
                    controller: "confirmmModal",
                    resolve: {
                        items: function () {
                            return text;
                        }
                    }
                });
            },
            notify: function (content, type) {
                $.notify(content, { type: type, delay: 1000, z_index: 1000000, placement: { from: 'top', align: 'right' } });
            },
            remove: function (list, item, fn) {
                angular.forEach(list, function (i, v) {
                    if (fn ? (fn(i, item)) : (i.$$hashKey === item.$$hashKey)) {
                        list.splice(v, 1);
                        return false;
                    }
                    return true;
                });
            },
            inArray: function (val, array, fn) {
                var has = false;
                angular.forEach(array, function (v) {
                    if (fn && fn(val, v) || val === v) {
                        has = true;
                        return false;
                    }
                    return true;
                });
                return has;
            }
        }
        return methods;
    }]);
    service.factory("usersService", ["http", function (http) {
        var methods = {
            list: {
                "get": function (param) {
                    return http.get("/users/", param);
                },
                "delete": function (id) {
                    return http.delete("/users/" + id);
                }
            },
            form: {
                "get": function (param) {
                    return http.get("/users/", param);
                },
                "put": function (param) {
                    return http.put("/users/", param);
                },
                "post": function (param) {
                    return http.post("/users/", param);
                },
                "putRoles": function (params) {
                    return http.put("/users/", params)
                },
                "deleteRole": function (id, roleId) {
                    return http.delete("/users/", { id: id, roleId: roleId });
                }
            }
        };
        return methods;
    }]);
    service.factory("rolesService", ["http", function (http) {
        var methods = {
            list: {
                "gets": function (param) {
                    return http.get("/roles/", param);
                },
                "post": function (param) {
                    return http.post("/roles/", param);
                },
                "put": function (param) {
                    return http.put("/roles/", param);
                },
                "delete": function (id) {
                    return http.delete("/roles/" + id);
                }
            }
        };
        return methods;
    }]);
    service.factory("funcsService", ["http", function (http) {
        var methods = {
            list: {
                "gets": function (params) {
                    return http.get("/functions/", params);
                },
                "put": function (params) {
                    return http.put("/functions/", params);
                },
                "post": function (params) {
                    return http.post("/functions/", params);
                },
                "delete": function (id) {
                    return http.delete("/functions/" + id);
                }
            }
        }
        return methods;
    }])
    service.controller("confirmmModal", ['$scope', '$uibModalInstance', 'items', function ($scope, $uibModalInstance, items) {
        var methods = {
            ok: function () {
                $uibModalInstance.close(true);
            },
            cancel: function () {
                $uibModalInstance.dismiss('cancel');
            },
            text: items
        };
        $.extend($scope, methods);
    }]);
    service.controller("errorModal", ['$scope', '$uibModalInstance', 'error', function ($scope, $uibModalInstance, error) {
        var methods = {
            cancel: function () {
                $uibModalInstance.dismiss('cancel');
            },
            report: function () {
                $uibModalInstance.close(true);
            }
        }
        angular.extend($scope, methods, error);
    }]);
})()