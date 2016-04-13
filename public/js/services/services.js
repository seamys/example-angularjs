(function () {
    //创建一个 angularjs 服务模块
    var service = angular.module("Yiim.Services");
    //提供导航栏数据,服务
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

    //封装所有Http 请求方法，统一处理服务器错误信息
    service.factory("http", [
        '$http', '$uibModal', 'utils', 'language', function ($http, $uibModal, utils, language) {
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
					 utils.confirm({ msg: "Temporarily disable the delete function. View Code: “/public/js/services/services.js:57 ”", ok: lang.ok });
                    //return methods.call('DELETE', url, data, null);
                }
            }
            return methods;
        }
    ]);

    //公共方法服务
    service.factory("utils", ["$http", '$uibModal', function ($http, $uibModal) {
        var methods = {
            //确认窗口
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
            //飘窗提示窗口
            notify: function (content, type) {
                $.notify(content, { type: type, delay: 1000, z_index: 1000000, placement: { from: 'top', align: 'right' } });
            },
            //从列表中移除指定的项目
            remove: function (list, item, fn) {
                angular.forEach(list, function (i, v) {
                    if (fn ? (fn(i, item)) : (i.$$hashKey === item.$$hashKey)) {
                        list.splice(v, 1);
                        return false;
                    }
                    return true;
                });
            },
            //判断当前项目是否在array 中存在
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
    // 用户 http 访问服务
    service.factory("usersService", ["http", function (http) {
        var methods = {
            list: {
                //分页获取用户列表数据
                "get": function (param) {
                    return http.get("/users/", param);
                },
                //删除一个用户数据
                "delete": function (id) {
                    return http.delete("/users/" + id);
                }
            },
            form: {
                //获取用户的完整信息
                "get": function (id) {
                    return http.get("/users/" + id);
                },
                //修改用户信息
                "put": function (param) {
                    return http.put("/users/" + param.Id, param);
                },
                //添加用户信息
                "post": function (param) {
                    return http.post("/users/", param);
                },
                //修改用户关联角色
                "putRoles": function (id, params) {
                    return http.put("/users/" + id + "/roles", params);
                },
                //删除关联用户角色
                "deleteRole": function (id, roleId) {
                    return http.delete("/users/" + id + "/roles/" + roleId);
                }
            }
        };
        return methods;
    }]);
    // 角色 http 服务
    service.factory("rolesService", ["http", function (http) {
        var methods = {
            list: {
                //分页获取相关用户角色列表
                "get": function (param) {
                    return http.get("/users/" + param.UserId + "/roles");
                },
                //分页获取所有用户角色列表
                "gets": function (param) {
                    return http.get("/roles/", param);
                },
                //添加一个新的角色
                "post": function (param) {
                    return http.post("/roles/", param);
                },
                //修改角色信息
                "put": function (param) {
                    return http.put("/roles/" + param.Id, param);
                },
                //删除角色信息
                "delete": function (id) {
                    return http.delete("/roles/" + id);
                }
            }
        };
        return methods;
    }]);
    //权限功能服务
    service.factory("funcsService", ["http", function (http) {
        var methods = {
            list: {
                //获取所有权限功能
                "get": function (params) {
                    return http.get("/functions/", params);
                },
                //修改权限功能
                "put": function (params) {
                    return http.put("/functions/" + params.Id, params);
                },
                //添加一个权限功能
                "post": function (params) {
                    return http.post("/functions/", params);
                },
                //删除权限功能
                "delete": function (id) {
                    return http.delete("/functions/" + id);
                }
            }
        }
        return methods;
    }])
    //确认弹窗服务
    service.controller("confirmmModal", ['$scope', '$uibModalInstance', 'items', function ($scope, $uibModalInstance, items) {
        var methods = {
            //用户点击确认按钮
            ok: function () {
                $uibModalInstance.close(true);
            },
            //用户点击取消按钮
            cancel: function () {
                $uibModalInstance.dismiss('cancel');
            },
            text: items
        };
        //将方法集合并到$scope中
        $.extend($scope, methods);
    }]);
    //错误提示窗口服务
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