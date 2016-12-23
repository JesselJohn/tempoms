/**
 * Main application routes
 */

'use strict';

import errors from './components/errors';
import path from 'path';

var Account = require('./api/account/account.controller.js');

var KeyCloakService = require('./keycloak/keycloack.utils.js');

var q = require('q');



module.exports = function(app) {

    app.use(function(req, res, next) {
        if (req.headers.origin) {
            res.header("Access-Control-Allow-Origin", req.headers.origin);
            res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Auth-Token,X-Access-Token,X-Key');
        }
        next();
    });


    var autheniticate = function(req, res, next) {

        var promises = [];


        if (req.headers.isadmin === 'true') {

            req.headers.isadmin = true;

            promises.push(Account.fetchAccount(req)); // Account Call for authentication

        } else {
            req.headers.isadmin = false;
            promises.push(Account.fetchAccount(req)); // Account Call for authentication N storeID

        };

        q.all(promises).then(function(response) {

            req.headers.storeid = response[0].storeID;

            KeyCloakService.fetchNodeAccessToken()
                .then(function(token) {

                    // Got token pass it .....
                    req.headers.authorization = token;
                    next();
                }, function(error) {
                    console.log("Errors while fetching acccess token:---->");
                    console.log(error);
                    res.status(400).send(error);
                    // Fetch Again error in fetching token
                });

        }, function(error) {
             
              res.status(error.status).send(error);


        });

    };

    // Insert routes below
    app.use('/api/order', autheniticate, require('./api/order'));




    app.use('/api/package', autheniticate, require('./api/pakage'));


    app.use('/api/consignment', autheniticate, require('./api/consignment'));


    app.use('/api/item', autheniticate, require('./api/item'));

    app.use('/api/orderline', autheniticate, require('./api/orderline'));

    app.use('/api/reason', autheniticate, require('./api/reason'));

    app.use('/api/consolidation', autheniticate, require('./api/consolidation'));


    app.use('/api/consolidationmm', autheniticate, require('./api/consolidationMM'));


    app.use('/api/qualitycheck', autheniticate, require('./api/qualitycheck'));


    app.use('/api/qualitycheckmm', autheniticate, require('./api/qualitycheckMM'));


    app.use('/api/failorders', autheniticate, require('./api/failorders'));

    app.use('/api/upload', autheniticate, require('./api/upload'));


    app.use('/api/sappickfail', autheniticate, require('./api/sappickfail'));
    

    

    app.use('/api/pickfailorderdetail', autheniticate, require('./api/pickfailorderdetail'));
    
    app.use('/api/qcfailorder', autheniticate, require('./api/qcfailorder'));

    
    app.use('/api/delayedorder', autheniticate, require('./api/delayedorder'));



    app.use('/api/slot', autheniticate, require('./api/slot'));


    app.use('/api/status', autheniticate, require('./api/status'));

    app.use('/api/account', require('./api/account'));
    
    app.use('/api/statuscount', autheniticate, require('./api/statuscount'));

    app.use('/api/customerdetail', autheniticate, require('./api/customerdetail'));


    app.use('/api/returnorderWH', autheniticate, require('./api/returnorderWH'));

    app.use('/api/refund', autheniticate, require('./api/refund'));


    app.use('/api/returnconsignmentlist', autheniticate, require('./api/returnconsignmentlist'));

    // Return Store page following two path
    app.use('/api/returnorder', autheniticate, require('./api/returnorder'));

    app.use('/api/returnorderdetail', autheniticate, require('./api/returnorderdetail'));
    // Insert routes below


    app.use('/api/things', autheniticate, require('./api/thing'));
    // All undefined asset or api routes should return a 404
    app.route('/:url(api|auth|components|app|bower_components|assets)/*')
        .get(errors[404]);

    // All other routes should redirect to the index.html
    app.route('/*')
        .get(function(req, res) {
            res.sendFile(path.resolve(app.get('appPath') + '/index.html'));
        });
};
