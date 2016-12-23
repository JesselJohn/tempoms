'use strict';

var _ = require('lodash');

var environment = require('../../config/environment');
var Order = require('../service');
var ConsignmentCtrl = require('../consignment/consignment.controller.js');
var q = require('q');
var ConsignmentService = require('../service');

var newOption = function(options) {
        this.host = options.host;
        this.port = options.port;
        this.headers = options.headers;
        this.method = options.method;
    };
var get = function(req, res) {

    var storeID = '1230';

    if (!req.headers.isadmin) {
        storeID = req.headers.storeid;
    };


    var queryObject = req.query;

    var searchQuery = '';

    for (var query in queryObject) {
        searchQuery = searchQuery + query + '=' + encodeURIComponent(queryObject[query]) + '&';
    };

    searchQuery = searchQuery.substring(0, searchQuery.length - 1);

    var options = {};

    _.extend(options , environment.optimusPrime.options);
    
    options.headers = {
        'Authorization': req.headers.authorization
    };



    options.method = "GET";

    var baseOption = {}; // For passing to Consignment Get As It will not have request body..


    _.extend(baseOption, options);


    options.path = environment.optimusPrime.domainName + '/consignment/' + storeID +
        '/qcFailed?' + searchQuery; // qc fail for pick fail

    Order.getData(options)
        .then(function(response) {

            var allConsignents = {};

            response = JSON.parse(response);

            allConsignents = response.content;

            var defered = q.defer();
            var promises = [];
            var returnOrderArray = [];

            for (var consignment in allConsignents) {

                promises.push(ConsignmentCtrl.get(allConsignents[consignment], new newOption(baseOption)));

            };

            q.all(promises).then(function(responseQ) {
                for (var i = 0; i < responseQ.length; i++) {
                    if (!(_.isEmpty(responseQ[i])))
                        returnOrderArray.push(responseQ[i]);
                };
                response.consignment = returnOrderArray;

                res.status(200).send(response);
                // do things after your inner functions run 
            }, function(error) {
                res.status(205).send(error);
            });

        }, function(err) {
            res.status(err.status).send(err);
        });

};




exports.get = get;
