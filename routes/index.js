module.exports = function (app) {
    var users = require("../lib/users");
    var utils = require("../lib/utils");
    app.get('/', function (req, res) {
        res.render('index', { title: 'angularjs-example' });
    });
    //Jade view result action 
    app.get('/:dir-:name', function (req, res) {
        res.render(req.params.dir + "/" + req.params.name);
    });

    app.get('/users', function (req, res) {
        var params = utils.format(req.query);
        res.send(users.get(params));
    });
    app.post('/users', function (req, res) {
        res.send([]);
    });
    app.put('/users', function (req, res) {
        res.send([]);
    });
    app.delete('/users', function (req, res) {
        res.send([]);
    });
}