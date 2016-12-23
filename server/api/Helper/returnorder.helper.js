var isRealValue = function(obj) {
    return obj && obj !== "null" && obj !== "undefined";
};


// In return order detail process
var getReturnHeader = function(returnorderStatusObject) {
    var processedData = {};

    if (returnorderStatusObject['returnStatus'] === 'CANCELLED') {
        processedData['returnorderstatusvalue'] = 0;
        processedData['pass'] = false;
    }


    if (returnorderStatusObject['returnStatus'] === 'INITIATED') {
        processedData['returnorderstatusvalue'] = 1;
        processedData['pass'] = false;
    }


    // QC FAIL START
    if (returnorderStatusObject['returnStatus'] === 'QCFAIL') {
        processedData['returnorderstatusvalue'] = 2;
        processedData['pass'] = false;

    }

    if (returnorderStatusObject['returnStatus'] === 'SHIPPEDTOCUSTOMER') {
        processedData['returnorderstatusvalue'] = 3;
        processedData['pass'] = false;

    };

    if (returnorderStatusObject['returnStatus'] === 'DELIVEREDTOCUSTOMER') {
        processedData['returnorderstatusvalue'] = 4;
        processedData['pass'] = false;

    }

    // QC Fail ENDS

    // QC Pass Start

    if (returnorderStatusObject['returnStatus'] === 'KEPTATSTORE') {
        processedData['returnorderstatusvalue'] = 10;
        processedData['pass'] = true;

    }

    if (returnorderStatusObject['returnStatus'] === 'QCPASS') {
        processedData['returnorderstatusvalue'] = 2;
        processedData['pass'] = true;

    }



    if (returnorderStatusObject['returnStatus'] === 'TOSENDTOWAREHOUSE') {
        processedData['returnorderstatusvalue'] = 3;
        processedData['pass'] = true;

    }
    if (returnorderStatusObject['returnStatus'] === 'INCONSIGNMENT') {
        processedData['returnorderstatusvalue'] = 4;
        processedData['pass'] = true;
    }

    if (returnorderStatusObject['returnStatus'] === 'SHIPPEDTOWAREHOUSE') {
        processedData['returnorderstatusvalue'] = 5;
        processedData['pass'] = true;

    }
    if (returnorderStatusObject['returnStatus'] === 'WAREHOUSEQCPASS') {
        processedData['returnorderstatusvalue'] = 6;
        processedData['pass'] = true;

    }
    if (returnorderStatusObject['returnStatus'] === 'WAREHOUSEQCFAIL') {
        processedData['returnorderstatusvalue'] = 7;
        processedData['pass'] = true;

    }

    if (returnorderStatusObject['returnStatus'] === 'REFUND_PENDING') {
        processedData['returnorderstatusvalue'] = 11;
        processedData['pass'] = true;

    }



    return processedData;
};


// In return order detail process for warehouse
var getWHReturnHeader = function(returnorderStatusObject) {
    var processedData = {};

    if (returnorderStatusObject['returnStatus'] === 'WAREHOUSEQCFAIL') {
        processedData['returnorderstatusvalue'] = 1;
        processedData['pass'] = true;
    }


    if (returnorderStatusObject['returnStatus'] === 'WAREHOUSEQCMISSING') {
        processedData['returnorderstatusvalue'] = 1;
        processedData['pass'] = true;
    }

    else {

        processedData['returnorderstatusvalue'] = 0;
        processedData['pass'] = false;
    }

    return processedData;
};
// In return order detail process
// No need to change as we are checking for return status for generating Heading list
var readyItemForProcess = function(itemsArrray, returnStatus) {
    var returnArray = [];

    for (var i in itemsArrray) {
        // store in this object
        var processedItemInstance = {};
        // process i th item
        var currentItem = itemsArrray[i];

        processedItemInstance['itemID'] = currentItem['itemId'];

        if (returnStatus === 'INITIATED') {

            // Items Not Picked
            processedItemInstance['itemPicked'] = false;
            processedItemInstance['actionTaken'] = false;
            processedItemInstance['itemQCPass'] = false; // Or Fail
        } else {
            // if  here item picked
            processedItemInstance['itemPicked'] = true;
            processedItemInstance['actionTaken'] = false;
            processedItemInstance['itemQCPass'] = false;
        }



        /********************
         *   Not in Response
         *********************/
        processedItemInstance['itemQCComment'] = '';
        processedItemInstance['qcfailReason'] = 0;

        ///^----------------------------------------------

        processedItemInstance['itemStatus'] = currentItem['itemStatus']['id'];


        var mboitemDetail = currentItem['product'];
        processedItemInstance['skuID'] = mboitemDetail['skuId'];

        processedItemInstance['styleCode'] = mboitemDetail['styleId'];
				processedItemInstance['sapStyleId'] = mboitemDetail['sapStyleId'];

        processedItemInstance['brand'] = mboitemDetail['brand'];
        processedItemInstance['size'] = mboitemDetail['size'];
        processedItemInstance['color'] = mboitemDetail['color'];
        processedItemInstance['image'] = mboitemDetail['image'];
        processedItemInstance['description'] = mboitemDetail['description'];

        processedItemInstance['category'] = mboitemDetail['category1'] + " " + mboitemDetail['category3'];


        processedItemInstance['mrp'] = mboitemDetail['mrp'];
        processedItemInstance['tradesp'] = currentItem['itemPricingDetails']['tradeSp'];
        processedItemInstance['discount'] = currentItem['itemPricingDetails']['discount'];
        processedItemInstance['value'] = currentItem['itemPricingDetails']['value'];
        processedItemInstance['sp'] = currentItem['itemPricingDetails']['sp'];
        processedItemInstance['tax'] = currentItem['itemPricingDetails']['tax'];
        processedItemInstance['netAmount'] = currentItem['itemPricingDetails']['netAmount'];


        processedItemInstance['returnReason'] = currentItem['returnReason'];



        /***************************************
         *
         *For processing data in UI Is Not in resonse
         *
         *****************************************/
        processedItemInstance['quantityOrder'] = 1;
        processedItemInstance['quantityPicked'] = 0;
        processedItemInstance['quantityPickFail'] = 0;
        processedItemInstance['quantityQCFail'] = 0;


        returnArray.push(processedItemInstance);

    };
    return returnArray;
};



// RETURN ORDER PROCESS FOR WAREHOSUE
// Can use getreturnheader for process order
var readyItemForReturnProcess = function(currentItem, returnStatus) {

    var processedItemInstance = {};


    processedItemInstance['itemID'] = currentItem['itemId'];
    // When we can process
    // only when it
    if (returnStatus === 'SHIPPEDTOWAREHOUSE') { // Allowed to process only in this state
        processedItemInstance['itemPicked'] = false;
        processedItemInstance['actionTaken'] = false;
        processedItemInstance['qcpass'] = false; // Or Fail
        processedItemInstance['actionAllowed'] = true;

    } else if (returnStatus === 'WAREHOUSEQCPASS') {
        processedItemInstance['itemPicked'] = true;
        processedItemInstance['actionTaken'] = true;
        processedItemInstance['qcpass'] = true;
        processedItemInstance['actionAllowed'] = false;

    } else if (returnStatus === 'WAREHOUSEQCFAIL') {
        processedItemInstance['itemPicked'] = true;
        processedItemInstance['actionTaken'] = true;
        processedItemInstance['qcpass'] = false;
        processedItemInstance['actionAllowed'] = false;

    } else if (returnStatus === 'WAREHOUSEQCMISSING') {
        processedItemInstance['itemPicked'] = true;
        processedItemInstance['actionTaken'] = true;
        processedItemInstance['qcpass'] = false;
        processedItemInstance['actionAllowed'] = false;

    } else {
        processedItemInstance['itemPicked'] = false;
        processedItemInstance['actionTaken'] = false;
        processedItemInstance['qcpass'] = false;
        processedItemInstance['actionAllowed'] = false;
    }

    processedItemInstance['itemQCComment'] = '';
    processedItemInstance['qcfailReason'] = '';


    var mboitemDetail = currentItem['product'];
    processedItemInstance['skuID'] = mboitemDetail['skuId'];
    processedItemInstance['styleCode'] = mboitemDetail['styleId'];
    processedItemInstance['sapStyleId'] = mboitemDetail['sapStyleId'];

    processedItemInstance['brand'] = mboitemDetail['brand'];
    processedItemInstance['size'] = mboitemDetail['size'];
    processedItemInstance['color'] = mboitemDetail['color'];
    processedItemInstance['image'] = mboitemDetail['image'];
    processedItemInstance['category'] = mboitemDetail['category1'] + " " + mboitemDetail['category3'];


    processedItemInstance['description'] = mboitemDetail['description'];


    processedItemInstance['mrp'] = mboitemDetail['mrp'];
    processedItemInstance['tradesp'] = currentItem['itemPricingDetails']['tradeSp'];
    processedItemInstance['discount'] = currentItem['itemPricingDetails']['discount'];
    processedItemInstance['value'] = currentItem['itemPricingDetails']['value'];
    processedItemInstance['sp'] = currentItem['itemPricingDetails']['sp'];
    processedItemInstance['tax'] = currentItem['itemPricingDetails']['tax'];
    processedItemInstance['netAmount'] = currentItem['itemPricingDetails']['netAmount'];


    processedItemInstance['returnimages'] = currentItem['images'];


    return processedItemInstance;
};


var processReturnOrderObject = function(response) {


    var processedData = {};

    processedData['returnId'] = response['returnId'];

    processedData['orderId'] = response['orderId'];


    processedData['fcid'] = response['ffCenter']['fcid'];


    processedData['returnCustomerreason'] = response['returnHistory'][0]['reason'];


    if (isRealValue(response['returnStatus'])) {

        processedData['returnStatus'] = response['returnStatus']['returnStatus'];


    };


    if (isRealValue(response['item'])) {

        

        var itemsProcessedObject = {};

        itemsProcessedObject = readyItemForReturnProcess(response['item'], processedData['returnStatus']);


        processedData['itemID'] = itemsProcessedObject['itemID'];
        processedData['itemPicked'] = itemsProcessedObject['itemPicked'];



        processedData['actionAllowed'] = itemsProcessedObject['actionAllowed'];
        processedData['actionTaken'] = itemsProcessedObject['actionTaken'];
        processedData['qcpass'] = itemsProcessedObject['qcpass']; // Or Fail




        processedData['showButton'] = false; // Or Fail
        processedData['processingnow'] = false; // Or Fail




        // Return Status
        processedData['qcComment'] = response['returnStatus']['returnStateComment'];
        processedData['qcfailReason'] = response['returnStatus']['returnStateReason'];




        processedData['skuID'] = itemsProcessedObject['skuID'];
        processedData['styleCode'] = itemsProcessedObject['styleCode'];
        processedData['sapStyleId'] = itemsProcessedObject['sapStyleId'];
        processedData['brand'] = itemsProcessedObject['brand'];
        processedData['size'] = itemsProcessedObject['size'];
        processedData['color'] = itemsProcessedObject['color'];
        processedData['image'] = itemsProcessedObject['image'];
        processedData['category'] = itemsProcessedObject['category'];
        processedData['description'] = itemsProcessedObject['description'];
        processedData['mrp'] = itemsProcessedObject['mrp'];
        processedData['tradesp'] = itemsProcessedObject['tradesp'];
        processedData['discount'] = itemsProcessedObject['discount'];
        processedData['value'] = itemsProcessedObject['value'];
        processedData['sp'] = itemsProcessedObject['sp'];
        processedData['tax'] = itemsProcessedObject['tax'];
        processedData['netAmount'] = itemsProcessedObject['netAmount'];
        processedData['returnimages'] = itemsProcessedObject['returnimages'];


    }



    

    return processedData;
};

exports.readyItemForProcess = readyItemForProcess;
exports.getReturnHeader = getReturnHeader;
exports.readyItemForReturnProcess = readyItemForReturnProcess;
exports.getWHReturnHeader = getWHReturnHeader;
exports.processReturnOrderObject = processReturnOrderObject;
