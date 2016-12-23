'use strict';
var _ = require('lodash');

var config = require('../../config');
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

    var queryObject = req.query;

    if (!req.headers.isadmin) {
        queryObject.fulfilmentCenterId = req.headers.storeid;
    };

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

    searchQuery = searchQuery.substring(0, searchQuery.length - 1);

    var options = {};

    _.extend(options , environment.optimusPrime.options);


    options.headers = {
        'Authorization': req.headers.authorization
    };



    options.method = "GET";

    var baseOption = {}; // For passing to Consignment Get As It will not have request body..


    _.extend(baseOption, options);

    options.path = environment.optimusPrime.domainName + '/consignment/search?' +
        searchQuery;
        

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
            },function(error){
                res.status(205).send({});
                console.log("Order list error" + error);
            });

        }, function(err) {
                res.status(err.status).send(err);
        });

};

var getplacedbyme = function(req, res) {

    var queryObject = req.query;

    if (!req.headers.isadmin) {
        queryObject.orderingCenterId = req.headers.storeid;
    };

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

    options.path = environment.optimusPrime.domainName + '/consignment/search?' +
        searchQuery;


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
            });

        }, function(err) {
            res.status(205).send(err);
        });

};

var getConsignmentList = function(req, res) {
    // For getting consigment ID from OrderID
    var options = {};
    _.extend(options , environment.optimusPrime.options);
    options.headers = {
        'Authorization': req.headers.authorization
    };
    options.method = "GET";
    if (!req.headers.isadmin) {
        var fulfilmentCenterId = req.headers.storeid;
        options.path = environment.optimusPrime.domainName + '/consignment/search?orderId=' + req.params.orderID + '&fulfilmentCenterId=' + fulfilmentCenterId;
    } else {
        options.path = environment.optimusPrime.domainName + '/consignment/search?orderId=' + req.params.orderID;
    };
    Order.getData(options)
        .then(function(response) {
            // Return Consignment ID Array
            var response = JSON.parse(response);
            var consignmentArrayObject = response.content;
            res.status(200).send(consignmentArrayObject);
        }, function(err) {
            res.status(205).send(err);
        });
};

var getRejectionReasons = function(req,res){
    var options = {};
    _.extend(options , environment.optimusPrime.options);
    options.headers = {
        'Authorization': req.headers.authorization
    };
    options.method = "GET";
    options.path = environment.optimusPrime.domainName +'/consignmentState/' + req.query.state + '/reasons';
    Order.getData(options)
        .then(function(response){
            res.status(200).send(response);
        },function(err){
            return res.status(err.statusCode).send(err);
        });
};

exports.get = get;
exports.getplacedbyme = getplacedbyme;
exports.getConsignmentList = getConsignmentList;
exports.getRejectionReasons = getRejectionReasons;