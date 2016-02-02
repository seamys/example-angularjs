var low = require('lowdb');
var storage = require('lowdb/file-sync');
module.exports = low(__dirname + '/db.json', { storage });

