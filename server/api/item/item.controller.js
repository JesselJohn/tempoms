'use strict';
var _ = require('lodash');
var config = require('../../config');
var ItemService = require('../service');
var environment = require('../../config/environment');
// Update the Items 
var put = function(req, res) {

    var options = {};

    _.extend(options , environment.optimusPrime.options);

    options.headers = {
      'Authorization': req.headers.authorization
    };

    
    options.path = environment.optimusPrime.domainName 
        + '/consignment/' + req.params.consignmentID + '/orderLines/status';

    
    var data = {};

    
    data['orderLines'] = req.body.orderLines;

    console.log("Item Update for store data object for consignment ID" + req.params.consignmentID);
    console.log(data);
    
    ItemService.putData(options , data).then(function(response) {
        return res.status(200).send(response);
    }, function(errorObject) {
        return res.status(errorObject.status).send(errorObject);
    });
};


var putwh = function(req, res) {

    var options = {};


    _.extend(options , environment.optimusPrime.options);
    
    options.headers = {
      'Authorization': req.headers.authorization,
      'user' : 'admin'
    };

    options.path = environment.optimusPrime.domainName 
        + '/consignment/' + req.params.consignmentID + '/orderLines/status';

    
    var data = {};

    
    data['orderLines'] = req.body.orderLines;
    
    console.log("Item Update for warehouse data object for consignment ID" + req.params.consignmentID);
    console.log(data);
    
    ItemService.putData(options , data).then(function(response) {
        return res.status(200).send(response);
    }, function(errorObject) {
        return res.status(errorObject.status).send(errorObject);
    });
};



exports.put = put;
exports.putwh = putwh;
