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
            'orderStatusOptions': [{
                'label': "INITIATED",
                'value': "INITIATED",
                'selected': false
            }, {
                'label': "DELIVERED",
                'value': "DELIVERED",
                'selected': false
            }, {
                'label': "CANCELLED",
                'value': "CANCELLED",
                'selected': false
            }, {
                'label': "PAYMENTCONFIRMED",
                'value': "PAYMENTCONFIRMED",
                'selected': false
            }, {
                'label': "CODPAYMENTPENDING",
                'value': "CODPAYMENTPENDING",
                'selected': false
            }, {
                'label': "VERIFICATIONPENDING",
                'value': "VERIFICATIONPENDING",
                'selected': false
            }],
            'orderStatusSelected': [],
            'consignmentStatusOptions': [{
                'label': "INITIATED",
                'value': "INITIATED",
                'selected': false
            }, {
                'label': "DELIVERED",
                'value': "DELIVERED",
                'selected': false
            }, {
                'label': "CANCELLED",
                'value': "CANCELLED",
                'selected': false
            }, {
                'label': "UNASSIGNED",
                'value': "UNASSIGNED",
                'selected': false
            }, {
                'label': "ASSIGNED",
                'value': "ASSIGNED",
                'selected': false
            }, {
                'label': "SAPPICKPASS",
                'value': "SAPPICKPASS",
                'selected': false
            }, {
                'label': "SAPPICKFAIL",
                'value': "SAPPICKFAIL",
                'selected': false
            }, {
                'label': "PICKPASS",
                'value': "PICKPASS",
                'selected': false
            }, {
                'label': "PICKFAIL",
                'value': "PICKFAIL",
                'selected': false
            }, {
                'label': "QCFAIL",
                'value': "QCFAIL",
                'selected': false
            }, {
                'label': "QCPASS",
                'value': "QCPASS",
                'selected': false
            }, {
                'label': "DELIVERYMODIFIED",
                'value': "DELIVERYMODIFIED",
                'selected': false
            }, {
                'label': "PACKED",
                'value': "PACKED",
                'selected': false
            }, {
                'label': "INVOICED",
                'value': "INVOICED",
                'selected': false
            }, {
                'label': "SHIPPED",
                'value': "SHIPPED",
                'selected': false
            }, {
                'label': "READYFORCUSTOMERPICK",
                'value': "READYFORCUSTOMERPICK",
                'selected': false
            }, {
                'label': "CUSTOMERPICKCOMPLETE",
                'value': "CUSTOMERPICKCOMPLETE",
                'selected': false
            }, {
                'label': "CANDIDATE_FOR_RTO",
                'value': "CANDIDATE_FOR_RTO",
                'selected': false
            }, {
                'label': "RTO_CONFIRMED",
                'value': "RTO_CONFIRMED",
                'selected': false
            }, {
                'label': "RTO_REATTEMPT",
                'value': "RTO_REATTEMPT",
                'selected': false
            }, {
                'label': "RTO_COMPLETED",
                'value': "RTO_COMPLETED",
                'selected': false
            }, {
                'label': "RTO_RECEIVED",
                'value': "RTO_RECEIVED",
                'selected': false
            }, {
                'label': "REPRINTINVOICE",
                'value': "REPRINTINVOICE",
                'selected': false
            }, {
                'label': "POSPAYMENTPENDING",
                'value': "POSPAYMENTPENDING",
                'selected': false
            }, {
                'label': "DELIVERYMODEAUTOUPGRADED",
                'value': "DELIVERYMODEAUTOUPGRADED",
                'selected': false
            }, {
                'label': "RTO_INTRANSIT",
                'value': "RTO_INTRANSIT",
                'selected': false
            }, {
                'label': "RTO_DELIVERED",
                'value': "RTO_DELIVERED",
                'selected': false
            }, {
                'label': "RTO_COMPLETE_INTACT",
                'value': "RTO_COMPLETE_INTACT",
                'selected': false
            }, {
                'label': "RTO_COMPLETE_DAMAGED",
                'value': "RTO_COMPLETE_DAMAGE",
                'selected': false
            }],
            'consignmentStatusSelected': [],
            'fulfilmentTypeOptions': [{
                'label': "ndd",
                'value': "ndd",
                'selected': false
            }, {
                'label': "sdd",
                'value': "sdd",
                'selected': false
            }, {
                'label': "standard",
                'value': "standar",
                'selected': false
            }],
            'fulfilmentTypeSelected': []
        };

        return DeliveryOrderData;
    });
