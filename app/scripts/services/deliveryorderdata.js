'use strict';

/**
 * @ngdoc service
 * @name omsieApp.DeliveryOrderData
 * @description
 * # DeliveryOrderData
 * Factory in the omsieApp.
 */
angular.module('omsieApp')
    .factory('DeliveryOrderData', function() {
        var DeliveryOrderData = {
            'orderStartDate': null,
            'orderStartMinDate': new Date(),
            'orderEndDate': null,
            'deliveryStartDate': null,
            'deliveryStartMinDate': new Date(),
            'deliveryEndDate': null,
            'orderStatusOptions': [
                "INITIATED",
                "DELIVERED",
                "CANCELLED",
                "PAYMENTCONFIRMED",
                "CODPAYMENTPENDING",
                "VERIFICATIONPENDING"
            ],
            'orderStatusSelected': [],
            'consignmentStatusOptions': [
                "INITIATED",
                "DELIVERED",
                "CANCELLED",
                "UNASSIGNED",
                "ASSIGNED",
                "SAPPICKPASS",
                "SAPPICKFAIL",
                "PICKPASS",
                "PICKFAIL",
                "QCFAIL",
                "QCPASS",
                "DELIVERYMODIFIED",
                "PACKED",
                "INVOICED",
                "SHIPPED",
                "READYFORCUSTOMERPICK",
                "CUSTOMERPICKCOMPLETE",
                "CANDIDATE_FOR_RTO",
                "RTO_CONFIRMED",
                "RTO_REATTEMPT",
                "RTO_COMPLETED",
                "RTO_RECEIVED",
                "REPRINTINVOICE",
                "POSPAYMENTPENDING",
                "DELIVERYMODEAUTOUPGRADED",
                "RTO_INTRANSIT",
                "RTO_DELIVERED",
                "RTO_COMPLETE_INTACT",
                "RTO_COMPLETE_DAMAGED"
            ],
            'consignmentStatusSelected': [],
            'fulfilmentTypeOptions': [
                "ndd",
                "sdd",
                "standard"
            ],
            'fulfilmentTypeSelected': []
        };

        return DeliveryOrderData;
    });
