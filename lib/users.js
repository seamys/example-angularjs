/*
 * angularjs-example
 * https://github.com/seamys/angularjs-example
 *
 * Copyright (c) 2016 seamys
 * Licensed under the MIT license.
 */
var db = require('../db/db');
var roles = require('../lib/roles');
module.exports = {
    get: function (params) {
        var result = {};
        var where = function (v) {
            return !!v;
        };
        if (!!params.name) {
            switch (params.type) {
                case 1:
                    where = (v) => v.Name == params.name;
                    break;
                case 2:
                    where = (v) => v.Email == params.name;
                    break;
            }
        }
        result.List = db("users").orderBy(['Id'], ['desc']).filter(where);
        result.Total = result.List.length;
        var start = (params.current - 1) * params.size;
        result.List = db._.cloneDeep(result.List.slice(start, start + params.size));
        result.List.forEach(function (val) {
            val.Roles = roles.get(val.Roles);
        });
        result.state = 0;
        return result;
    },
    getById: function (id) {
        return db("users").find(x => x.Id == id);
    },
    remove: function (id) {
        db('users').remove({ Id: id - 0 });
        return { state: 0 }
    },
    put: function (body, id) {
        db("users").chain().find(x => x.Id == id).assign(body);
        return { state: 0 };
    },
    roles: function (id) {
        var user = this.getById(id);
        if (user) {
            return roles.getWithFun(user.Roles);
        } else {
            return [];
        }
    },
    check: function (name, email) {
        return db("users").find(v=>v.Name == name || v.Email == email);
    },
    post: function (body) {
        if (this.check(body.Name, body.Email)) {
            return { state: 2 }
        }
        var keys = db("keys").find({ "name": "users" });
        keys.max++;
        var user = {
            "Id": keys.max,
            "Name": body.Name,
            "CreateTime": new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
            "Email": body.Email,
            "Password": "",
            "RealName": body.RealName,
            "State": body.State,
            "Roles": []
        }
        db("users").push(user);
        return { state: 0 };
    },
    putRoles: function (id, roles) {
        var user = this.getById(id);
        user.Roles = roles;
        return { state: 0 };
    },
    deleteRoles: function (param) {
        var user = this.getById(param.user);
        param.role = param.role - 0;
        if (user) {
            var ls = [];
            user.Roles.forEach(function (v) {
                if (v !== param.role) {
                    ls.push(v);
                }
            });
            user.Roles = ls;
        }
        return { state: 0 }
    }
}