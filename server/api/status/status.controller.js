'use strict';

var ConsignmentStatusService = require('../service');
var environment = require('../../config/environment');
var _ = require('lodash');


var getconsignment = function(req, res) {

    var options = {};

    _.extend( options , environment.optimusPrime.options);
    
    options.headers = {
        'Authorization': req.headers.authorization
    };

    options.method = "GET";


    options.path = environment.optimusPrime.domainName + '/consignmentStates';



    ConsignmentStatusService.getData(options)
        .then(function(response) {
            response = JSON.parse(response);
            return res.status(200).send(response);
        }, function(error) {

            return res.status(error.status).send(error);
        });
};

var getreturnorder = function(req, res) {

    var options = {};

    _.extend( options , environment.optimusPrime.options);
    
    options.headers = {
        'Authorization': req.headers.authorization
    };

    options.method = "GET";


    options.path = environment.optimusPrime.domainName + '/returnStates';



    ConsignmentStatusService.getData(options)
        .then(function(response) {
            response = JSON.parse(response);
            return res.status(200).send(response);
        }, function(error) {

            return res.status(error.status).send(error);
        });
};
var getorder = function(req, res) {

    var options = {};

    options = environment.optimusPrime.options;

    options.headers = {
        'Authorization': req.headers.authorization
    };

    options.method = "GET";


    options.path = environment.optimusPrime.domainName + '/orderStates';



    ConsignmentStatusService.getData(options)
        .then(function(response) {
            response = JSON.parse(response);
            return res.status(200).send(response);
        }, function(error) {
            return res.status(error.status).send(error);
        });
};

var getfullNdelivery = function(req, res) {

    var options = {};

    options = environment.optimusPrime.options;

    options.headers = {
        'Authorization': req.headers.authorization
    };

    options.method = "GET";


    options.path = environment.optimusPrime.domainName + '/ffTypes';



    ConsignmentStatusService.getData(options)
        .then(function(response) {
            response = JSON.parse(response);
            var data = {
                delivery: [{
                    "id": 1,
                    "name": "DELIVERY",
                    "type": "DELIVERY"
                }, {
                    "id": 2,
                    "name": "STOREPICK",
                    "type": "STOREPICK"
                }],
                ffType: []
            };
            for (var i = response.length - 1; i >= 0; i--) {
                if (response[i].type === 'delivery'&& response[i].name !== 'hyperlocal') {
                    data.ffType.push(response[i]);
                } 
            };
            return res.status(200).send(data);
        }, function(error) {

            return res.status(error.status).send(error);
        });
};



exports.getconsignment = getconsignment;
exports.getorder = getorder;
exports.getreturnorder = getreturnorder;
exports.getfullNdelivery = getfullNdelivery;
