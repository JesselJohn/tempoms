'use strict';

var config = require('../../config');
var ConsignmentService = require('../service');
var ConsolidationService = require('../service');
var ConsolidationHelper = require('../Helper/consolidation.helper.js');
var q = require('q');
var environment = require('../../config/environment');
var _ = require('lodash');


var isRealValue = function(obj) {
    return obj && obj !== "null" && obj !== "undefined";
};

var get = function(req, res) {
    // Get item ID  And Consignment ID
    // Update the Item In UI

    var itemID = '';
    var consignmentID = '';
    var data = {};


    var options = {};


    var fullfillmentID = req.headers.storeid;
 
    _.extend(options , environment.optimusPrime.options);


    options.headers = {
        'Authorization': req.headers.authorization
    };

    options.method = "GET";

    var optionsConsignmentDetails = {}
    _.extend(optionsConsignmentDetails, options);


    options.path = environment.optimusPrime.domainName + '/sku/' + req.params.eanID + '/fullfilmentStoreId/' +
        fullfillmentID + '/itemStatus/' + req.params.itemstatus;

    ConsolidationService.getData(options)
        .then(function(response) {
            // Process Only One Consignment Based On FIFO
            response = JSON.parse(response);
            var data = {};
            //console.log(response);
            if (isRealValue(response.consignmentIds.length)) {
                // if cons11ignment is there than it will have eancode item
                data.consignmentId = response.consignmentIds[0];
                // Find ItemID 
                optionsConsignmentDetails.path = environment.optimusPrime.domainName + '/consignment/' + data.consignmentId;

                ConsolidationService.getData(optionsConsignmentDetails).then(function(responseconsign) {

                    responseconsign = JSON.parse(responseconsign);

                    var found = false;
                    if (responseconsign.hasOwnProperty('status') == false) {
                        if (isRealValue(responseconsign['consignment'])) {
                            var firstConsignment = responseconsign['consignment'];

                            if (firstConsignment['items'].length !== 0) {

                                var itemsArrray = firstConsignment['items'];

                                for (var i in itemsArrray) {

                                    var currentItem = itemsArrray[i];
                                    //console.log(currentItem['itemStatus']['itemStatus'] === req.params.itemstatus);

                                    // Have to return items only if all sappassed
                                    // return 0 ;
                                    var mboitemDetail = currentItem['product'];

                                    if (mboitemDetail['skuId'] !== 'null' && mboitemDetail['skuId'] === req.params.eanID && currentItem['itemStatus']['itemStatus'] === req.params.itemstatus) {
                                        data.orderItemId = currentItem['itemId'];
                                        found = true;
                                        res.status(200).send(data);
                                    }

                                };
                                if (found === false) {
                                    data.orderItemId = 0;
                                    res.status(200).send(data);
                                }


                            } else {
                                console.log('items is Null Object');
                                data.orderItemId = 0;
                                res.status(200).send(data);
                            }
                        }
                    }
                });

            } else {
                res.status(299).send({"error": "Not found"});
            }

        }, function(error) {
            // Process Some 
            res.status(error.status).send(error);
        });
};


var getDetail = function(res, req) {

    // Get Details And Slot ID
    var options = {};

    _.extend(options , environment.optimusPrime.options);
    
    options.headers = {
        'Authorization': res.headers.authorization
    };

    options.method = "GET";



    options.path = environment.optimusPrime.domainName + '/consignment/' + res.params.consignmentID;




    ConsolidationService.getData(options).then(function(response) {


        var response = JSON.parse(response);


        // Finally return  processedData
        var processedData = {};
        processedData = ConsolidationHelper.getConsolidationDetails(response);





        return req.status(200).send(processedData);


    }, function(error) {

        return req.status(error.status).send(error);
    });
};


exports.getDetail = getDetail;
exports.get = get;
