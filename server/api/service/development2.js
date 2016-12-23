'use strict';

var _ = require('lodash');
var config = require('../../config');
var ServiceParent = require('../baseservice/baseservice.js');
var querystring = require('querystring');
var q = require('q');
var retry = require('retry');
var fs = require('fs');

var sslRootCAs = require('ssl-root-cas');
sslRootCAs.inject().addFile('./certi.crt');


var putData = function(options, data) {

    var sendData = "";
    sendData = JSON.stringify(data);

    options.headers['Content-Length'] = sendData.length;
    options.headers['Content-Type'] = "application/json";
    options.method = "PUT";

    return ServiceParent.serviceFunction(options, sendData);
};

var getData = function(options) {

    return ServiceParent.serviceFunction(options, "");

};

var postData = function(options, data) {



    var sendData = '';

    sendData = JSON.stringify(data);

    options.headers['Content-Length'] = sendData.length;
    options.headers['Content-Type'] = "application/json";
    options.method = "POST";


    return ServiceParent.serviceFunction(options, sendData);
};


var deleteData = function(options) {

    options.method = "DELETE";

    return ServiceParent.serviceFunction(options, "");

};


exports.getData = getData;
exports.putData = putData;
exports.deleteData = deleteData;
exports.postData = postData;
