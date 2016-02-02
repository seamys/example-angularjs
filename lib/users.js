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
                    where = function (v) {
                        return v.Name == params.name;
                    }
                    break;
                case 2:
                    where = function (v) {
                        return v.Email = params.name;
                    }
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
        return result;
    }
}