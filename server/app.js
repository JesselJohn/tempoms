/**
 * Main application file
 */
'use strict';
if (process.env.NODE_ENV === 'production'|| process.env.NODE_ENV === 'qa') {
    require('newrelic');
}
import express from 'express';
import config from './config/environment';
import http from 'http';

// Connect to MongoDB
/*mongoose.connect(config.mongo.uri, config.mongo.options);
mongoose.connection.on('error', function(err) {
  console.error('MongoDB connection error: ' + err);
  process.exit(-1);
});

// Populate databases with sample data
if (config.seedDB) { require('./config/seed'); }*/

// Setup server
var app = express();
var server = http.createServer(app);
require('./config/express')(app);
require('./routes')(app);


//process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';


// Start server
function startServer() {
    server.listen(config.port, config.ip, function() {
        console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
    });
}

setImmediate(startServer);

// Expose app
exports = module.exports = app;
