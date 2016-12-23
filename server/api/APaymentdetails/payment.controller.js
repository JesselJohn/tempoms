var _ = require('lodash');
var environment = require('../../config/environment');
var PaymentService = require('../service');
var OrderService = require('../service');

var isRealValue = function(obj) {
    return obj && obj !== "null" && obj !== "undefined";
};

var isConsignmentEligileForCounting = function(consignmentStatus) {

    if (consignmentStatus === "INITIATED" ||
        consignmentStatus === "DELIVERED" ||
        consignmentStatus === "UNASSIGNED" ||
        consignmentStatus === "ASSIGNED" ||
        consignmentStatus === "SAPPICKPASS" ||
        consignmentStatus === "SAPPICKFAIL" ||
        consignmentStatus === "PICKPASS" ||
        consignmentStatus === "PICKFAIL" ||
        consignmentStatus === "QCFAIL" ||
        consignmentStatus === "QCPASS" ||
        consignmentStatus === "DELIVERYMODIFIED" ||
        consignmentStatus === "PACKED" ||
        consignmentStatus === "INVOICED" ||
        consignmentStatus === "SHIPPED" ||
        consignmentStatus === "CUSTOMERPICKCOMPLETE" ||
        consignmentStatus === "REPRINTINVOICE" ||
        consignmentStatus === "POSPAYMENTPENDING" ||
        consignmentStatus === "CANDIDATE_FOR_RTO" ||
        consignmentStatus === "RTO_REATTEMPT" ||
        consignmentStatus === "READYFORCUSTOMERPICK") {
        return true;
    } else {
        return false;
    }
};

var get = function(baseOption, orderID) {


    var options = {};
    _.extend(options , baseOption);


    options.path = environment.optimusPrime.domainName + '/order/' + orderID + '/payment';

    return PaymentService.getData(options)
        .then(function(response) {

                response = JSON.parse(response);


                var paymentDetails = {};

                paymentDetails.paymentAmount = 0;
                paymentDetails.paymentMode = "";
                paymentDetails.isCOD = true;


                var paymentType = "";

                if (response.length !== 0) {


                    // payment type for UI
                    for (var i = response.length - 1; i >= 0; i--) {

                        var paymentObject = response[i];
                        paymentType = paymentType + paymentObject.paymentMode + " , ";

                    };

                    paymentDetails.paymentMode = paymentType.substring(0, paymentType.length - 3);


                    // COD

                    for (var i = response.length - 1; i >= 0; i--) {

                        var paymentObject = response[i];

                        //  CASH_ON_DELIVERY , SOM_POS , VOUCHER



                        if (paymentObject.paymentMode === 'CREDIT_CARD' || paymentObject.paymentMode === 'DEBIT_CARD' || paymentObject.paymentMode === 'NET_BANKING' || paymentObject.paymentMode === 'SOM_POS' || paymentObject.paymentMode === 'NNNOW_CASH') {
                            paymentDetails.isCOD = false; // is prepaid
                            break;
                        }


                    };


                    var VOUCHER = false;
                    
                    // COD AND VOUCHER


                    for (var i = response.length - 1; i >= 0; i--) {

                        var paymentObject = response[i];

                        if (paymentObject.paymentMode === 'VOUCHER') {
                            VOUCHER = true;
                        }

                    };


                    if (VOUCHER) {
                        paymentDetails.voucherUsed = true;
                    }else{
                        paymentDetails.voucherUsed = false;
                    }

                    return paymentDetails;
                } else {
                    return paymentDetails;
                }

            },
            function(err) {
                return { error: "Not Found" };
            });
};

var getNumberOfConsignment = function(baseOption, orderID) {

    var options = {};

    _.extend(options , baseOption);

    options.path = environment.optimusPrime.domainName + '/order/' + orderID;

    return OrderService.getData(options)
        .then(function(response) {

                response = JSON.parse(response);

                var consignmentArray = response.consignments;

                var deliveryModifiedNumber = {};

                deliveryModifiedNumber.sdd = 0;
                deliveryModifiedNumber.standard = 0;
                deliveryModifiedNumber.ndd = 0;


                for (var i = consignmentArray.length - 1; i >= 0; i--) {
                    var firstConsignment = consignmentArray[i];
                    var consignmentStatus = firstConsignment['consignmentStatus']['consignmentStatus'];


                    if (isConsignmentEligileForCounting(consignmentStatus)) {
                        /// Delivery Type
                        var deliveryType = firstConsignment['ffType']['ffType']; // order Type

                        if (deliveryType === 'standard') {
                            deliveryModifiedNumber.standard = 0;

                        } else if (deliveryType === 'sdd') {
                            deliveryModifiedNumber.sdd = 0;

                        } else if (deliveryType === 'ndd') {
                            deliveryModifiedNumber.ndd = 0;

                        }
                    }


                };

                if (deliveryModifiedNumber.ndd === 0) {
                    deliveryModifiedNumber.ndd = 1;
                }
                if (deliveryModifiedNumber.standard === 0) {
                    deliveryModifiedNumber.standard = 1;
                }
                if (deliveryModifiedNumber.sdd === 0) {
                    deliveryModifiedNumber.sdd = 1;
                }

                return deliveryModifiedNumber;
            },
            function(err) {
                return {
                    sdd: 1,
                    ndd: 1,
                    standard: 1
                };
            });
};


exports.get = get;
exports.getNumberOfConsignment = getNumberOfConsignment;
exports.isConsignmentEligileForCounting = isConsignmentEligileForCounting;
