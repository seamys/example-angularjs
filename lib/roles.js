var db = require('../db/db');
module.exports = {
    get: function (ids) {
        return db("roles").chain().filter(function (v) {
            return db._.indexOf(ids, v.Id) >= 0;
        });
    },
    getWithFun: function (ids) {
        var ls = db._.cloneDeep(this.get(ids).value());
        ls.forEach(function (r) {
            r.Functions = db("funcs").filter(v =>  db._.indexOf(r.Functions, v.Id) > 0);
        });
        return ls;
    },
    getList: function (params) {
        var result = {};
        var where = function (v) {
            return !!v;
        };
        if (!!params.name) {
            where = (v) => v.Name == params.name;
        }
        result.List = db("roles").orderBy(['Id'], ['desc']).filter(where);
        result.Total = result.List.length;
        var start = (params.current - 1) * params.size;
        result.List = db._.cloneDeep(result.List.slice(start, start + params.size));
        result.List.forEach(function (r) {
            r.Functions = db("funcs").filter(v =>  db._.indexOf(r.Functions, v.Id) >= 0);
        });
        result.state = 0;
        return result;
    },
    put: function (id, body) {
        var ids = [];
        body.Functions.forEach(function (v) {
            ids.push(v.Id);
        });
        var role = {
            "Id": body.Id,
            "Name": body.Name,
            "Functions": ids
        }
        var val = db("roles").chain().find({ "Id": id }).assign(role).value();
        console.log(val);
        return { state: 0 };
    },
    remove: function (id) {

    }
}