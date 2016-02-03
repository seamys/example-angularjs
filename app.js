var express = require('express');
var bodyParser = require('body-parser');
var nconf = require('nconf');
var winston = require('winston');
var errorhandler = require('errorhandler');

//Create express type of variable app
var app = express();

var configurations = module.exports;
// Logging
var logger = new (winston.Logger)({ transports: [new (winston.transports.Console)({ colorize: true })] });

// load the settings
require('./settings')(app, configurations, express, logger, errorhandler);

// merge nconf overrides with the configuration file.
nconf.argv().env().file({ file: 'local.json' });

// Routes
require('./routes')(app);

logger.info('listening on', nconf.get('port'));

app.listen(process.env.PORT || nconf.get('port'))