'use strict';

/**
 * @ngdoc service
 * @name omsieApp.MissedOrderData
 * @description
 * # MissedOrderData
 * Factory in the omsieApp.
 */
angular.module('omsieApp')
    .factory('MissedOrderData', function() {
        var MissedOrderData = {
            'reasons': [{
                'label': 'Pick Fail',
                'value': 'PICKFAIL'
            }, {
                'label': 'QC Fail',
                'value': 'QCFAIL'
            }, {
                'label': 'Auto Pick Fail',
                'value': 'AUTOPICKFAIL'
            }],
            'orderStatuses': [{
                'label': 'INITIATED',
                'value': 'INITIATED'
            }, {
                'label': 'DELIVERED',
                'value': 'DELIVERED'
            }, {
                'label': 'CANCELLED',
                'value': 'CANCELLED'
            }, {
                'label': 'PAYMENTCONFIRMED',
                'value': 'PAYMENTCONFIRMED'
            }, {
                'label': 'CODPAYMENTPENDING',
                'value': 'CODPAYMENTPENDING'
            }, {
                'label': 'VERIFICATIONPENDING',
                'value': 'VERIFICATIONPENDING'
            }],
            'currentStatuses': [{
                'label': 'INITIATED',
                'value': 'INITIATED'
            }, {
                'label': 'DELIVERED',
                'value': 'DELIVERED'
            }, {
                'label': 'CANCELLED',
                'value': 'CANCELLED'
            }, {
                'label': 'UNASSIGNED',
                'value': 'UNASSIGNED'
            }, {
                'label': 'ASSIGNED',
                'value': 'ASSIGNED'
            }, {
                'label': 'SAPPICKPASS',
                'value': 'SAPPICKPASS'
            }, {
                'label': 'SAPPICKFAIL',
                'value': 'SAPPICKFAIL'
            }, {
                'label': 'PICKPASS',
                'value': 'PICKPASS'
            }, {
                'label': 'PICKFAIL',
                'value': 'PICKFAIL'
            }, {
                'label': 'QCFAIL',
                'value': 'QCFAIL'
            }, {
                'label': 'QCPASS',
                'value': 'QCPASS'
            }, {
                'label': 'DELIVERYMODIFIED',
                'value': 'DELIVERYMODIFIED'
            }, {
                'label': 'PACKED',
                'value': 'PACKED'
            }, {
                'label': 'INVOICED',
                'value': 'INVOICED'
            }, {
                'label': 'SHIPPED',
                'value': 'SHIPPED'
            }, {
                'label': 'READYFORCUSTOMERPICK',
                'value': 'READYFORCUSTOMERPICK'
            }, {
                'label': 'CUSTOMERPICKCOMPLETE',
                'value': 'CUSTOMERPICKCOMPLETE'
            }, {
                'label': 'CANDIDATE_FOR_RTO',
                'value': 'CANDIDATE_FOR_RTO'
            }, {
                'label': 'RTO_CONFIRMED',
                'value': 'RTO_CONFIRMED'
            }, {
                'label': 'RTO_REATTEMPT',
                'value': 'RTO_REATTEMPT'
            }, {
                'label': 'RTO_COMPLETED',
                'value': 'RTO_COMPLETED'
            }, {
                'label': 'RTO_RECEIVED',
                'value': 'RTO_RECEIVED'
            }, {
                'label': 'REPRINTINVOICE',
                'value': 'REPRINTINVOICE'
            }, {
                'label': 'POSPAYMENTPENDING',
                'value': 'POSPAYMENTPENDING'
            }, {
                'label': 'DELIVERYMODEAUTOUPGRADED',
                'value': 'DELIVERYMODEAUTOUPGRADED'
            }, {
                'label': 'RTO_INTRANSIT',
                'value': 'RTO_INTRANSIT'
            }, {
                'label': 'RTO_DELIVERED',
                'value': 'RTO_DELIVERED'
            }, {
                'label': 'RTO_COMPLETE_INTACT',
                'value': 'RTO_COMPLETE_INTACT'
            }, {
                'label': 'RTO_COMPLETE_DAMAGED',
                'value': 'RTO_COMPLETE_DAMAGED'
            }]
        };

        return MissedOrderData;
    });
