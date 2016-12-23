'use strict';

var config = require('../../config');
var ItemService = require('../service');
var environment = require('../../config/environment');
var _ = require('lodash');

var put = function(req, res) {

    var options = {};

    _.extend( options , environment.optimusPrime.options);

    options.headers = {
        'Authorization': req.headers.authorization
    };


    var fulfilmentCenterId = "";
    if (!req.headers.isadmin) {
        fulfilmentCenterId = req.headers.storeid;
    }else{
        fulfilmentCenterId = "admin";
    };

    options.path = environment.optimusPrime.domainName 
        + "/orderline/" + req.params.orderLineId + "/image/" + fulfilmentCenterId;

    var data = [];


    data = req.body;

    ItemService.putData(options, data).then(function(response) {
        return res.status(200).send(response);
    }, function(errorObject) {
        return res.status(errorObject.status).send(errorObject);
    });
};




exports.put = put;
