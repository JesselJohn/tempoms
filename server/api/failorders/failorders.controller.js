'use strict';

var _ = require('lodash');

var environment = require('../../config/environment');
var Order = require('../service');
var ConsignmentCtrl = require('../consignment/consignment.controller.js');
var q = require('q');
var ConsignmentService = require('../service');


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


    var selectedReason = "";
    if (queryObject.hasOwnProperty('reason')) {
        selectedReason = queryObject.reason;
    } else {
        selectedReason = "";
    }

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
        '/rejected?' + searchQuery;

    Order.getData(options)
        .then(function(response) {

            var allConsignents = {};

            response = JSON.parse(response);

            allConsignents = response.content;

            var defered = q.defer();
            var promises = [];
            var returnOrderArray = [];

            for (var consignment in allConsignents) {

                promises.push(ConsignmentCtrl.getForFailOrder(allConsignents[consignment], baseOption, storeID,selectedReason));

            };

            q.all(promises).then(function(responseQ) {
                for (var i = 0; i < responseQ.length; i++) {
                    if (!(_.isEmpty(responseQ[i])))
                        for (var j = responseQ[i].length - 1; j >= 0; j--) {
                            returnOrderArray.push(responseQ[i][j]);
                        };
                };
                response.consignment = returnOrderArray;

                res.status(200).send(response);
                // do things after your inner functions run 
            }, function() {
                console.log("Fails Order errror in get:-" + promises);
            });

        }, function(err) {
            res.status(err.status).send(err);
        });

};

var getqc = function(req, res) {

    var storeID = '1230';

    if (!req.headers.isadmin) {
        storeID = req.headers.storeid;
    };


    var queryObject = req.query;

    var searchQuery = '';

    

    for (var query in queryObject) {

        if (typeof queryObject[query] === 'object') {

            var objectP = queryObject[query];
            
            for (var i = objectP.length - 1; i >= 0; i--) {

            searchQuery = searchQuery + query + '=' + encodeURIComponent(objectP[i]) + '&';

            };
        } else {
            searchQuery = searchQuery + query + '=' + encodeURIComponent(queryObject[query]) + '&';
        }
    };

    var selectedReason = "";
    if (queryObject.hasOwnProperty('reason')) {
        selectedReason = queryObject.reason;
    } else {
        selectedReason = "";
    }

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
        '/rejected?' +
        searchQuery;


    Order.getData(options)
        .then(function(response) {

            var allConsignents = {};

            response = JSON.parse(response);
            console.log("Object Response" + response.content);

            allConsignents = response.content;

            var defered = q.defer();
            var promises = [];
            var returnOrderArray = [];

            for (var consignment in allConsignents) {

                promises.push(ConsignmentCtrl.getForFailOrder(allConsignents[consignment], baseOption, storeID,selectedReason));

            };

            q.all(promises).then(function(responseQ) {
                for (var i = 0; i < responseQ.length; i++) {
                    if (!(_.isEmpty(responseQ[i])))
                        for (var j = responseQ[i].length - 1; j >= 0; j--) {
                            returnOrderArray.push(responseQ[i][j]);
                        };
                };
                response.consignment = returnOrderArray;

                res.status(200).send(response);
                // do things after your inner functions run 
            }, function(error) {
               console.log("Fails Order errror in getqc:-" + error);
            });

        }, function(err) {
            res.status(err.status).send(err);
        });

};




exports.get = get;
exports.getqc = getqc;
