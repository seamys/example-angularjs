(function () {
    var app = angular.module("Yiim.Controllers");
    app.controller("users", ['$scope', 'usersService', '$uibModal', 'language', 'utils', function ($scope, usersService, $uibModal, language, utils) {
        var service = usersService.list;
        var lang = language(true, "userList");
        var methods = {
            lang: lang,
            search: function (isPage) {
                $scope.loadingState = true;
                if (!isPage) $scope.current = 1;
                service.get({ name: $scope.Name, current: $scope.current, size: $scope.size, type: $scope.type }).success(function (data) {
                    $scope.list = data.List;
                    $scope.total = data.Total;
                    $scope.loadingState = false;
                });
            },
            edit: function (item) {
                item.isModified = true;
                item.org = angular.copy(item);
            },
            save: function (item) {
                if ($.trim(item.Name) || $.trim(item.Email)) {
                    return;
                }
                delete item.org;
                if (item.Id > 0) {
                    service.put(item).success(function (data) {
                        if (data.state == 0) {
                            utils.notify("保存成功！", "success");
                            item.isModified = false;
                        }
                    });
                }
                else {
                    methods.setPassword(item, function () {
                        service.post(item).success(function (data) {
                            if (data.state == 0) {
                                utils.notify("创建成功！", "success");
                                item.isModified = false;
                                item.Id = data.Id;
                            }

                        });
                    });
                }
            },
            cancel: function (item) {
                if (item.Id > 0) {
                    var v = item.org;
                    delete item.org;
                    angular.extend(item, v);
                }
                else {
                    utils.remove($scope.list, item);
                }
            },
            setPassword: function (item, call) {
                var set = function () {
                    service.pwdPut(item).success(function (data) {
                        if (data.isSaved) {
                            utils.notify("重置密码成功！", "success");
                        }
                    });
                }
                var model = $uibModal.open({
                    templateUrl: 'authority-setPassword',
                    backdrop: "static",
                    controller: "setPassword",
                    resolve: {
                        params: function () {
                            return item;
                        }
                    }
                });
                model.result.then(call || set);
            },
            viewRoles: function (item) {
                if (item.Id <= 0) {
                    utils.confirm({ msg: "保存当前用户后，关联角色", ok: "确定" });
                    return;
                }
                $uibModal.open({
                    templateUrl: 'roles-viewRoles',
                    controller: "viewRoles",
                    resolve: {
                        params: function () {
                            return item;
                        }
                    }
                });
            },
            remove: function (item) {
                var model = utils.confirm({ msg: lang.deleteUser, ok: lang.ok, cancel: lang.cancel });
                model.result.then(function () {
                    service.delete(item.Id).success(function (data) {
                        if (data.state == 0) {
                            utils.notify(lang.deleteSuccess, "success");
                            utils.remove($scope.list, item);
                        }
                    });
                });
            },
            size: 10
        };
        angular.extend($scope, methods);
        methods.search();
    }]);
    app.controller("usersForm", [
        '$scope', "language", "usersService", "rolesService", "$routeParams", "utils", "$uibModal", function ($scope, language, usersService, rolesService, $routeParams, utils, $uibModal) {
            var service = usersService.form;
            var lang = language(true, "userForm");
            var org;
            var methods = {
                lang: lang,
                isModified: !!$routeParams.id,
                checkRules: function () {
                    if (!$scope.model.Roles) {
                        rolesService.list.get({ UserId: $scope.model.Id }).success(function (data) {
                            $scope.model.Roles = data;
                        });
                    }
                },
                save: function () {
                    var model = $scope.model;
                    if (angular.equals(org, $scope.model)) {
                        return utils.confirm({ msg: lang.formNotModified, ok: lang.ok });
                    }
                    if (!$.trim(model.Name) || !$.trim(model.RealName) || !$.trim(model.Email)) return;
                    if (model.Id > 0) {
                        service.put(model).success(function (data) {
                            if (data.state == 0) {
                                utils.notify(lang.saveSuccess, "success");
                                org = angular.copy(model);
                                return;
                            } else {
                                utils.notify("保存失败!", "warning");
                            }
                        });
                    } else {
                        service.post(model).success(function (data) {
                            if (data.state == 0) {
                                utils.notify(lang.saveSuccess, "success");
                                $scope.model.Id = data.Id;
                                org = angular.copy(model);
                                return;
                            } else {
                                utils.notify("保存失败!", "warning");
                            }
                        });
                    }
                },
                append: function () {
                    var modal = $uibModal.open({
                        templateUrl: 'users-chooseRoles ',
                        backdrop: "static",
                        controller: "chooseRoles",
                        size: "lg",
                        resolve: {
                            params: function () {
                                return $scope.model;
                            }
                        }
                    });
                    modal.result.then(function () {
                        var roles = $scope.model.Roles || [];
                        var ls = [];
                        roles.forEach(function (v) {
                            ls.push(v.Id);
                        });
                        usersService.form.putRoles($scope.model.Id, ls).success(function (data) {
                            if (data.state == 0) {
                                methods.checkRules();
                            }
                        });
                    });
                },
                model: {},
                remove: function (item) {
                    var modal = utils.confirm({ msg: lang.confirmDelete, ok: lang.ok, cancel: lang.cancel });
                    modal.result.then(function () {
                        service.deleteRole($scope.model.Id, item.Id).success(function (data) {
                            if (data.state == 0) {
                                utils.notify(lang.deleteSuccess, "success");
                                utils.remove($scope.model.Roles, item);
                            }
                        });
                    });
                }
            }
            if (methods.isModified) {
                service.get($routeParams.id).success(function (data) {
                    data.Roles = null;
                    org = data;
                    $scope.model = angular.copy(org);
                });
                methods.title = methods.lang.modifiedTitle;
            } else {
                methods.title = methods.lang.createTitle;
            }
            angular.extend($scope, methods);
        }
    ]);
    app.controller("viewRoles", ['$scope', "language", "rolesService", "$uibModalInstance", "params", function ($scope, language, rolesService, $uibModalInstance, params) {
        var service = rolesService.list;
        var lang = language(true, "userForm");
        var roles = [];
        var methods = {
            lang: lang,
            search: function () {
                var start = (($scope.current || 1) - 1) * $scope.size;
                $scope.list = roles.slice(start, start + $scope.size);
            },
            init: function () {
                service.get({ UserId: params.Id }).success(function (data) {
                    roles = data;
                    $scope.total = data.length;
                    methods.search();
                });
            },
            ok: function () {
                $uibModalInstance.close(true);
            },
            cancel: function () {
                $uibModalInstance.dismiss('cancel');
            },
            size: 10
        }
        methods.init();
        angular.extend($scope, methods);
    }]);
    app.controller("chooseRoles", ['$scope', "language", "rolesService", "usersService", "$uibModalInstance", "params", "utils", function ($scope, language, rolesService, usersService, $uibModalInstance, params, utils) {
        var service = rolesService.list;
        var org = angular.copy(params.Roles || []);
        var lang = language(true, "userForm");
        var methods = {
            lang: lang,
            search: function () {
                service.gets({ current: $scope.current, size: $scope.size }).success(function (data) {
                    angular.forEach(data.List, function (l) {
                        angular.forEach(org, function (v) {
                            if (l.Id == v.Id) {
                                l.isChecked = true;
                            }
                        });
                    });
                    $scope.roles = data.List;
                    $scope.total = data.Total;
                });
            },
            ok: function () {
                params.Roles = org;
                $uibModalInstance.close(true);

            },
            cancel: function () {
                $uibModalInstance.dismiss('cancel');
            },
            checked: function (item) {
                item.isChecked = !item.isChecked;
                if (!item.isChecked) {
                    utils.remove(org, item, function (i, v) {
                        return i.Id == v.Id;
                    });
                } else {
                    org.push(item);
                }
            },
            size: 10
        }
        methods.search();
        angular.extend($scope, methods);
    }
    ]);
})()