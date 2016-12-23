'use strict';

var _ = require('lodash');
var environment = require('../../config/environment');
var ConsignmentService = require('../service');
var ConsignmentHelper = require('../Helper/consignmentprocesssing.helper.js');
var q = require('q');


var get = function(req, res) { // For Consignment Detail Page

    var options = {};

    _.extend(options , environment.optimusPrime.options);

    options.headers = {
        'Authorization': req.headers.authorization
    };

    options.method = "GET";

    var fulfilmentCenterId = '1230'; // For Admin test

    if (!req.headers.isadmin) {
         fulfilmentCenterId = req.headers.storeid;
    };


    var baseOptionForAddress = {};
    var baseOptionForFFCenter = {};
    _.extend(baseOptionForAddress, options);
    _.extend(baseOptionForFFCenter, options);

    options.path = environment.optimusPrime.domainName + '/consignment/' + req.params.consignmentID;


    ConsignmentService.getData(options)
        .then(function(response) {

                response = JSON.parse(response);
                var processedData = {};

                // Customer Details

                processedData = ConsignmentHelper.ProcessConsignmentObject(response, baseOptionForAddress,fulfilmentCenterId , false)
                    .then(function(finalresponse) {
                        res.status(200).send(finalresponse);
                    }, function(finalresponse) {
                        res.status(200).send(finalresponse);

                    });

            },
            function(err) {
                 return res.status(err.status).send(err);
            });
};

exports.get = get;
