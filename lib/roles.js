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
        var val = db("roles").find({ "Id": id - 0 });
        val.Name = body.Name;
        val.Functions = ids;
        return { state: 0 };
    },
    post: function (body) {
        var key = db("keys").find({ "name": "roles" });
        key.max++;
        var ids = [];
        body.Functions.forEach(function (v) {
            ids.push(v.Id);
        });
        db("roles").push({ Id: key.max, Functions: ids, Name: body.Name });
        return { state: 0, id: key.max };

    },
    remove: function (id) {
        db("roles").remove({ "Id": id - 0 });
        return { state: 0 };
    }
}