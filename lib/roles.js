var db = require('../db/db');
module.exports = {
    get: function (ids) {
        return db("roles").chain().filter(function (v) {
            return db._.indexOf(ids, v.Id) > 0;
        });
    }
}