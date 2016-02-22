module.exports = function (app) {
    var users = require("../lib/users");
    var utils = require("../lib/utils");
    var roles = require('../lib/roles');
    var funcs = require('../lib/funcs');
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
    //get all user info by pageation
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
        var body = req.body;
        var param = {
            State: body.State - 0,
            RealName: body.RealName,
            Email: body.Email,
            Name: body.Name
        }
        res.send(users.put(param, req.params.id));
    });
    app.delete('/users/:id', function (req, res) {
        res.send(users.remove(req.params.id));
    });
    app.get('/users/:user/roles', function (req, res) {
        res.send(users.roles(req.params.user || 0));
    });
    app.put('/users/:user/roles', function (req, res) {
        res.send(users.putRoles(req.params.user || 0, req.body));
    });
    app.delete('/users/:user/roles/:role', function (req, res) {
        res.send(users.deleteRoles(req.params));
    });
    app.get('/roles/', function (req, res) {
        var params = utils.format(req.query);
        res.send(roles.getList(params));
    });
    app.post('/roles/', function (req, res) {
        res.send(roles.post(req.body));
    })
    app.put('/roles/:id', function (req, res) {
        res.send(roles.put(req.params.id, req.body));
    });
    app.delete('/roles/:id', function (req, res) {
        res.send(roles.remove(req.params.id));
    });
    app.get('/functions/', function (req, res) {
        var params = utils.format(req.query);
        res.send(funcs.get(params));
    });
    app.put('/functions/:id', function (req, res) {
        res.send(funcs.put(req.params.id, req.body));
    });
    app.delete('/functions/:id', function (req, res) {
        res.send(funcs.remove(req.params.id));
    });
}