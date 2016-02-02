'use strict';
(function () {
    var service = angular.module('Yiim.Services', []);
    var lang = {};
    lang["server"] = {
        USER_NAME_HAS_EXIST: "已经包含相同的用户名！",
        USER_NOT_EXIST: "用户不存在",
        ROLE_NAME_HAS_EXIST: "已经包含相同的角色名称！",
        ROLE_NOT_EXIST: "角色已经不存在",
        FUNC_NAME_HAS_EXIST: "权限包含相同的名称"
    }
    lang["base"] = {
        search: "搜索", view: "查看详细", ok: "确定", cancel: "取消",
        edit: "编辑", save: "保存", remove: "删除", operate: "操作",
        create: "添加", choose: "选择", all: "所有相关", emptyName: "名称不能为空",
        saveSuccess: "保存信息成功", formNotModified: "表单没有任何需要保存修改项目",
        confirmDelete: "是否需要删除当前项目", deleteSuccess: "删除成功！"
    }
    lang["userList"] = {
        deleteUser: "删除用户不可恢复，是否删除当前用户？",
        deleteSuccess: "删除用户成功！"
    }
    lang["userForm"] = {
        baseInfo: "基本信息", linkInfo: "关联信息", chooseRules: "选择角色",
        userName: "用户名", realName: "真实姓名", passWord: "密码", conform: "确认密码",
        email: "邮箱", abandon: "废弃", active: "激活", lock: "锁住", state: "状态",
        modifiedTitle: "修改用户信息", createTitle: "添加用户信息", viewRoles: "查看拥有角色", roleName: "角色名称", func: "权限"
    }
    lang["rolesList"] = {
        title: "角色管理", append: "添加角色", none: "为关联权限", name: "角色", func: "权限",
        notAllowEmpty: "角色名称不允许为空！", confirmDelete: "确定删除当前角色吗？", deleteSuccess: "删除当前角色成功！"
    }
    lang["roleChoose"] = {
        title: "选择权限", chooseFuncs: "选择权限", name: "权限"
    }
    lang["functions"] = {
        title: "权限管理", name: "权限", append: "添加权限", confirmDelete: "确定删除当前权限吗？", deleteSuccess: "删除权限成功！"
    }
    lang["navigation"] = { exit: "退出系统" }
    service.factory("language", [function () {
        var fn = function () {
            var ls = {};
            //添加通用消息
            if (arguments[0] === true) angular.extend(ls, lang.base, lang.server);
            //合并字符
            angular.forEach(arguments, function (v) {
                if (typeof v == "string" && lang[v]) angular.extend(ls, lang[v]);
            });
            return ls;
        };
        return fn;
    }]);
})();