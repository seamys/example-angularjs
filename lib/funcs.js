var db = require('../db/db');
module.exports = {
    get: function (params) {
        var result = {};
        var where = function (v) {
            return !!v;
        };
        if (!!params.name) {
            where = (v) => v.Name == params.name;
        }
        result.List = db("funcs").orderBy(['Id'], ['desc']).filter(where);
        result.Total = result.List.length;
        var start = (params.current - 1) * params.size;
        result.List = db._.cloneDeep(result.List.slice(start, start + params.size));
        result.state = 0;
        return result;
    },
    remove: function (id) {
        db('funcs').remove({ Id: id - 0 });
        return { state: 0 }
    },
    put: function (id, body) {
        console.log(arguments);
        var fn = db("funcs").find({ "Id": id - 0 });
        if (fn) {
            fn.Name = body.Name;
        }
        return { state: 0 };
    },
    post: function (body) {
        var key = db("keys").find({ "name": "funcs" });
        key.max = key.max + 1;
        db("funcs").push({ Id: key.max, Name: body.Name });
        return { state: 0 }
    }
}