'use strict';

var SlotService = require('../service');
var environment = require('../../config/environment');
var _ = require('lodash');


var get = function(req, res) {

    var options = {};
    _.extend( options , environment.optimusPrime.options);

    options.headers = {
      'Authorization': req.headers.authorization
    };


    
    var data = {
        consignmentId : req.params.consignmentID
    } ;

    options.path = environment.optimusPrime.domainName + '/slot/';
    
    SlotService.postData(options,data)
        .then(function(response) {
            response = JSON.parse(response);
            return res.status(200).send(response);
        }, function(errorObject) {
            
            return res.status(errorObject.status).send(errorObject);
        });

};

var deleteFn = function(req, res) {

    var options = {};

    _.extend( options , environment.optimusPrime.options);
    
    options.headers = {
      'Authorization': req.headers.authorization
    };

    options.path = environment.optimusPrime.domainName + '/clearSlot/'+ req.params.consignmentID;

    SlotService.deleteData(options)
        .then(function(response) {
            response = JSON.parse(response);
            
            return res.status(200).send(response);
        }, function(error) {
            console.log("Error while clearing slot for " + req.params.consignmentID);
            console.log(error.body);
            return res.status(error.status).send(error);
        });

};

exports.get = get;
exports.deleteFn = deleteFn;
