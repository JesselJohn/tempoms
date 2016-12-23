'use strict';
var isRealValue = function(obj) {
    return obj && obj !== "null" && obj !== "undefined";
};

var checkAllPicked = function(itemsArrray) {
    var allPicked = true;
    for (var i in itemsArrray) {

        var currentItem = itemsArrray[i];

        if (currentItem['itemStatus']['itemStatus'] !== 'PICKPASS' && currentItem['itemStatus']['itemStatus'] !== 'REPRINTINVOICE' && currentItem['itemStatus']['itemStatus'] !== 'QCPASS' && currentItem['itemStatus']['itemStatus'] !== 'QCFAIL' && currentItem['itemStatus']['itemStatus'] !== 'PACKED' && currentItem['itemStatus']['itemStatus'] !== 'SHIPPED' && currentItem['itemStatus']['itemStatus'] !== 'INVOICED' && currentItem['itemStatus']['itemStatus'] !== 'DELIVERED') {
            allPicked = false;
            break;
        }

    };
    return allPicked;
};


// all assigned and all sappickpass

var checkAllIsAssigned = function(itemsArrray) {
    var allAssigned = true;
    for (var i in itemsArrray) {

        var currentItem = itemsArrray[i];

        if (currentItem['itemStatus']['itemStatus'] !== 'ASSIGNED' && currentItem['itemStatus']['itemStatus'] !== 'SAPPICKPASS') {
            allAssigned = false;
            break;
        }

    };
    return allAssigned;
};


// all assigned and all sappickpass

var checkForTSlot = function(itemsArrray) {
    var showTornot = true;
    for (var i in itemsArrray) {

        var currentItem = itemsArrray[i];

        if (currentItem['itemStatus']['itemStatus'] !== 'PICKPASS') {
            showTornot = false;
            break;
        }

    };
    return (showTornot && itemsArrray.length === 1);
};

var checkSomeProcessed = function(itemsArrray) {
    var someProcessed = false;
    var someNotProcessed = false;

    for (var i in itemsArrray) {

        var currentItem = itemsArrray[i];

        if (
            (currentItem['itemStatus']['itemStatus'] === 'PICKPASS' || currentItem['itemStatus']['itemStatus'] === 'QCPASS' || currentItem['itemStatus']['itemStatus'] === 'REPRINTINVOICE' || currentItem['itemStatus']['itemStatus'] === 'QCFAIL' || currentItem['itemStatus']['itemStatus'] === 'PACKED' || currentItem['itemStatus']['itemStatus'] === 'SHIPPED' || currentItem['itemStatus']['itemStatus'] === 'INVOICED' || currentItem['itemStatus']['itemStatus'] === 'DELIVERED') && !someProcessed) {
            someProcessed = true;
        }

        if ((currentItem['itemStatus']['itemStatus'] === 'ASSIGNED' || currentItem['itemStatus']['itemStatus'] === 'UNASSIGNED') && !someNotProcessed) {
            someNotProcessed = true;
        }

    };
    return (someProcessed && someNotProcessed);
};


var allprocessed = function(itemsArrray) {
    var allItemprocessed = true;
    for (var i in itemsArrray) {

        var currentItem = itemsArrray[i];

        if (currentItem['itemStatus']['itemStatus'] !== 'QCPASS' && currentItem['itemStatus']['itemStatus'] !== 'QCFAIL') {
            allItemprocessed = false;
            break;
        }

    };
    return allItemprocessed;
};
var allprocessedNsomeFail = function(itemsArrray) {
    var allItemprocessedNsomeFail = false;

    if (allprocessed(itemsArrray)) {

        for (var i in itemsArrray) {

            var currentItem = itemsArrray[i];

            if (currentItem['itemStatus']['itemStatus'] === 'QCFAIL') {
                allItemprocessedNsomeFail = true;
                break;
            }

        };

    }


    return allItemprocessedNsomeFail;
};

var checkshowSlot = function(itemsArrray) {
    if (allprocessedNsomeFail(itemsArrray)) {
        return true;
    } else {
        return false;
    }
};


var processItems = function(itemsArrray) {
    var returnArray = [];
    var allPicked = true;
    var allAssigned = true;
    var showTornot = true;

    allPicked = checkAllPicked(itemsArrray);
    allAssigned = checkAllIsAssigned(itemsArrray);
    showTornot = checkForTSlot(itemsArrray);

    var showslot = false;



    for (var i in itemsArrray) {

        // store in this object
        var processedItemInstance = {};
        // process i th item
        var currentItem = itemsArrray[i];

        processedItemInstance['itemID'] = currentItem['itemId'];

        if (currentItem['itemStatus']['itemStatus'] === 'INITIATED' ||
            currentItem['itemStatus']['itemStatus'] === 'UNASSIGNED' ||
            currentItem['itemStatus']['itemStatus'] === 'ASSIGNED' ||
            currentItem['itemStatus']['itemStatus'] === 'SAPPICKFAIL') {
            processedItemInstance['hucode'] = "";
        } else {
            processedItemInstance['hucode'] = currentItem['warehouseItemId'];
        }

        if (currentItem['itemStatus']['itemStatus'] === 'INITIATED' ||
            currentItem['itemStatus']['itemStatus'] === 'UNASSIGNED' ||
            currentItem['itemStatus']['itemStatus'] === 'ASSIGNED' ||
            currentItem['itemStatus']['itemStatus'] === 'SAPPICKPASS' ||
            currentItem['itemStatus']['itemStatus'] === 'SAPPICKFAIL') {

            // Items Not Picked
            processedItemInstance['itemPicked'] = false;
            processedItemInstance['actionTaken'] = false;
            processedItemInstance['qcpass'] = false; // Or Fail
        } else {
            // if  here item picked
            processedItemInstance['itemPicked'] = true;


            if (currentItem['itemStatus']['itemStatus'] === 'PICKPASS' ||
                currentItem['itemStatus']['itemStatus'] === 'PICKFAIL'
            ) {


                processedItemInstance['actionTaken'] = false;
                processedItemInstance['itemStatus'] = currentItem['itemStatus']['id'];
                processedItemInstance['qcpass'] = false;

            } else {

                // if here action taken


                processedItemInstance['actionTaken'] = true;
                if (currentItem['itemStatus']['itemStatus'] === 'QCFAIL') {
                    processedItemInstance['qcpass'] = false;


                } else {
                    // if here qc passed
                    processedItemInstance['qcpass'] = true;
                }
            }

        }

        /*****************************************
         *
         *Deal With showButton In UI
         *
         ******************************************/

        processedItemInstance['itemQCStatus'] = currentItem['itemStatus']['itemStatus'];

        processedItemInstance['showButton'] = false;


        if (currentItem['itemStatus']['itemStatus'] === 'ASSIGNED' ||
            currentItem['itemStatus']['itemStatus'] === 'SAPPICKPASS' ||
            currentItem['itemStatus']['itemStatus'] === 'PICKPASS') {
            processedItemInstance['itemQCComment'] = "";
        } else {
            // When QC Fail happens
            processedItemInstance['itemQCComment'] = currentItem['itemStatus']['itemStatusComment'];
        }


        processedItemInstance['itemStatus'] = currentItem['itemStatus']['id'];
        processedItemInstance['qcReasonValue'] = currentItem['itemStatus']['itemStatusReason'];
        processedItemInstance['qcfailReason'] = currentItem['itemStatus']['itemStatusReasonId'];




        var mboitemDetail = currentItem['product'];
        processedItemInstance['skuID'] = mboitemDetail['skuId'];
        processedItemInstance['sapStyleId'] = mboitemDetail['sapStyleId'];
        processedItemInstance['styleCode'] = mboitemDetail['styleId'];
        processedItemInstance['brand'] = mboitemDetail['brand'];
        processedItemInstance['size'] = mboitemDetail['size'];
        processedItemInstance['color'] = mboitemDetail['color'];
        processedItemInstance['mrp'] = mboitemDetail['mrp'];
        processedItemInstance['image'] = mboitemDetail['image'];

        processedItemInstance['category'] = mboitemDetail['category1'] + " " + mboitemDetail['category3'];


        processedItemInstance['discountPrice'] = currentItem['itemPricingDetails']['netAmount'];
        processedItemInstance['discount'] = currentItem['itemPricingDetails']['discount'];

        // History
        processedItemInstance['orderItemHistory'] = [];

        for (var i = 0; i <= currentItem['orderItemHistory'].length - 1; i++) {
            var processingObj = currentItem['orderItemHistory'][i];
            if (processingObj.toState === "QCFAIL" && processingObj.fromState !== "QCFAIL") {
                processingObj.time = processingObj.time.split("[")[0];
                processedItemInstance['orderItemHistory'].push(processingObj);
            }
        };


        //Push to array
        returnArray.push(processedItemInstance);
    };

    return {
        'returnArray': returnArray,
        'allPicked': allPicked,
        'showslot': showslot,
        'allAssigned': allAssigned,
        'showTornot': showTornot
    };
};

var pushSameStatusItem = function(responseQ) {
    var data = {};
    data['single'] = [];
    data['multiple'] = [];
    var allPicked = true;

    for (var i = 0; i <= responseQ.length - 1; i++) {
        allPicked = true;
        var currentResponse = responseQ[i];

        currentResponse = JSON.parse(currentResponse);

        if (currentResponse.hasOwnProperty('status') == false) {


            if (isRealValue(currentResponse['consignment'])) {
                var firstConsignment = currentResponse['consignment'];
                allPicked = checkAllPicked(currentResponse['consignment']['items']);
                // Update Date
                currentResponse.orderDate = currentResponse.orderDate.split("[")[0];
                var dataObject = {
                    orderId: currentResponse.orderId,
                    orderDate: currentResponse.orderDate,
                    deliveryType: firstConsignment.ffType.ffType,
                    consignmentId: firstConsignment.consignmentId,
                    consignmentItemCount: firstConsignment.itemCount
                }
                if (allPicked) {
                    if (firstConsignment.itemCount === 1) {
                        data['single'].push(dataObject);
                    } else {
                        data['multiple'].push(dataObject);
                    }
                }

            }
        }
    };

    return data;
}


exports.pushSameStatusItem = pushSameStatusItem;
exports.processItems = processItems;
