'use strict';

var _ = require('lodash');
var http = require('http');
var config = require('../../config');
var querystring = require('querystring');
var Pakage = require('../service');
var environment = require('../../config/environment');
var util = require('util');


var get = function(req, res) {

    var options = {};

    _.extend(options , environment.optimusPrime.options);

    options.headers = {
        'Authorization': req.headers.authorization
    };

    options.method = "GET";


    options.path = environment.optimusPrime.domainName + '/packaging';



    Pakage.getData(options)
        .then(function(response) {
            res.status(200).send(response);
        }, function(err) {
            res.status(err.status).send(err);
        });

};

var post = function(req, res) {

    var options = {};

    _.extend(options , environment.optimusPrime.options);

    options.headers = {
        'Authorization': req.headers.authorization
    };


    options.path = environment.optimusPrime.domainName + '/consignment/' + req.body.consignmentID + '/packagingType?value=' + req.body.packagingType;

    
    Pakage.postData(options, {}).
    then(function(response) {
        res.status(200).send(response);
    }, function(errorObject) {
        console.log("Error while selecting package for consignment id => "  + req.body.consignmentID);
        console.log("Error object " + util.inspect(errorObject, false, null));
        res.status(errorObject.status).send(errorObject);
    });
};

var postDimension = function(req, res) {

    var options = {};

    var dimension = {
        length: req.params.length,
        breadth: req.params.breadth,
        height: req.params.height
    };

    options = environment.optimusPrime.options;

    options.headers = {
        'Authorization': req.headers.authorization
    };


    options.path = environment.optimusPrime.domainName + '/consignment/' + req.body.consignmentID + '/packagingType?value=' + req.body.packagingType;

    Pakage.postData(options, dimension).
    then(function(response) {
        console.log(response);
        res.status(200).send(response);
    }, function(errorObject) {
        console.log("Error while selecting package for consignment id with dimesnion => "  + req.body.consignmentID);
        console.log("Error object " + util.inspect(errorObject, false, null));
        res.status(errorObject.status).send(errorObject);
    });
};

exports.get = get;
exports.post = post;
exports.postDimension = postDimension;
