'use strict';

var _ = require('lodash');
var config = require('../../config');
var environment = require('../../config/environment');
var querystring = require('querystring');
var ConsignmentService = require('../service');

var isRealValue = function(obj) {
    return obj && obj !== "null" && obj !== "undefined";
};

var get = function(consignmentID, baseOption) { // For Return COnsignment List Page Details

    var options = {};

    _.extend(options , baseOption);

    options.path = environment.optimusPrime.domainName + '/returnConsignment/' + consignmentID;




    return ConsignmentService.getData(options)
        .then(function(response) {

                response = JSON.parse(response);

                var processedData = {};
                processedData.returnIDs = '';

                processedData.returnConsignmentId = consignmentID;
                processedData.status = response.status;

                for (var i = response.returnIds.length - 1; i >= 0; i--) {
                    processedData.returnIDs += response.returnIds[i];
                    if (i > 0)
                        processedData.returnIDs = processedData.returnIDs + ",";
                };

                return processedData;
            },
            function(err) {
                return err;
            });
};




var getProcessed = function(returnid, baseOption) { // For List Page

    var options = {};

    _.extend(options , baseOption);

    options.path = environment.optimusPrime.domainName + '/return/' + returnid;




    return ConsignmentService.getData(options)
        .then(function(response) {

                response = JSON.parse(response);

                var processedData = {};
                processedData['returnId'] = response['returnId'];
                processedData['refundStatus'] = response['refundStatus'];
                processedData['orderId'] = response['orderId'];
                if (isRealValue(response['ffCenter'])) {
                    processedData['fullfilmentCenterName'] = response['ffCenter']['fcName'];
                }



                

                if (response['returnInitiatedDate'] !== 'null') {
                    console.log("Return Order initiatedDate is which should not be null");
                    console.log(response['returnInitiatedDate']);

                    processedData['initiatedDate'] = response['returnInitiatedDate'].split("[")[0];
                } else {
                    console.log("Return initiatedDate is null");
                }

                if (isRealValue(response['returnStatus'])) {
                    processedData['returnStatus'] = response['returnStatus']['returnStatus'];
                }
                if (isRealValue(response['returnMode'])) {
                    processedData['returnMode'] = response['returnMode']['name'];

                }

                if (isRealValue(response['refundPaymentDetails']) && response['refundPaymentDetails'].hasOwnProperty('amount')) {
                    processedData['returnNetAmount'] = response['refundPaymentDetails']['amount'];
                } else {
                    console.log("refundPayment Details is Empty");
                }

                if (isRealValue(response['orderingCenter'])) {
                    processedData['orderingStore'] = response['orderingCenter']['fcName'];
                }

                if (isRealValue(response['item'])) {
                    var item = response['item'];
                    processedData['orderLineId'] = item['itemId'];
                    processedData['image'] = item['product']['image'];
                    processedData['description'] = item['product']['description'];
                } else {
                    console.log("Item is Empty");
                }

                processedData['returnCustomerreason'] = response['returnHistory'][0]['reason'];
            return processedData;
        },
        function(err) {
            return err;
        });
};


exports.get = get;
exports.getProcessed = getProcessed;
