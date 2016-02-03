module.exports = function (app) {
    var users = require("../lib/users");
    var utils = require("../lib/utils");

    /**
     * default url render index.html
     */
    app.get('/', function (req, res) {
        res.render('index', { title: 'angularjs-example' });
    });
    /**
     * action result view html
     */
    app.get('/:dir-:name', function (req, res) {
        res.render(req.params.dir + "/" + req.params.name);
    });

    app.get('/users', function (req, res) {
        var params = utils.format(req.query);
        res.send(users.get(params));
    });
    app.get('/users/:id', function (req, res) {
        res.send(users.getById(req.params.id));
    });
    app.post('/users', function (req, res) {
        res.send(users.post(req.body));
    });
    app.put('/users/:id', function (req, res) {
        res.send(users.put(req.body, req.params.id));
    });
    app.delete('/users', function (req, res) {
        res.send(users.delete(req.params.id));
    });

    app.get('/users/:user/roles', function (req, res) {
        res.send(users.roles(req.params.user || 0));
    });
}