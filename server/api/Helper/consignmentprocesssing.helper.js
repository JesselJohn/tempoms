'use strict';
var Address = require('../Address/address.controller.js');
var FCCenter = require('../AFFCenter/ffcenter.controller.js');
var PaymentService = require('../APaymentdetails/payment.controller.js');
var BinService = require('../ABinNumber/bin.controller.js');
var Helper = require('./consignment.helper.js');
var _ = require('lodash');
var q = require('q');

var newOption = function(options) {
        this.host = options.host;
        this.port = options.port;
        this.headers = options.headers;
        this.method = options.method;
    };

var checkAddressNCustomer = function(customerDetails, addressDetails) {
    if (isRealValue(customerDetails) &&
        isRealValue(addressDetails) &&
        customerDetails['userId'] !== null &&
        addressDetails['addressID'] !== null) {
        return true;
    } else {
        return false;
    }
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

var isRealValue = function(obj) {
    return obj && obj !== "null" && obj !== "undefined";
};

var ProcessConsignmentObject = function(response, baseOption, fulfilmentCenterId, isadmin) {



    var processedData = {};



    if (isRealValue(response['customerDetails'])) {
        processedData['customerDetails'] = {};
        processedData['customerDetails'] = Helper.getCustomerDetail(response['customerDetails']);
    } else {
        console.log("Customer Details is Not A Object or is null");
    }

    if (isRealValue(response['paymentSummary'])) {
        processedData['paymentSummary'] = {};
        processedData['paymentSummary'] = Helper.getPaymentDetail(response['paymentSummary']);
    } else {
        console.log("Payment Details is Not A Object or is null");
    }

    if (isRealValue(response['voucherDetails'])) {
        if (response['voucherDetails']['voucherAmount'] !== null && response['voucherDetails']['voucherAmount'] !== 'null') {
            processedData['voucherAmount'] = response['voucherDetails']['voucherAmount'];
        } else {
            processedData['voucherAmount'] = 0;
        }

    } else {
        processedData['voucherAmount'] = 0;
        console.log("voucherDetails Is Not an Object Or Is Null");
    }



    processedData['paymentDetails'] = {};

    // Consignment Details Object
    processedData['consignmentDetails'] = {};
    processedData['consignmentDetails']['orderID'] = response['orderId'];
    processedData['consignmentDetails']['orderDate'] = response['orderDate'].split("[")[0];
   // processedData['consignmentDetails'].initialFfType = response.consignment.initialFfType;
    

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
                processedData['deliveryType'] = firstConsignment['ffType']['type']; // order Type
            } else {
                processedData['isStorePickUp'] = false;
                processedData['deliveryType'] = firstConsignment['ffType']['ffType']; // order Type

                if (processedData['deliveryType'] === 'standard') {
                    processedData['deliveryTypeForPrint'] = "Standard Delivery";
                } else if (processedData['deliveryType'] === 'sdd') {
                    processedData['deliveryTypeForPrint'] = "Same Day Delivery";
                } else if (processedData['deliveryType'] === 'ndd') {
                    processedData['deliveryTypeForPrint'] = "Next Day Delivery";
                }
            }

        }



        if (isRealValue(firstConsignment['ffCenter'])) {
            processedData['fullfilmentCenter'] = {};
            processedData['fullfilmentCenter']['name'] = firstConsignment['ffCenter']['fcName'];
            processedData['fullfilmentCenter']['fcType'] = firstConsignment['ffCenter']['fcType'];
            processedData['fullfilmentCenter']['fcid'] = firstConsignment['ffCenter']['fcid'];
            processedData['fullfilmentCenter']['isWareHouseConsignmentDetails'] = false;
            if (firstConsignment['ffCenter']['fcType'] === 'Warehouse') {
                processedData['fullfilmentCenter']['isWareHouseConsignmentDetails'] = true;
            }

            if (firstConsignment['ffCenter']['fcid'] === fulfilmentCenterId || isadmin) {
                processedData["canProcess"] = true;
            } else {
                processedData["canProcess"] = false;
            }


        } else {
            console.log('ffCenter is Null Object');
            processedData['fullfilmentCenter'] = {};
            processedData['fullfilmentCenter']['isWareHouseConsignmentDetails'] = false;
            processedData['fullfilmentCenter']['fcid'] = null;
            processedData["canProcess"] = false;
        }


        if (isRealValue(firstConsignment['slaEndTime'])) {

            var currentTime = new Date().getTime();

            //currentTime = currentDate.getTime();
            var slaEndTime = firstConsignment['slaEndTime'].split("[")[0];
            var slaEndTimeInMillisecond = new Date(slaEndTime).getTime();
            var countDown = parseInt((slaEndTimeInMillisecond - currentTime) / 1000);
            processedData['countDownInMS'] = countDown;

            if (countDown === 0 || countDown < 0) {
                processedData['countDownInMS'] = -1;
            } else {
                processedData['countDownInMS'] = countDown;
            }
        } else {
            processedData['countDownInMS'] = -1;
            console.log("slaEndTime is null");
        };

        if (processedData['fullfilmentCenter']['isWareHouseConsignmentDetails']) {
            processedData['countDownInMS'] = -1;
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

            processedData['logistic']['logisticsLink'] = logistic['trackingLink'];
            processedData['logistic']['delieveryDate'] = logistic['deliveryDate'];


            processedData['logistic']['CODAmount'] = logistic['CODAmount'];
            processedData['logistic']['dcCode'] = logistic['dcCode'];



            processedData['logistic']['airwayBillNumber'] = logistic['airwayBillNumber'];
            processedData['logistic']['barCode'] = logistic['barCode'];

            /// Collecble amount
            processedData['logistic']['codBarCode'] = logistic['codBarCode'];

            processedData['logistic']['shipmentCost'] = parseFloat(logistic['shipmentCost']);


            if (logistic['codamount'] !== null) {
                processedData['logistic']['codamount'] = logistic['codamount'];
            } else {
                processedData['logistic']['codamount'] = 0;
            }

            // Is fedEx
            if (logistic['courierName'] === 'FEDEX') {
                processedData['logistic']['isFEDEX'] = true;
            } else {
                processedData['logistic']['isFEDEX'] = false;
            }


            processedData['shippingdelta'] = processedData['logistic']['codamount'];

            // Extra value for fedex
            processedData['logistic']['fedexForwardShipmentType'] = logistic['fedexForwardShipmentType'] || false;
            processedData['logistic']['fedexReturnShipmentType'] = logistic['fedexReturnShipmentType'] || false;


            processedData['logistic']['fedexForwardFormId'] = logistic['fedexForwardFormId'] || false;
            processedData['logistic']['fedexReturnFormId'] = logistic['fedexReturnFormId'] || false;



            processedData['logistic']['fedexMeter'] = logistic['fedexMeter'] || false;
            processedData['logistic']['codAirwayBillNumber'] = logistic['codAirwayBillNumber'] || false;
            processedData['logistic']['countryCode'] = logistic['countryCode'] || false;


            processedData['logistic']['cityCode'] = logistic['cityCode'] || false;

            processedData['logistic']['fedexBillDt'] = logistic['fedexBillDt'] || false;

            processedData['logistic']['fedexBillTc'] = logistic['fedexBillTc'] || false;
            //////////


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

            processedData['consignmentStatusCode'] = Helper.getConsignmentHeader(firstConsignment['consignmentStatus'], processedData['isStorePickUp']);


            processedData['consignmentDetails']['consignmentStatus'] = firstConsignment['consignmentStatus'];

        } else {
            console.log("consignmentStatus is Not A Object or is null");
        }


        /**************************************
         *
         *   Process Data For Items
         *
         ***************************************/



        var ReadyItemObject = Helper.readyItemForProcess(itemsArrray, processedData['fullfilmentCenter']['isWareHouseConsignmentDetails'], fulfilmentCenterId)



        var itemsUnProcessedArray = ReadyItemObject.returnUnProcessedArray;


        var showTSlot = ReadyItemObject.showslotT;






        var finalUnProcessedData = {};

        finalUnProcessedData = DataGrouper(itemsUnProcessedArray, [

            'skuID',
            'brand',
            'size',
            'color',
            'image',


            'mrp',

            'description',

            'category',

            'styleCode',

            'quantityOrder',
            'quantityPicked',
            'quantityPickFail',
            'quantityQCFail'
        ]);


        processedData['unprocesseditems'] = Helper.getProcessedAfterGrouping(finalUnProcessedData);



        //////////////////////Processed Items Processing

        var itemsProcessedArray = [];

        itemsProcessedArray = ReadyItemObject.returnArray;

        processedData['itemCountInConsignment'] = itemsArrray.length;

        processedData['itemCountAfterProcess'] = itemsProcessedArray.length;

        if (processedData['itemCountInConsignment'] === processedData['itemCountAfterProcess']) {
            processedData['itemCountIsEqualToProcessedItemCount'] = true;
        } else {
            processedData['itemCountIsEqualToProcessedItemCount'] = false;
        }
        ////////////////Processing Finish////////////////////

        processedData['items'] = [];


        /// Group The data
        var finaldata = {};

        finaldata = DataGrouper(itemsProcessedArray, [
            'skuID',
            'brand',
            'size',
            'color',
            'image',
            'mrp',
            'description',
            'category',
            'styleCode',
            'sapStyleId',
            'quantityOrder',
            'quantityPicked',
            'quantityPickFail',
            'quantityQCFail'
        ]);

        // Process the group data


        processedData['items'] = Helper.getProcessedAfterGrouping(finaldata);
        processedData['grantTotal'] = 0;

        for (var i = processedData['items'].length - 1; i >= 0; i--) {
            processedData['grantTotal'] += processedData['items'][i]['totalNetAmount'];
        };

        var defered = q.defer();
        var promises = [];
        if (checkAddressNCustomer(processedData['customerDetails'], processedData['addressDetails'])) {


            var payload = {};
            payload['userId'] = processedData['customerDetails']['userId'];
            payload['addressID'] = processedData['addressDetails']['addressID'];

            promises.push(Address.get(new newOption(baseOption), payload));

        } else {

            promises.push(q({}));
        };


        if (processedData['fullfilmentCenter']['fcid'] !== null) {

            promises.push(FCCenter.get(new newOption(baseOption), processedData['fullfilmentCenter']['fcid']));
        } else {

            promises.push(q({}));
        };


        var isConsignmentEligileForCounting = false;
        isConsignmentEligileForCounting = PaymentService.isConsignmentEligileForCounting(firstConsignment['consignmentStatus']['consignmentStatus']);


        promises.push(PaymentService.get(new newOption(baseOption), processedData['consignmentDetails']['orderID']))
        promises.push(q.when({"number":"1"}));

        if (processedData['fullfilmentCenter']['isWareHouseConsignmentDetails'] === true) {

            promises.push(BinService.get(new newOption(baseOption), processedData['consignmentDetails']['consignmentID']))

        } else {
            promises.push(q({}));
        };


        return q.all(promises).then(function(responseQ) {

            processedData['addressDetails']['details'] = responseQ[0];
            processedData['ffcenterDetails'] = responseQ[1];
            processedData['paymentDetails'] = responseQ[2];
            processedData['numberofconsigment'] = responseQ[3];
            if (showTSlot && responseQ[4].hasOwnProperty("slotId") && responseQ[4].slotId === null) {
                processedData['binObject'] = { "consignmentId": responseQ[4].consignmentId, "slotId": "T" };
            } else {
                processedData['binObject'] = responseQ[4];
            }

            return processedData;

        }, function(error) {

            console.log(error);
            processedData['addressDetails']['details'] = {};
            processedData['ffcenterDetails'] = {};
            processedData['paymentDetails'] = {};
            processedData['numberofconsigment'] = {};
            processedData['binObject'] = {};
            return processedData;

        });

    } else {
        console.log("Consignment Is Not an Object Or Is Null");
        return q.reject(processedData);
    }

};


exports.ProcessConsignmentObject = ProcessConsignmentObject;
