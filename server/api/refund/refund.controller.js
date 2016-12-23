'use strict';

var _ = require('lodash');
var environment = require('../../config/environment');
var RefundService = require('../service');
var q = require('q');

var isRealValue = function(obj) {
    return obj && obj !== "null" && obj !== "undefined";
};

var get = function(request, res) {

    var options = {};

    _.extend(options , environment.optimusPrime.options);

    options.headers = {
        'Authorization': request.headers.authorization
    };


    options.path = environment.optimusPrime.domainName + "/return/" + request.params.returnID + "/refund";

    options.method = "GET";

    RefundService.getData(options).then(function(response) {

                response = JSON.parse(response);
                return res.status(200).send(response);
        },
        function(error) {

            return res.status(error.status).send(error);
        });



};


exports.get = get;
