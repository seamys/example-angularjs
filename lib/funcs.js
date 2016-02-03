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
    }
}