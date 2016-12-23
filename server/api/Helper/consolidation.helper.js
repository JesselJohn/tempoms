'use strict';

var _ = require('lodash');

var isRealValue = function(obj) {
    return obj && obj !== "null" && obj !== "undefined";
};

var getConsolidationDetails = function(response) {
    // Finally return  processedData
    var processedData = {};
    processedData['consignmentDetails'] = {};
    processedData['items'] = [];
    processedData['orderId'] = response['orderId'];
    processedData['colorType'] = '#FFFFFF';
    // Consignment Details
    if (isRealValue(response['consignment'])) {


        var firstConsignment = response['consignment'];

        processedData['consignmentID'] = firstConsignment['consignmentId'];
        processedData['totalItems'] = firstConsignment['itemCount'];
        processedData['totalItemsPicked'] = 0;


        var itemsArrray = firstConsignment['items'];

        /**************************************
         *
         *   Process Data For Items
         *
         ***************************************/

        var itemsProcessedArray = [];
        var itemsProcessedArrayForOrderPage = [];


        for (var i in itemsArrray) {
            // store in this object
            var processedItemInstance = {};
            // process i th item
            var currentItem = itemsArrray[i];

            processedItemInstance['itemID'] = currentItem['itemId'];



            if (currentItem['itemStatus']['itemStatus'] === 'INITIATED' ||
                currentItem['itemStatus']['itemStatus'] === 'UNASSIGNED' ||
                currentItem['itemStatus']['itemStatus'] === 'ASSIGNED' ||
                currentItem['itemStatus']['itemStatus'] === 'SAPPICKPASS' ||
                currentItem['itemStatus']['itemStatus'] === 'SAPPICKFAIL' ||
                currentItem['itemStatus']['itemStatus'] === 'CANCELLED' ||
                currentItem['itemStatus']['itemStatus'] === 'PICKFAIL') {
                processedItemInstance['itemPicked'] = false;
            } else {
                processedItemInstance['itemPicked'] = true;
            }





            processedItemInstance['itemStatus'] = currentItem['itemStatus']['itemStatus'];
            if (processedItemInstance['itemPicked']) {
                processedData['totalItemsPicked'] += 1;
            }
            var mboitemDetail = currentItem['product'];
            processedItemInstance['skuID'] = mboitemDetail['skuId'];
            processedItemInstance['styleCode'] = mboitemDetail['styleId'];
            processedItemInstance['sapStyleId'] = mboitemDetail['sapStyleId'];

            processedItemInstance['brand'] = mboitemDetail['brand'];
            processedItemInstance['size'] = mboitemDetail['size'];
            processedItemInstance['color'] = mboitemDetail['color'];
            processedItemInstance['mrp'] = mboitemDetail['mrp'];
            processedItemInstance['image'] = mboitemDetail['image'];
            processedItemInstance['category'] = mboitemDetail['category1'] + " " + mboitemDetail['category3'];



            processedItemInstance['discountPrice'] = currentItem['itemPricingDetails']['netAmount'];
            processedItemInstance['discount'] = currentItem['itemPricingDetails']['discount'];



            if (currentItem['itemStatus']['itemStatus'] === 'INITIATED' ||
                currentItem['itemStatus']['itemStatus'] === 'UNASSIGNED' ||
                currentItem['itemStatus']['itemStatus'] === 'ASSIGNED' ||
                currentItem['itemStatus']['itemStatus'] === 'CANCELLED' ||
                currentItem['itemStatus']['itemStatus'] === 'SAPPICKFAIL'
            ) {} else {

            itemsProcessedArray.push(processedItemInstance);

            }
            itemsProcessedArrayForOrderPage.push(processedItemInstance);
            //Push to array
        };

        processedData['items'] = itemsProcessedArray;
        processedData['itemsForOrderPage'] = itemsProcessedArrayForOrderPage;

        //////////////////////// Color Type And Bag Type Start /////
        if (processedData['totalItemsPicked'] === processedData['totalItems']) {
            if (processedData['totalItems'] === '1') {
                processedData['colorType'] = 'Yellow'; // Normally White Else Green or
            } else {
                processedData['colorType'] = 'Green'; // Normally White Else Green or
            }
        }
        //////////////////////// Color Type And Bag Type Ends /////

    } else {
        console.log("Consignment Is Not an Object Or Is Null");
    }

    return processedData;
};


exports.getConsolidationDetails = getConsolidationDetails;
