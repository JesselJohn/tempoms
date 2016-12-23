'use strict';

var _ = require('lodash');
var environment = require('../../config/environment');
var Address = require('../Address/address.controller.js');

var isRealValue = function(obj) {
    return obj && obj !== "null" && obj !== "undefined";
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

var consignmentdetailsfunction =function( consignmentObject ,  baseOptionForAddress) {
    var response;
    response = consignmentObject;
    var processedData = {};

    // Customer Details

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

    
    // Payment Detail
    if (isRealValue(response['paymentSummary'])) {
        var paymentDetails = response['paymentSummary'];
        processedData['paymentDetails'] = {};

        if (paymentDetails['cod'] !== "null") {
            processedData['paymentDetails']['paymentMode'] = 'COD';
            processedData['isCOD'] = true;
        }

        if (paymentDetails['cash'] !== "null") {
            processedData['paymentDetails']['paymentMode'] = 'CASH';
            processedData['isCOD'] = false;

        }

        if (paymentDetails['online'] !== "null") {
            processedData['paymentDetails']['paymentMode'] = 'ONLINE';
            processedData['isCOD'] = false;

        }

        if (paymentDetails['card'] !== "null") {
            processedData['paymentDetails']['paymentMode'] = 'CARD';
            processedData['isCOD'] = false;

        }
    } else {
        console.log("Payment Details Is Not an Object Or Is Null");
    }



    // Consignment Details Object
    processedData['consignmentDetails'] = {};
    processedData['consignmentDetails']['orderID'] = response['orderId'];
    processedData['consignmentDetails']['orderDate'] = response['orderDate'].split("[")[0];

    if (isRealValue(response['orderStatus'])) {
        processedData['consignmentDetails']['orderStatus'] = response['orderStatus']['orderStatus'];
    } else {
        console.log("orderStatus Is Not an Object Or Is Null");
    }

    // Consignment Details
    if (isRealValue(response['consignment'])) {


        var firstConsignment = response['consignment'];

        if (isRealValue(firstConsignment['ffType'])) {
            if (firstConsignment['ffType']['type'] === 'storepick') {
                processedData['isStorePickUp'] = true;
            } else {
                processedData['isStorePickUp'] = false;
            }
        }

        if (isRealValue(firstConsignment['ffCenter'])) {
            processedData['fullfilmentCenter'] = {};
            processedData['fullfilmentCenter']['name'] = firstConsignment['ffCenter']['fcName'];
            processedData['fullfilmentCenter']['pan'] = firstConsignment['ffCenter']['pan'];
            processedData['fullfilmentCenter']['cinnumber'] = firstConsignment['ffCenter']['cinnumber'];
            processedData['fullfilmentCenter']['tinnumber'] = firstConsignment['ffCenter']['tinnumber'];
            processedData['fullfilmentCenter']['postCode'] = firstConsignment['ffCenter']['postCode'];

        } else {
            console.log('ffCenter is Null Object');
        }

        if (isRealValue(firstConsignment['addressDetails'])) {
            processedData['addressDetails'] = {};
            processedData['addressDetails']['addressID'] = firstConsignment['addressDetails']['addressId'];
        } else {
            console.log('ffCenter is Null Object');
        }

        if (firstConsignment['invoiceId'] === null) {
            processedData['isinvoiceIdGenerated'] = false;
        } else {
            processedData['isinvoiceIdGenerated'] = true;
            processedData['invoiceId'] = firstConsignment['invoiceId'];
            processedData['invoiceDate'] = firstConsignment['invoiceDate'].split("[")[0];
        }

        processedData['consignmentDetails']['consignmentID'] = firstConsignment['consignmentId'];
        processedData['consignmentDetails']['consignmentItemCount'] = firstConsignment['itemCount'];


        var itemsArrray = firstConsignment['items'];

        var firstItem = itemsArrray[0];

        
        //Logistic Object

        processedData['logistic'] = {};

        if (isRealValue(firstConsignment['logisticsDetails'])) {
            var logistic = firstConsignment['logisticsDetails'];
            processedData['logistic']['shippingPatner'] = logistic['courierName'];
            processedData['logistic']['courierCode'] = logistic['courierCode'];
            processedData['logistic']['logisticsLink'] = logistic['trackingLink'];
            processedData['logistic']['airwayBillNumber'] = logistic['airwayBillNumber'];
            processedData['logistic']['delieveryDate'] = logistic['deliveryDate'];

        } else {
            console.log("orderStatus Is Not an Object Or Is Null");
        }

        if (isRealValue(firstConsignment['ffType'])) {
            processedData['logistic']['shippingMethod'] = firstConsignment['ffType']['ffType']; // Delivery Type
        } else {
            console.log('ffType is Null Object');
        }

        var sumofConsignment = 0;

        for (var item in itemsArrray) {

            sumofConsignment = sumofConsignment + parseInt(itemsArrray[item]['itemPricingDetails']['sp']);
        };

        processedData['consignmentDetails']['totalCost'] = sumofConsignment;


        // Ordering Store
        if (isRealValue(response['orderingCenter'])) {
            processedData['consignmentDetails']['orderingStore'] = response['orderingCenter']['fcName'];
        } else {
            console.log("orderingCenter is Not A Object or is null");
        }

        // Consignment Status
        if (isRealValue(firstConsignment['consignmentStatus'])) {
            var consignmentStatusObj = firstConsignment['consignmentStatus'];



            if (processedData['isStorePickUp'] === true) //  StorePick Is True
            {
                if (consignmentStatusObj['consignmentStatus'] === 'ASSIGNED') {
                    processedData['consignmentStatusCode'] = 1;
                } // Initialised 

                if (
                    consignmentStatusObj['consignmentStatus'] === 'QCFAIL' ||
                    consignmentStatusObj['consignmentStatus'] === 'PICKFAIL'
                ) {
                    processedData['consignmentStatusCode'] = 6;
                }
                if (
                    consignmentStatusObj['consignmentStatus'] === 'PICKFAIL'
                ) {
                    processedData['consignmentStatusCode'] = 7;
                }
                if (
                    consignmentStatusObj['consignmentStatus'] === 'QCPASS'
                ) {
                    processedData['consignmentStatusCode'] = 2;
                }

                if (
                    consignmentStatusObj['consignmentStatus'] === 'INVOICED'
                ) {
                    processedData['consignmentStatusCode'] = 3;
                }

                if (
                    consignmentStatusObj['consignmentStatus'] === 'READYFORCUSTOMERPICK'
                ) {
                    processedData['consignmentStatusCode'] = 4;
                }
                if (
                    consignmentStatusObj['consignmentStatus'] === 'CUSTOMERPICKCOMPLETE'
                ) {
                    processedData['consignmentStatusCode'] = 5;
                }
                if (consignmentStatusObj['consignmentStatus'] === 'INITIATED' ||
                    consignmentStatusObj['consignmentStatus'] === 'UNASSIGNED' ||
                    consignmentStatusObj['consignmentStatus'] === 'SAPPICKPASS' ||
                    consignmentStatusObj['consignmentStatus'] === 'SAPPICKFAIL') {
                    processedData['consignmentStatusCode'] = 0;
                }
                if (consignmentStatusObj['consignmentStatus'] === 'CANCELLED') {
                    processedData['consignmentStatusCode'] = 100;
                }
            } else {
                if (
                    consignmentStatusObj['consignmentStatus'] === 'ASSIGNED'
                ) {
                    processedData['consignmentStatusCode'] = 1;
                } // Initialised 


                if (
                    consignmentStatusObj['consignmentStatus'] === 'QCPASS'
                ) {
                    processedData['consignmentStatusCode'] = 2;
                }

                if (
                    consignmentStatusObj['consignmentStatus'] === 'INVOICED'
                ) {
                    processedData['consignmentStatusCode'] = 3;
                }

                if (
                    consignmentStatusObj['consignmentStatus'] === 'PACKED'
                ) {
                    processedData['consignmentStatusCode'] = 4;
                }
                if (
                    consignmentStatusObj['consignmentStatus'] === 'SHIPPED'
                ) {
                    processedData['consignmentStatusCode'] = 5;
                }

                if (consignmentStatusObj['consignmentStatus'] === 'INITIATED' ||
                    consignmentStatusObj['consignmentStatus'] === 'UNASSIGNED' ||
                    consignmentStatusObj['consignmentStatus'] === 'SAPPICKPASS' ||
                    consignmentStatusObj['consignmentStatus'] === 'SAPPICKFAIL') {
                    processedData['consignmentStatusCode'] = 0;
                }

                if (consignmentStatusObj['consignmentStatus'] === 'CANCELLED') {
                    processedData['consignmentStatusCode'] = 100;
                }
            }


            processedData['consignmentDetails']['consignmentStatus'] = firstConsignment['consignmentStatus'];

        } else {
            console.log("consignmentStatus is Not A Object or is null");
        }


        /**************************************
         *
         *   Process Data For Items
         *
         ***************************************/

        var itemsProcessedArray = [];

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
                currentItem['itemStatus']['itemStatus'] === 'PICKFAIL') {

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
            processedItemInstance['brand'] = mboitemDetail['brand'];
            processedItemInstance['size'] = mboitemDetail['size'];
            processedItemInstance['color'] = mboitemDetail['color'];
            processedItemInstance['image'] = mboitemDetail['image'];


            processedItemInstance['mrp'] = mboitemDetail['mrp'];
            processedItemInstance['tradesp'] = currentItem['itemPricingDetails']['tradeSp'];
            processedItemInstance['discount'] = currentItem['itemPricingDetails']['discount'];
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

            //Push to array
            itemsProcessedArray.push(processedItemInstance);
        };



        ////////////////Processing Finish////////////////////

        processedData['items'] = [];

        /// Group The data
        var finaldata =

            DataGrouper(itemsProcessedArray, [

                'skuID',
                'brand',
                'size',
                'color',
                'image',


                'mrp',


                'styleCode',

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
            finalObject['styleCode'] = commonData['styleCode'];
            finalObject['size'] = commonData['size'];
            finalObject['color'] = commonData['color'];


            // Inside common data
            finalObject['mrp'] = commonData['mrp'];


            finalObject['image'] = commonData['image'];

            finalObject['quantityOrder'] = currentItem['itemIDs'].length;

            finalObject['quantityPickFail'] = 0;
            finalObject['quantityPicked'] = 0;
            finalObject['quantityQCFail'] = 0;

            finalObject['totalmrp'] = (finalObject['mrp']) * (currentItem['itemIDs'].length);
            finalObject['totalsp'] = 0;
            finalObject['totaltradeSP'] = 0;
            finalObject['totaldiscount'] = 0;
            finalObject['totaltax'] = 0;
            finalObject['totalNetAmount'] = 0;
            // Iterate over 
            for (var i = currentItem['itemIDs'].length - 1; i >= 0; i--) {

                finalObject['totalsp'] += currentItem['itemIDs'][i]['sp'];
                finalObject['totaltradeSP'] += currentItem['itemIDs'][i]['tradesp'];
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


            processedData['items'].push(finalObject);
        };

        processedData['grantTotal'] = 0;
        for (var i = processedData['items'].length - 1; i >= 0; i--) {
            processedData['grantTotal'] += processedData['items'][i]['totalNetAmount'];
        };
    } else {
        console.log("Consignment Is Not an Object Or Is Null");
    }
    

    if (
        isRealValue(processedData['customerDetails']) &&
        isRealValue(processedData['addressDetails']) &&
        processedData['customerDetails']['userId'] !== null &&
        processedData['addressDetails']['addressID'] !== null) {
        var payload = {};
        payload['userId'] = processedData['customerDetails']['userId'];
        payload['addressID'] = processedData['addressDetails']['addressID'];
        //return processedData;
        return Address.get(baseOptionForAddress, payload)
            .then(function(addressresponse) {
                
                processedData['addressDetails']['details'] = addressresponse;
                return processedData;
            }, function(error) {

                
                processedData['addressDetails']['details'] = {};
                return processedData;
            });
    } else {

        console.log("USER ID AND ADDRESSID SHOULD NOT BE NULL");


        var payload = {};
        payload['userId'] = '';
        payload['addressID'] = '';
        //return processedData;
        return Address.get(baseOptionForAddress, payload)
            .then(function(addressresponse) {
                
                processedData['addressDetails']['details'] = {};
                return processedData;
            }, function(error) {

                
                processedData['addressDetails']['details'] = {};
                return processedData;
            });
    }
}

exports.consignmentdetailsfunction = consignmentdetailsfunction;
