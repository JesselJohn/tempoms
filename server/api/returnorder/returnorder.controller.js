'use strict';

var ConsignmentCtrl = require('../returnorderdetail/returnorderdetail.controller.js');
var environment = require('../../config/environment');
var _ = require('lodash');
var Order = require('../service');
var q = require('q');
var Service = require('../service');
var newOption = function(options) {
        this.host = options.host;
        this.port = options.port;
        this.headers = options.headers;
        this.method = options.method;
    };

var get = function(req, res) { //  For Return Order Page

    
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


    _.extend( options , environment.optimusPrime.options);

    options.headers = {
      'Authorization': req.headers.authorization
    };

    options.method = "GET";

    var baseOption = {};

    _.extend(baseOption, options);

    
     // For passing to Consignment Get As It will not have request body..
    
    options.path = environment.optimusPrime.domainName + '/return/search?' +
        searchQuery;


    Order.getData(options)
        .then(function(response) {

            var allConsignents ={};

            response = JSON.parse(response);
            
                
            // all  Consignment 
            allConsignents = response.content;

            var defered = q.defer();
            var promises = [];
            var returnOrderArray = [];

            for (var consignment in allConsignents) {

                promises.push(ConsignmentCtrl.get(allConsignents[consignment],new newOption(baseOption)));

            };

            q.all(promises).then(function(responseQ) {
                for (var i = 0; i < responseQ.length; i++) {
                    if(!(_.isEmpty(responseQ[i])))
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

var put = function(req , res){ // Update order status
    
    var options = {};

    _.extend( options , environment.optimusPrime.options);

    options.headers = {
      'Authorization': req.headers.authorization
    };

    
    options.path = environment.optimusPrime.domainName 
        + '/return/' + req.params.retunorderID + '/status';

    
    options.method = "PUT";
    var data = {};

    
    data = req.body.orderLines;
    
    Service.putData(options , data[0]).then(function(response) {
        return res.status(200).send(response);
    }, function(errorObject) {
        return res.status(errorObject.status).send(errorObject);
    });
};

var post = function(req, res) { // Create Consignment

    var data = req.body;

    var options = {};


    _.extend( options , environment.optimusPrime.options);
    
    options.headers = {
      'Authorization': req.headers.authorization
    };

    
    options.path = environment.optimusPrime.domainName 
        + '/returnConsignment';
    
    options.method = 'POST';

    Service.postData(options,data).
    then(function(response) {
        res.status(200).send(response);
    }, function(errorObject) {
        res.status(errorObject.status).send(errorObject);
    });
};


exports.get = get;
exports.post = post;
exports.put = put;
