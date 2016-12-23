'use strict';

var config = require('../../config');
var QualityCheckMMService = require('../service');
var q = require('q');
var ConsignmentCtrl = require('../consignment/consignment.controller.js');
var environment = require('../../config/environment');
var _ = require('lodash');
var ConsignmentHelper = require('../Helper/consignmentprocesssing.helper.js');
var QualityHelper = require('../Helper/qualitycheck.helper.js');
var Helper = require('../Helper/consignment.helper.js');


var isRealValue = function(obj) {
    return obj && obj !== "null" && obj !== "undefined";
};

var get = function(req, res) {
    // Get Consignment IDs

    var data = {};



    var options = {};

    _.extend(options , environment.optimusPrime.options);
    
    options.headers = {
        'Authorization': req.headers.authorization
    };

    options.method = "GET";

    var optionsConsignmentDetails = {};

    _.extend(optionsConsignmentDetails, options);

    var fullfillmentID = req.headers.storeid;
    


    options.path = environment.optimusPrime.domainName + '/sku/' + req.params.eanCode + '/fullfilmentStoreId/' +
        fullfillmentID + '/itemStatus/' + req.params.itemstatus;


    QualityCheckMMService.getData(options)
        .then(function(response) {

            response = JSON.parse(response);


            if (isRealValue(response.consignmentIds.length)) {

                // if consignment is there than it will have eancode item
                var consignmentArray = response.consignmentIds;


                var defered = q.defer();
                var promises = [];

                for (var consignment in consignmentArray) {
                    optionsConsignmentDetails.path = environment.optimusPrime.domainName + '/consignment/' + consignmentArray[consignment];

                    // console.log(optionsConsignmentDetails);
                    promises.push(QualityCheckMMService.getData(optionsConsignmentDetails));

                };



                q.all(promises)
                    .then(function(responseQ) {

                        data = QualityHelper.pushSameStatusItem(responseQ);

                        res.status(200).send(data);

                    }, function(error) {
                        // Process Some 
                        res.status(299).send(error);
                    });
                /// Finished  q 


            } else {
                res.status(299).send({
                    'error': 'No Consignment For Search EANCODE'
                });
            }
            // Finished Length



        }, function(error) {
            // Process Some 
            res.status(299).send(error);
        });


};




exports.get = get;
