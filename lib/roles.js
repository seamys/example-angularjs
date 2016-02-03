var db = require('../db/db');
module.exports = {
    get: function (ids) {
        return db("roles").chain().filter(function (v) {
            return db._.indexOf(ids, v.Id) > 0;
        });
    },
    getWithFun: function (ids) {
        var ls = db._.cloneDeep(this.get(ids).value());
        ls.forEach(function (r) {
            r.Functions = db("func").filter(v =>  db._.indexOf(r.Functions, v.Id) > 0);
        });
        return ls;
    }
}