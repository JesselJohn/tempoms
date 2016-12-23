'use strict';

var config = require('../../config');
var QualityCheckService = require('../service');
var q = require('q');
var environment = require('../../config/environment');
var _ = require('lodash');
var Helper = require('../Helper/consignment.helper.js');
var QualityHelper = require('../Helper/qualitycheck.helper.js');
var ConsignmentHelper = require('../Helper/consignmentprocesssing.helper.js');


var get = function(req, res) {
    // Return item ID  And Consignment ID
    // Update the Item In UI

    var itemID = '';
    var consignmentID = '';
    var data = {};


    var options = {};

    _.extend(options , environment.optimusPrime.options);
    
    options.headers = {
        'Authorization': req.headers.authorization
    };

    options.method = "GET";

    // console.log(options);

    var optionsWHID = {};
    var optionsConsignmentID = {};
    _.extend(optionsWHID, options);

    optionsWHID.path = environment.optimusPrime.domainName + '/warehouseItemId/' + req.params.huCode + '/orderItemId';


    _.extend(optionsConsignmentID, options);

    optionsConsignmentID.path = environment.optimusPrime.domainName + '/warehouseItemId/' + req.params.huCode + '/consignmentId';



    var deffered = q.defer();
    var promises = [];

    promises.push(QualityCheckService.getData(optionsWHID));
    promises.push(QualityCheckService.getData(optionsConsignmentID));

    q.all(promises).then(function(response) {
        var response1 = {};
        var response2 = {};
        response1 = JSON.parse(response[0]);
        response2 = JSON.parse(response[1]);
        //  Item Found But Not SAPPICK
        data['orderItemId'] = response1['itemId'];
        data['itemStatus'] = response1['itemStatus']['name'];
        data['consignmentId'] = response2['consignmentId'];

        res.status(200).send(data);
    }, function(error) {
        // Process Some 
        res.status(299).send(error);
    });
};

var isRealValue = function(obj) {
    return obj && obj !== "null" && obj !== "undefined";
};


var getDetail = function(req, res) {

    var options = {};

    _.extend(options , environment.optimusPrime.options);
    
    options.headers = {
        'Authorization': req.headers.authorization
    };

    options.method = "GET";

    var fulfilmentCenterId = 0; // For Admin test

    if (!req.headers.isadmin) {
        fulfilmentCenterId = req.headers.storeid;
    };


    var optionsConsignmentID = {};
    var optionsAddress = {};
    var optionsSlot = {};


    _.extend(optionsAddress, options);
    _.extend(optionsSlot, options);



    _.extend(optionsConsignmentID, options);

    optionsConsignmentID.path = environment.optimusPrime.domainName + '/consignment/' + req.params.consignmentID;

    optionsSlot.path = environment.optimusPrime.domainName + '/getSlotId/' + req.params.consignmentID;



    var deffered = q.defer();
    var promises = [];




    promises.push(QualityCheckService.getData(optionsConsignmentID));
    promises.push(QualityCheckService.getData(optionsSlot));

    q.all(promises).then(function(response) {

        var response1 = JSON.parse(response[0]);
        var response2 = JSON.parse(response[1]);




        // Finally return  processedData
        var processedData = {};

        if (response2.hasOwnProperty('slotId') && response2.slotId !== null) {
            processedData['showslot'] = true;
            processedData['slotId'] = response2.slotId;
        } else {
            processedData['showslot'] = false;
        }


        processedData['orderId'] = response1['orderId'];


        if (isRealValue(response1['consignment'])) {


            var firstConsignment = response1['consignment'];

            if (firstConsignment['invoiceId'] === null) {
                processedData['isinvoiceIdGenerated'] = false;
            } else {
                processedData['isinvoiceIdGenerated'] = true;
                processedData['invoiceId'] = firstConsignment['invoiceId'];
                processedData['invoiceDate'] = firstConsignment['invoiceDate'];
            }

            if (isRealValue(firstConsignment['consignmentStatus'])) {

                var consignmentStatusObj = firstConsignment['consignmentStatus'];
                processedData['consignmentStatusCode'] = Helper.getConsignmentHeader(consignmentStatusObj, false);

            } else {
                console.log("consignmentStatus is Not A Object or is null");
            }

            processedData['consignmentID'] = firstConsignment['consignmentId'];
            processedData['totalItems'] = firstConsignment['itemCount'];


            var itemsArrray = [];
            var itemsArrray = firstConsignment['items'];

            var processedDataObject = QualityHelper.processItems(itemsArrray);
            processedData['items'] = processedDataObject.returnArray;
            processedData['allPicked'] = processedDataObject.allPicked;
            processedData['allAssigned'] = processedDataObject.allAssigned;
            processedData['showTornot'] = processedDataObject.showTornot;

            if (response2.hasOwnProperty('slotId') && response2.slotId !== null && !processedData['allAssigned']) {
                processedData['showslot'] = true;
                processedData['slotId'] = response2.slotId;
            } else {
                processedData['showslot'] = false;
            }
            
            if(processedData['showTornot'] && response2.hasOwnProperty('slotId') && response2.slotId === null){
                processedData['showslot'] = true;
                processedData['slotId'] = "T";
            }

            ConsignmentHelper.ProcessConsignmentObject(response1, optionsAddress, fulfilmentCenterId , false)
                .then(function(finalresponse) {
                    processedData['print'] = finalresponse;

                    if (!processedData['allPicked']) {
                        res.status(299).send({ 'error': 'All item is not picked', 'processedData': processedData });
                    } else {
                        return res.status(200).send(processedData);
                    }

                }, function(finalresponse) {
                    processedData['print'] = finalresponse;

                    if (!processedData['allPicked']) {
                        res.status(299).send({ 'error': 'All item is not picked', 'processedData': processedData });
                    } else {
                        return res.status(200).send(processedData);
                    }
                });
        } else {
            console.log("Consignment Is Not an Object Or Is Null");
            return res.status(200).send(processedData);
        }


    }, function(error) {

        res.status(299).send(error);
    });
};



exports.getDetail = getDetail;
exports.get = get;
