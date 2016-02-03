module.exports = function (app, configurations, express, logger, errorhandler) {

    var nconf = require('nconf');
    var cachify = require('connect-cachify');
    var requestLogger = require('winston-request-logger');
    var bodyParser = require('body-parser');

    nconf.argv().env().file({ file: 'local.json' });

    // load assets node from configuration file.
    var assets = nconf.get('assets') || {}

    var env = process.env.NODE_ENV || 'development';
    if ('development' == env) {
        // register the request logger
        app.use(requestLogger.create(logger));
        app.set('DEBUG', true);
        app.use(errorhandler({ dumpExceptions: true, showStack: true }));
    }
    else if ('production' == env) {
        app.set('DEBUG', false);
        app.use(errorhandler());
    }
    // Cachify Asset Configuration
    app.use(cachify.setup(assets, { root: __dirname + '/public', production: nconf.get('cachify') }));
    app.use(bodyParser.json());
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.locals.pretty = true;
    app.use(express.static(__dirname + '/public'));
    return app;
}