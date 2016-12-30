'use strict';

var environment = require('../../config/environment');
var Order = require('../service');
var ConsignmentCtrl = require('../returnconsignment/returnconsignment.controller.js');
var q = require('q');
var _ = require('lodash');
var newOption = function(options) {
        this.host = options.host;
        this.port = options.port;
        this.headers = options.headers;
        this.method = options.method;
    };

var get = function(req, res) {

    var queryObject = req.query;

    if (!req.headers.isadmin) {
        queryObject.ffCenterId = req.headers.storeid;
    }

    
    var searchQuery = '';

    for (var query in queryObject) {
        searchQuery = searchQuery + query + '=' + queryObject[query] + '&';
    };


    searchQuery = searchQuery.substring(0, searchQuery.length - 1);

    var options = {};

    _.extend(options , environment.optimusPrime.options);

    options.headers = {
        'Authorization': req.headers.authorization
    };

    options.method = "GET";

    var baseOption = {}; // For passing to Consignment Get As It will not have request body..

    _.extend(baseOption , options);

    options.path = environment.optimusPrime.domainName + '/returnConsignments/search?' +
        searchQuery;


    Order.getData(options)
        .then(function(response) {

            var allConsignents = {};

            response = JSON.parse(response);

            // all  Consignment 
            allConsignents = response.content;

            var defered = q.defer();
            var promises = [];
            var returnOrderArray = [];

            for (var consignment in allConsignents) {

                promises.push(ConsignmentCtrl.get(allConsignents[consignment], new newOption(baseOption)));

            };

            q.all(promises).then(function(responseQ) {
                for (var i = 0; i < responseQ.length; i++) {
                    returnOrderArray.push(responseQ[i]);
                };
                response.consignment = returnOrderArray;


                res.status(200).send(response);
                // do things after your inner functions run 
            });

        }, function(err) {
            res.status(205).send(err);
        });
};

var getwarehouse = function(req, res) {

    var queryObject = req.query;

    if (!req.headers.isadmin) {
        queryObject.ffCenterId = req.headers.storeid;
    };

    
    var searchQuery = '';

    for (var query in queryObject) {
        searchQuery = searchQuery + query + '=' + queryObject[query] + '&';
    };


    searchQuery = searchQuery.substring(0, searchQuery.length - 1);

    var options = {};

    _.extend(options , environment.optimusPrime.options);


    options.headers = {
        'Authorization': req.headers.authorization
    };

    options.method = "GET";

    var baseOption = {}; // For passing to Consignment Get As It will not have request body..
    
    _.extend(baseOption,options);

    options.path = environment.optimusPrime.domainName + '/returnConsignments/search?' +
        searchQuery;
    Order.getData(options)
        .then(function(response) {

            var allConsignents = {};

            response = JSON.parse(response);

            // all  Consignment 
            allConsignents = response.content;

            var defered = q.defer();
            var promises = [];
            var returnOrderArray = [];

            for (var consignment in allConsignents) {

                promises.push(ConsignmentCtrl.get(allConsignents[consignment], new newOption(baseOption)));

            };

            q.all(promises).then(function(responseQ) {
                for (var i = 0; i < responseQ.length; i++) {
                    returnOrderArray.push(responseQ[i]);
                };
                response.consignment = returnOrderArray;


                res.status(200).send(response);
                // do things after your inner functions run 
            });

        }, function(err) {
            res.status(205).send(err);
        });
};

var getDetails = function(req, res) {

    var options = {};
    
    _.extend(options , environment.optimusPrime.options);

    options.headers = {
        'Authorization': req.headers.authorization
    };

    options.method = "GET";


    var baseOption = {};


    _.extend(baseOption, options);


    options.path = environment.optimusPrime.domainName + '/returnConsignment/' +
        req.params.consignmentID;

    Order.getData(options)
        .then(function(response) {

            var allreturnorder = {};

            response = JSON.parse(response);
            
            allreturnorder = response.returnIds;

            var defered = q.defer();
            var promises = [];
            var returnOrderArray = [];

            for (var i in allreturnorder) {

                promises.push(ConsignmentCtrl.getProcessed(allreturnorder[i], new newOption(baseOption)));

            };

            q.all(promises).then(function(responseQ) {
                for (var i = 0; i < responseQ.length; i++) {
                    returnOrderArray.push(responseQ[i]);
                };
                res.status(200).send(returnOrderArray);
                // do things after your inner functions run 
            });

        }, function(err) {
            res.status(205).send(err);
        });

};


exports.get = get;
exports.getwarehouse = getwarehouse;
exports.getDetails = getDetails;
