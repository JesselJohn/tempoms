'use strict';
var getCustomerDetail = function(customer) {
    var returnObject = {};
    returnObject['name'] = customer['title'] + ' ' + customer['firstName'];
    if (customer['lastName'] !== null) {
        returnObject['name'] += ' ' + customer['lastName'];
    };
    returnObject['mailID'] = customer['email'];
    returnObject['phoneNumber'] = customer['phonenumber'];
    returnObject['dateOfBirth'] = customer['dateOfBirth'];
    returnObject['userId'] = customer['userId'];
    return returnObject;
};


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

var isRealValue = function(obj) {
    return obj && obj !== "null" && obj !== "undefined";
};
var getPaymentDetail = function(payment) {
    var returnObject = {};

    // Has shipping cost and cod
    if (payment['cash'] !== null) {
        returnObject['paymentdone'] = payment['cash'];
    }
    if (payment['online'] !== null) {
        returnObject['paymentdone'] = payment['online'];
    }
    if (payment['NNNowCash'] !== null) {
        returnObject['paymentdone'] = payment['NNNowCash'];
    }
    if (payment['card'] !== null) {
        returnObject['paymentdone'] = payment['card'];
    }
    if (payment['cod'] !== null) {
        returnObject['paymentdone'] = payment['cod'];
    }
    if (payment['som_pos'] !== null) {
        returnObject['paymentdone'] = payment['som_pos'];
    }
    if (payment['som_cod'] !== null) {
        returnObject['paymentdone'] = payment['som_cod'];
    }

    return returnObject;
};


var getConsignmentHeader = function(cosnignmentStatusObject, isStorePickUp) {

    var returnObject = {};

    if (isStorePickUp === true) //  StorePick Is True
    {
        if (cosnignmentStatusObject['consignmentStatus'] === 'ASSIGNED') {
            returnObject['consignmentStatusCode'] = 1;
        } // Initialised

        if (
            cosnignmentStatusObject['consignmentStatus'] === 'QCFAIL'
        ) {
            returnObject['consignmentStatusCode'] = 6;
        }
        if (
            cosnignmentStatusObject['consignmentStatus'] === 'PICKFAIL'
        ) {
            returnObject['consignmentStatusCode'] = 7;
        }
        if (
            cosnignmentStatusObject['consignmentStatus'] === 'QCPASS'
        ) {
            returnObject['consignmentStatusCode'] = 2;
        }

        if (
            cosnignmentStatusObject['consignmentStatus'] === 'INVOICED'
        ) {
            returnObject['consignmentStatusCode'] = 3;
        }

        if (
            cosnignmentStatusObject['consignmentStatus'] === 'READYFORCUSTOMERPICK'
        ) {
            returnObject['consignmentStatusCode'] = 4;
        }
        if (
            cosnignmentStatusObject['consignmentStatus'] === 'CUSTOMERPICKCOMPLETE'
        ) {
            returnObject['consignmentStatusCode'] = 5;
        }
        if (cosnignmentStatusObject['consignmentStatus'] === 'INITIATED' ||
            cosnignmentStatusObject['consignmentStatus'] === 'UNASSIGNED' ||
            cosnignmentStatusObject['consignmentStatus'] === 'SAPPICKPASS' ||
            cosnignmentStatusObject['consignmentStatus'] === 'SAPPICKFAIL') {
            returnObject['consignmentStatusCode'] = 0;
        }
        if (cosnignmentStatusObject['consignmentStatus'] === 'CANCELLED') {
            returnObject['consignmentStatusCode'] = 100;
        }

        if (cosnignmentStatusObject['consignmentStatus'] === 'POSPAYMENTPENDING') {
            returnObject['consignmentStatusCode'] = -1000;
        }

        if (cosnignmentStatusObject['consignmentStatus'] === 'DELIVERED') {
            returnObject['consignmentStatusCode'] = 111;
        }
    } else { //  delivery
        if (
            cosnignmentStatusObject['consignmentStatus'] === 'ASSIGNED' ||
            cosnignmentStatusObject['consignmentStatus'] === 'SAPPICKPASS' ||
            cosnignmentStatusObject['consignmentStatus'] === 'PICKPASS'
        ) {
            returnObject['consignmentStatusCode'] = 1;
        } // Initialised

        if (
            cosnignmentStatusObject['consignmentStatus'] === 'QCFAIL'
        ) {
            returnObject['consignmentStatusCode'] = 6;
        }

        if (cosnignmentStatusObject['consignmentStatus'] === 'PICKFAIL') {
            returnObject['consignmentStatusCode'] = 7;
        }


        if (
            cosnignmentStatusObject['consignmentStatus'] === 'QCPASS'
        ) {
            returnObject['consignmentStatusCode'] = 2;
        }

        if (
            cosnignmentStatusObject['consignmentStatus'] === 'INVOICED'
        ) {
            returnObject['consignmentStatusCode'] = 3;
        }

        if (
            cosnignmentStatusObject['consignmentStatus'] === 'PACKED'
        ) {
            returnObject['consignmentStatusCode'] = 4;
        }
        if (
            cosnignmentStatusObject['consignmentStatus'] === 'SHIPPED'
        ) {
            returnObject['consignmentStatusCode'] = 5;
        }

        if (cosnignmentStatusObject['consignmentStatus'] === 'INITIATED' ||
            cosnignmentStatusObject['consignmentStatus'] === 'UNASSIGNED' ||
            cosnignmentStatusObject['consignmentStatus'] === 'SAPPICKFAIL') {
            returnObject['consignmentStatusCode'] = 0;
        }

        if (cosnignmentStatusObject['consignmentStatus'] === 'CANCELLED') {
            returnObject['consignmentStatusCode'] = 100;
        }
        if (cosnignmentStatusObject['consignmentStatus'] === 'DELIVERED') {
            returnObject['consignmentStatusCode'] = 111;
        }
        if (cosnignmentStatusObject['consignmentStatus'] === 'REPRINTINVOICE') {
            returnObject['consignmentStatusCode'] = -1;
        }
        if (cosnignmentStatusObject['consignmentStatus'] === 'POSPAYMENTPENDING') {
            returnObject['consignmentStatusCode'] = -1000;
        }
    }

    return returnObject.consignmentStatusCode;
};


var readyItemForProcess = function(itemsArrray, iswarehouseconsignment, fulfilmentCenterId) {

    var returnArray = [];
    var returnUnProcessedArray = [];
    var showslotT = checkForTSlot(itemsArrray);


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
            currentItem['itemStatus']['itemStatus'] === 'PICKFAIL' ||
            currentItem['itemStatus']['itemStatus'] === 'CANCELLED') {

            // Items Not Picked
            processedItemInstance['itemPicked'] = false;
            processedItemInstance['actionTaken'] = false;
            processedItemInstance['itemQCPass'] = false; // Or Fail
        } else {
            // if  here item picked
            processedItemInstance['itemPicked'] = true;


            if (currentItem['itemStatus']['itemStatus'] === 'PICKPASS') {


                processedItemInstance['actionTaken'] = false;
                processedItemInstance['itemStatus'] = currentItem['itemStatus']['id'];
                processedItemInstance['itemQCPass'] = false;
            } else {

                // if here action taken


                processedItemInstance['actionTaken'] = true;
                if (currentItem['itemStatus']['itemStatus'] === 'QCFAIL') {
                    processedItemInstance['itemQCPass'] = false;


                } else {
                    // if here qc passed
                    processedItemInstance['itemQCPass'] = true;
                }
            }
        }


        if (currentItem['itemStatus']['itemStatus'] === 'ASSIGNED' ||
            currentItem['itemStatus']['itemStatus'] === 'SAPPICKPASS' ||
            currentItem['itemStatus']['itemStatus'] === 'PICKPASS' ||
            currentItem['itemStatus']['itemStatus'] === 'DELIVERYMODIFIED') {
            processedItemInstance['itemQCComment'] = "";
        } else {
            // When QC Fail happens
            processedItemInstance['itemQCComment'] = currentItem['itemStatus']['itemStatusComment'];
        }


        processedItemInstance['itemStatus'] = currentItem['itemStatus']['id'];
        processedItemInstance['qcReasonValue'] = currentItem['itemStatus']['itemStatusReason'];
        processedItemInstance['qcfailReason'] = currentItem['itemStatus']['itemStatusReasonId'];
        if (!isRealValue(processedItemInstance['qcfailReason'])) {
            processedItemInstance['qcfailReason'] = 0;
        }


        processedItemInstance['hucode'] = currentItem['warehouseItemId'];
        processedItemInstance['sapOrderNo'] = currentItem['sapOrderNo'];


        var mboitemDetail = currentItem['product'];
        processedItemInstance['skuID'] = mboitemDetail['skuId'];
        processedItemInstance['styleCode'] = mboitemDetail['styleId'];
        processedItemInstance['brand'] = mboitemDetail['brand'];
        processedItemInstance['size'] = mboitemDetail['size'];
        processedItemInstance['color'] = mboitemDetail['color'];
        processedItemInstance['image'] = mboitemDetail['image'];
        processedItemInstance['description'] = mboitemDetail['description'];
        processedItemInstance['sapStyleId'] = mboitemDetail['sapStyleId'];


        processedItemInstance['category'] = mboitemDetail['category1'] + " " + mboitemDetail['category3'];


        processedItemInstance['mrp'] = mboitemDetail['mrp'];
        processedItemInstance['tradesp'] = currentItem['itemPricingDetails']['tradeSp'];
        processedItemInstance['discount'] = currentItem['itemPricingDetails']['discount'];
        processedItemInstance['value'] = currentItem['itemPricingDetails']['value'];
        processedItemInstance['sp'] = currentItem['itemPricingDetails']['sp'];
        processedItemInstance['tax'] = currentItem['itemPricingDetails']['tax'];
        processedItemInstance['netAmount'] = currentItem['itemPricingDetails']['netAmount'];


        /***************************************
         *
         *For processing data in UI Is Not in resonse
         *
         *****************************************/
        processedItemInstance['quantityOrder'] = 1;
        processedItemInstance['quantityPicked'] = 0;
        processedItemInstance['quantityPickFail'] = 0;
        processedItemInstance['quantityQCFail'] = 0;

        // Process Order History
        processedItemInstance['orderItemHistory'] = [];
        processedItemInstance['fullorderItemHistory'] = [];

        for (var i = 0; i <= currentItem['orderItemHistory'].length - 1; i++) {
            var processingObj = currentItem['orderItemHistory'][i];
            if (processingObj.toState === "QCFAIL" && processingObj.fromState !== "QCFAIL") {
                processingObj.time = processingObj.time.split("[")[0];
                processedItemInstance['orderItemHistory'].push(processingObj);
            }
        };


        var whenassign = [];
        // Assign state calculate..
        for (var i = 0; i <= currentItem['orderItemHistory'].length - 1; i++) {
            var processingTemp = currentItem['orderItemHistory'][i];



            if (processingTemp['ffCenterId'] === fulfilmentCenterId && processingTemp['toState'] === 'ASSIGNED') {

                whenassign.push(processingTemp.time.split("[")[0]);


            };

        };


        var tempforassign = "";
        if (whenassign.length > 0) {
            tempforassign = whenassign[0];
        };


        // Pick fail qc fail auto fail details process here
        for (var i = 0; i <= currentItem['orderItemHistory'].length - 1; i++) {
            var processingObj = currentItem['orderItemHistory'][i];

            processingObj.time = processingObj.time.split("[")[0];

            processingObj.tempforassign = tempforassign;


            if (processingObj['ffCenterId'] === fulfilmentCenterId) {

                if (processingObj['toState'] === 'PICKFAIL' || processingObj['toState'] === 'QCFAIL') {

                    if (processingObj['fromState'] !== 'PICKFAIL' && processingObj['fromState'] !== 'QCFAIL') {
                        if (processingObj['toState'] === 'QCFAIL') {
                            if (processingObj.comment.indexOf("System") > -1) {
                                // System is present in qc fail comment
                            } else {
                                processedItemInstance['fullorderItemHistory'].push(processingObj);
                            }
                        } else {
                            processedItemInstance['fullorderItemHistory'].push(processingObj);
                        }

                    }
                }

            }

        };



        processedItemInstance['qcFailTimes'] = processedItemInstance['orderItemHistory'].length;

        //Push to array
        if (iswarehouseconsignment) {
            if (currentItem['itemStatus']['itemStatus'] === 'INITIATED' ||
                currentItem['itemStatus']['itemStatus'] === 'UNASSIGNED' ||
                currentItem['itemStatus']['itemStatus'] === 'ASSIGNED' ||
                currentItem['itemStatus']['itemStatus'] === 'SAPPICKFAIL'
            ) {
                returnUnProcessedArray.push(processedItemInstance)
            } else {
                returnArray.push(processedItemInstance);
            }
        } else {
            returnArray.push(processedItemInstance);
        }
    };
    return { returnArray: returnArray, returnUnProcessedArray: returnUnProcessedArray, showslotT: showslotT };
};

var getProcessedAfterGrouping = function(processedArrray) {
    var returnArray = [];

    for (var i in processedArrray) {
        // store in this object
        var finalObject = {};
        // process i th item

        var currentItem = processedArrray[i];

        finalObject['itemIDs'] = currentItem['itemIDs'];

        var commonData = currentItem['commonData'];




        finalObject['skuID'] = commonData['skuID'];
        finalObject['brand'] = commonData['brand'];
        finalObject['styleCode'] = commonData['styleCode'];
        finalObject['sapStyleId'] = commonData['sapStyleId'];
        finalObject['size'] = commonData['size'];
        finalObject['color'] = commonData['color'];


        // Inside common data
        finalObject['mrp'] = commonData['mrp'];
        finalObject['description'] = commonData['description'];


        finalObject['image'] = commonData['image'];

        finalObject['category'] = commonData['category'];
        // change this 
        finalObject['sapStyleIdAll'] = commonData['sapStyleId'];


        finalObject['quantityOrder'] = currentItem['itemIDs'].length;

        finalObject['quantityPickFail'] = 0;
        finalObject['quantityPicked'] = 0;
        finalObject['quantityQCFail'] = 0;

        finalObject['totalmrp'] = (finalObject['mrp']) * (currentItem['itemIDs'].length);
        finalObject['totalsp'] = 0;
        finalObject['totaltradeSP'] = 0;
        finalObject['totaldiscount'] = 0;
        finalObject['totalvalue'] = 0;
        finalObject['totaltax'] = 0;
        finalObject['totalNetAmount'] = 0;


        finalObject['hucodeAll'] = "";
        finalObject['sapOrderNoAll'] = "";
        finalObject['sapStyleIdAll'] = "";

        for (var i = currentItem['itemIDs'].length - 1; i >= 0; i--) {
            if (currentItem['itemIDs'][i]['hucode'] !== 'null' && currentItem['itemIDs'][i]['hucode'] !== null) {
                finalObject['hucodeAll'] += currentItem['itemIDs'][i]['hucode'] + ",";
            }

        };

        finalObject['hucodeAll'] = finalObject['hucodeAll'].substring(0, finalObject['hucodeAll'].length - 1);

        /* for (var i = currentItem['itemIDs'].length - 1; i >= 0; i--) {
             if (currentItem['itemIDs'][i]['sapStyleId'] !== 'null' && currentItem['itemIDs'][i]['sapStyleId'] !== null) {
                 finalObject['sapStyleIdAll'] += currentItem['itemIDs'][i]['sapStyleId'] + ",";
             }

         };*/

        for (var i = currentItem['itemIDs'].length - 1; i >= 0; i--) {
            if (currentItem['itemIDs'][i]['sapOrderNo'] !== 'null' && currentItem['itemIDs'][i]['sapOrderNo'] !== null) {
                finalObject['sapOrderNoAll'] += currentItem['itemIDs'][i]['sapOrderNo'] + ",";
            }

        };


        finalObject['sapOrderNoAll'] = finalObject['sapOrderNoAll'].substring(0, finalObject['sapOrderNoAll'].length - 1);


        // Iterate over
        for (var i = currentItem['itemIDs'].length - 1; i >= 0; i--) {

            finalObject['totalsp'] += currentItem['itemIDs'][i]['sp'];
            finalObject['totaltradeSP'] += currentItem['itemIDs'][i]['tradesp'];
            finalObject['totalvalue'] += currentItem['itemIDs'][i]['value'];
            finalObject['totaldiscount'] += currentItem['itemIDs'][i]['discount'];
            finalObject['totaltax'] += currentItem['itemIDs'][i]['tax'];
            finalObject['totalNetAmount'] += currentItem['itemIDs'][i]['netAmount'];

            if (currentItem['itemIDs'][i]['itemPicked'] == true) {
                finalObject['quantityPicked'] += 1;
            }
            if (currentItem['itemIDs'][i]['itemPicked'] == false) {
                finalObject['quantityPickFail'] += 1;
            }
            if (currentItem['itemIDs'][i]['itemQCPass'] == true) {
                finalObject['quantityQCFail'] += 1;
            }
        };

        returnArray.push(finalObject);
    };
    return returnArray;
};



exports.getCustomerDetail = getCustomerDetail;
exports.getConsignmentHeader = getConsignmentHeader;
exports.getProcessedAfterGrouping = getProcessedAfterGrouping;
exports.readyItemForProcess = readyItemForProcess;
exports.getPaymentDetail = getPaymentDetail;
