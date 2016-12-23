'use strict';

var _ = require('lodash');
var config = require('../../config');
var environment = require('../../config/environment');
var querystring = require('querystring');
var ReturnOrderDetailService = require('../service');
var ReturnOrderHelper = require('../Helper/returnorder.helper.js');
var Helper = require('../Helper/consignment.helper.js');


var isRealValue = function(obj) {
    return obj && obj !== "null" && obj !== "undefined";
};

var get = function(returnorderID, baseOption) { // Called For Return Order Page

    var options = {};
    _.extend( options , baseOption);

    options.path = environment.optimusPrime.domainName + '/return/' + returnorderID;


    return ReturnOrderDetailService.getData(options)
        .then(function(response) {

                response = JSON.parse(response);
                var processedData = {};

                if (response.hasOwnProperty('status') == false) {

                    processedData['checkbox'] = true;
                    processedData['returnId'] = response['returnId'];
                    processedData['orderId'] = response['orderId'];
                    if (isRealValue(response['ffCenter'])) {
                        processedData['fullfilmentCenterName'] = response['ffCenter']['fcName'];
                    }



                    if (isRealValue(response['refundStatus'])) {

                        processedData['refundStatus'] = response['refundStatus']['status'];
                        processedData['refundTranscationID'] = response['refundStatus']['transactionId'];
                    }

                    if (isRealValue(response['returnPricingDetails'])) {

                        processedData['refundNetAmount'] = response['returnPricingDetails']['refundNetAmount'];

                    };

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



                    if (isRealValue(response['orderingCenter'])) {
                        processedData['orderingStore'] = response['orderingCenter']['fcName'];
                    }

                    if (isRealValue(response['item'])) {
                        var item = response['item'];
                        processedData['orderLineId'] = item['itemId'];
                    } else {
                        console.log("Item is Empty");
                    }

                    processedData['returnCustomerreason'] = response['returnHistory'][0]['reason'];


                    if (isRealValue(response['customerDetails'])) {
                        processedData['customerName'] = response['customerDetails']['firstName'] + " ";
                        if (response['customerDetails']['lastName'] !== null && response['customerDetails']['lastName'] !== "null") {
                            processedData['customerName'] += response['customerDetails']['lastName'];
                        }
                    }

                }

                return processedData;
            },
            function(err) {
                return err;
            });
};

var DataGrouper = (function() {
    var has = function(obj, target) {
        return _.any(obj, function(value) {
            return _.isEqual(value, target);
        });
    };

    var keys = function(data, names) {
        return _.reduce(data, function(memo, item) {
            var key = _.pick(item, names);
            if (!has(memo, key)) {
                memo.push(key);
            }
            return memo;
        }, []);
    };

    var group = function(data, names) {
        var stems = keys(data, names);
        return _.map(stems, function(stem) {
            return {
                commonData: stem,
                itemIDs: _.map(_.where(data, stem), function(item) {
                    return _.omit(item, names);
                })
            };
        });
    };

    group.register = function(name, converter) {
        return group[name] = function(data, names) {
            return _.map(group(data, names), converter);
        };
    };

    return group;
}());



var getProcessed = function(req, res) { // For Store Return Detail Page

    var options = {};

    _.extend( options , environment.optimusPrime.options);

    options.headers = {
        'Authorization': req.headers.authorization
    };

    var fulfilmentCenterId = "";
    if (!req.headers.isadmin) {
        var fulfilmentCenterId = req.headers.storeid;
    };


    options.path = environment.optimusPrime.domainName + '/return/' + req.params.returnorderID;

    options.method = "GET";


    ReturnOrderDetailService.getData(options)
        .then(function(response) {

                response = JSON.parse(response);

                var itemsArrray = [];

                var processedData = {};

                processedData['returnId'] = response['returnId'];

                processedData['orderId'] = response['orderId'];


                if (isRealValue(response['customerDetails'])) {
                    var customer = response['customerDetails'];
                    processedData['customerDetails'] = {};
                    processedData['customerDetails']['name'] = customer['title'] + ' ' + customer['firstName'] + ' ' + customer['lastName'];
                    processedData['customerDetails']['mailID'] = customer['email'];
                    processedData['customerDetails']['phoneNumber'] = customer['phonenumber'];
                    processedData['customerDetails']['dateOfBirth'] = customer['dateOfBirth'];
                    processedData['customerDetails']['userId'] = customer['userId'];

                } else {
                    console.log("Customer Details is Not A Object or is null");
                }

                if (isRealValue(response['ffCenter'])) {
                    processedData['ffCenter'] = response['ffCenter']['fcName'];
                }


                if (isRealValue(response['refundPaymentDetails']) && response['refundPaymentDetails'].hasOwnProperty('amount')) {
                    processedData['returnNetAmount'] = response['refundPaymentDetails']['amount'];
                } else {
                    console.log("refundPayment Details is Empty");
                }



                if (response['returnInitiatedDate'] !== 'null') {
                    console.log("Return Order initiatedDate is which should not be null");
                    console.log(response['returnInitiatedDate']);

                    processedData['initiatedDate'] = response['returnInitiatedDate'].split("[")[0];
                } else {
                    console.log("Return initiatedDate is null");
                }


                if (isRealValue(response['returnStatus'])) {

                    var returnorderStatusObject = response['returnStatus'];
                    var returnprocessedObject = ReturnOrderHelper.getReturnHeader(returnorderStatusObject);

                    processedData['returnorderstatusvalue'] = returnprocessedObject.returnorderstatusvalue;
                    processedData['pass'] = returnprocessedObject.pass;
                    processedData['returnStatus'] = response['returnStatus']['returnStatus'];


                }
                if (isRealValue(response['refundStatus'])) {

                    processedData['refundStatus'] = response['refundStatus']['status'];
                }

                if (isRealValue(response['returnMode'])) {
                    processedData['returnMode'] = response['returnMode']['name'];

                }

                if (isRealValue(response['item'])) {

                    var itemForUpload = response['item'];
                    processedData['orderLineIdForUpload'] = itemForUpload['itemId'];
                    processedData['images'] = [];


                    for (var i = 0; i < itemForUpload['images'].length - 1; i++) {
                        if (req.headers.isadmin) {
                            processedData['images'].push(itemForUpload['images'][i]);
                        } else {
                            if (itemForUpload['images'][i].fcId === fulfilmentCenterId) {
                                processedData['images'].push(itemForUpload['images'][i]);
                            }
                        }
                    };



                    response['item'].returnReason = response['returnHistory'][0]['reason'];

                    itemsArrray.push(response['item']);

                    var itemsProcessedArray = [];
                    itemsProcessedArray = ReturnOrderHelper.readyItemForProcess(itemsArrray, processedData['returnStatus']);


                    ////////////////Processing Finish////////////////////

                    processedData['items'] = [];

                    /// Group The data
                    var finaldata =

                        DataGrouper(itemsProcessedArray, [

                            'skuID',
                            'brand',
                            'size',
                            'color',
                            'mrp',
                            'image',

                            'category',

                            'styleCode',
                            'sapStyleId',
                            'quantityOrder',
                            'quantityPicked',
                            'quantityPickFail',
                            'quantityQCFail'
                        ]);

                    // Process the group data
                    for (var i in finaldata) {
                        // store in this object
                        var finalObject = {};
                        // process i th item

                        var currentItem = finaldata[i];

                        finalObject['itemIDs'] = currentItem['itemIDs'];

                        var commonData = currentItem['commonData'];




                        finalObject['skuID'] = commonData['skuID'];
                        finalObject['brand'] = commonData['brand'];
                        finalObject['size'] = commonData['size'];
                        finalObject['color'] = commonData['color'];
                        finalObject['mrp'] = commonData['mrp'];
                        finalObject['discountPrice'] = commonData['discountPrice'];

                        finalObject['discount'] = commonData['discount'];

                        finalObject['category'] = commonData['category'];
                        finalObject['styleCode'] = commonData['styleCode'];
                        finalObject['sapStyleId'] = commonData['sapStyleId'];


                        finalObject['image'] = commonData['image'];



                        //finalObject['styleCode'] = commonData['styleCode'];



                        finalObject['quantityOrder'] = currentItem['itemIDs'].length;

                        finalObject['quantityPickFail'] = 0;
                        finalObject['quantityPicked'] = 0;
                        finalObject['quantityQCFail'] = 0;

                        for (var i = currentItem['itemIDs'].length - 1; i >= 0; i--) {
                            if (currentItem['itemIDs'][i]['itemPicked'] == true) {
                                finalObject['quantityPicked'] += 1;
                            }
                            if (currentItem['itemIDs'][i]['itemPicked'] == false) {
                                finalObject['quantityPickFail'] += 1;
                            }
                            if (currentItem['itemIDs'][i]['itemQCPass'] == true) {
                                finalObject['quantityQCFail'] += 1;

                            }

                            finalObject['returnReason'] = currentItem['itemIDs'][i]['returnReason'];
                        };

                        processedData['items'].push(finalObject);
                    }
                }
                //// Item is Processed Finished

                return res.status(200).send(processedData);
            },
            function(err) {
                return res.status(err.status).send(err);;
            });
};

var getProcessedWH = function(req, res) { // For Store Return Detail Page

    var options = {};

    _.extend( options , environment.optimusPrime.options);

    options.headers = {
        'Authorization': req.headers.authorization
    };


    options.path = environment.optimusPrime.domainName + '/return/' + req.params.returnorderID;

    options.method = "GET";


    ReturnOrderDetailService.getData(options)
        .then(function(response) {

                response = JSON.parse(response);

                var itemsArrray = [];

                var processedData = {};

                processedData['returnId'] = response['returnId'];

                processedData['orderId'] = response['orderId'];

                processedData['returnCustomerreason'] = response['returnHistory'][0]['reason'];


                if (isRealValue(response['customerDetails'])) {
                    var customer = response['customerDetails'];
                    processedData['customerDetails'] = {};
                    processedData['customerDetails']['name'] = customer['title'] + ' ' + customer['firstName'] + ' ' + customer['lastName'];
                    processedData['customerDetails']['mailID'] = customer['email'];
                    processedData['customerDetails']['phoneNumber'] = customer['phonenumber'];
                    processedData['customerDetails']['dateOfBirth'] = customer['dateOfBirth'];
                    processedData['customerDetails']['userId'] = customer['userId'];

                } else {
                    console.log("Customer Details is Not A Object or is null");
                }

                if (isRealValue(response['ffCenter'])) {
                    processedData['ffCenter'] = response['ffCenter']['fcName'];
                }


                if (isRealValue(response['refundPaymentDetails']) && response['refundPaymentDetails'].hasOwnProperty('amount')) {
                    processedData['returnNetAmount'] = response['refundPaymentDetails']['amount'];
                } else {
                    console.log("refundPayment Details is Empty");
                }



                if (response['returnInitiatedDate'] !== 'null') {
                    console.log("Return Order initiatedDate is which should not be null");
                    console.log(response['returnInitiatedDate']);

                    processedData['initiatedDate'] = response['returnInitiatedDate'].split("[")[0];
                } else {
                    console.log("Return initiatedDate is null");
                }


                if (isRealValue(response['returnStatus'])) {

                    var returnorderStatusObject = response['returnStatus'];
                    var returnprocessedObject = ReturnOrderHelper.getWHReturnHeader(returnorderStatusObject);

                    processedData['returnorderstatusvalue'] = returnprocessedObject.returnorderstatusvalue;
                    processedData['pass'] = returnprocessedObject.pass;
                    processedData['returnStatus'] = response['returnStatus']['returnStatus'];


                }
                if (isRealValue(response['refundStatus'])) {

                    processedData['refundStatus'] = response['refundStatus']['status'];
                }

                processedData['returnConsignmentStatus'] = response['returnConsignmentStatus'] || '';


                if (isRealValue(response['returnMode'])) {
                    processedData['returnMode'] = response['returnMode']['name'];

                }

                if (isRealValue(response['item'])) {

                    response['item'].returnReason = response['returnHistory'][0]['reason'];

                    itemsArrray.push(response['item']);

                    var itemsProcessedArray = [];
                    itemsProcessedArray = ReturnOrderHelper.readyItemForProcess(itemsArrray, processedData['returnStatus']);


                    ////////////////Processing Finish////////////////////

                    processedData['items'] = [];

                    /// Group The data
                    var finaldata =

                        DataGrouper(itemsProcessedArray, [

                            'skuID',
                            'brand',
                            'size',
                            'color',
                            'mrp',
                            'image',

                            'category',

                            'styleCode',
                            'sapStyleId',
                            'quantityOrder',
                            'quantityPicked',
                            'quantityPickFail',
                            'quantityQCFail'
                        ]);

                    // Process the group data
                    for (var i in finaldata) {
                        // store in this object
                        var finalObject = {};
                        // process i th item

                        var currentItem = finaldata[i];

                        finalObject['itemIDs'] = currentItem['itemIDs'];

                        var commonData = currentItem['commonData'];




                        finalObject['skuID'] = commonData['skuID'];
                        finalObject['brand'] = commonData['brand'];
                        finalObject['size'] = commonData['size'];
                        finalObject['color'] = commonData['color'];
                        finalObject['mrp'] = commonData['mrp'];
                        finalObject['discountPrice'] = commonData['discountPrice'];

                        finalObject['discount'] = commonData['discount'];

                        finalObject['category'] = commonData['category'];
                        finalObject['styleCode'] = commonData['styleCode'];
                        finalObject['sapStyleId'] = commonData['sapStyleId'];

                        finalObject['image'] = commonData['image'];
                        //finalObject['styleCode'] = commonData['styleCode'];



                        finalObject['quantityOrder'] = currentItem['itemIDs'].length;

                        finalObject['quantityPickFail'] = 0;
                        finalObject['quantityPicked'] = 0;
                        finalObject['quantityQCFail'] = 0;

                        for (var i = currentItem['itemIDs'].length - 1; i >= 0; i--) {
                            if (currentItem['itemIDs'][i]['itemPicked'] == true) {
                                finalObject['quantityPicked'] += 1;
                            }
                            if (currentItem['itemIDs'][i]['itemPicked'] == false) {
                                finalObject['quantityPickFail'] += 1;
                            }
                            if (currentItem['itemIDs'][i]['itemQCPass'] == true) {
                                finalObject['quantityQCFail'] += 1;

                            }

                            finalObject['returnReason'] = currentItem['itemIDs'][i]['returnReason'];

                        };

                        processedData['items'].push(finalObject);
                    }
                }
                //// Item is Processed Finished

                return res.status(200).send(processedData);
            },
            function(err) {
                return res.status(err.status).send(err);;
            });
};


var getProcessedForWareHouse = function(returnorderID, baseOption) { // WareHouse Page

    var options = {};
    
    _.extend( options , baseOption);


    options.path = environment.optimusPrime.domainName + '/return/' + returnorderID;


    return ReturnOrderDetailService.getData(options)
        .then(function(response) {

                response = JSON.parse(response);



                var processedData = {};

                processedData = ReturnOrderHelper.processReturnOrderObject(response);

                return processedData;
            },
            function(err) {
                return err;
            });
};


exports.get = get;
exports.getProcessedWH = getProcessedWH;
exports.getProcessed = getProcessed;
exports.getProcessedForWareHouse = getProcessedForWareHouse;
