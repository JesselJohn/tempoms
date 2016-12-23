'use strict';

var ReasonService = require('../service');
var config = require('../../config');
var environment = require('../../config/environment');
var _ = require('lodash');


var getConsignmentReasonList = function(req, res) {
    var url = environment.optimusPrime.domainName ;
    ReasonService.getData(url)
        .then(function(response) {
            return res.status(200).send(response);
        }, function(error) {
            return res.status(error.status).send(error);
        });

};

var getItemReasonList = function(req, res) {
    var options = {};

    _.extend(options , environment.optimusPrime.options);
    
    options.headers = {
      'Authorization': req.headers.authorization
    };

    
    options.path =  environment.optimusPrime.domainName + '/orderLineState/' +req.params.itemStatusId + '/orderLineStateReasons';
    
    ReasonService.getData(options)
        .then(function(response) {
            return res.status(200).send(response);
        }, function(error) {
            return res.status(error.status).send(error);
        });
};

exports.getConsignmentReasonList = getConsignmentReasonList;
exports.getItemReasonList = getItemReasonList;
