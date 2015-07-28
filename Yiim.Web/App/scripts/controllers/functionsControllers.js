(function () {
    var app = angular.module("Yiim.Controllers");
    app.controller("functions", ["$scope", "$modal", "funcsService", "utils", "language", function ($scope, $modal, funcsService, utils, language) {
        var service = funcsService.list;
        var lang = language(true, "functions");
        var methods = {
            lang: lang,
            search: function (isPage) {
                if (!isPage) $scope.current = 1;
                service.gets({ name: $scope.Name, current: $scope.current, size: $scope.size }).success(function (data) {
                    $scope.list = data.Data;
                    $scope.total = data.Total;
                });
            },
            edit: function (item) {
                item.org = angular.copy(item);
                item.isModified = true;
            },
            cancel: function (item) {
                if (item.Id == 0) {
                    utils.remove($scope.list, item);
                    return;
                }
                var org = item.org;
                delete item.org;
                angular.extend(item, org);
                item.isModified = false;
            },
            append: function () {
                var has = false;
                angular.forEach($scope.list, function (v) {
                    if (v.Id == 0) {
                        has = true;
                    }
                })
                if (has) return;
                var obj = { "Id": 0, "Name": "", "isModified": true };
                $scope.list.unshift(obj);
            },
            save: function (item) {
                if (!$.trim(item.Name)) {
                    utils.notify(lang.notAllowEmpty, "warning");
                    return;
                }
                if (item.Id == 0) {
                    service.post(item).success(function (data) {
                        if (data.IsCreated) {
                            utils.notify(lang.saveSuccess, "success");
                            item.Id = data.Id;
                            item.isModified = false;
                        }
                    });
                } else {
                    service.put(item).success(function (data) {
                        if (data.IsSaved) {
                            utils.notify(lang.saveSuccess, "success");
                            item.isModified = false;
                        }
                    })
                }
            },
            remove: function (item) {
                var modal = utils.confirm({ msg: lang.confirmDelete, ok: lang.ok, cancel: lang.cancel });
                modal.result.then(function () {
                    service.delete(item.Id).success(function (data) {
                        if (data.IsDeleted) {
                            utils.notify(lang.deleteSuccess, "success");
                            utils.remove($scope.list, item);
                        }
                    })
                })
            },
            size: 10
        }
        angular.extend($scope, methods);
        methods.search();
    }])
})()