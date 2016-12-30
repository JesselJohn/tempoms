'use strict';

/**
 * @ngdoc service
 * @name omsieApp.DelayedOrderData
 * @description
 * # DelayedOrderData
 * Factory in the omsieApp.
 */
angular.module('omsieApp')
    .factory('DelayedOrderData', function() {
        var DelayedOrderData = {
            'consignmentStatusSelected': [],
            'consignmentStatusOptions': [{
                'label': "ASSIGNED",
                'value': "ASSIGNED",
                'selected': true
            }, {
                'label': "SAPPICKPASS",
                'value': "SAPPICKPASS",
                'selected': true
            }, {
                'label': "SAPPICKFAIL",
                'value': "SAPPICKFAIL",
                'selected': false
            }, {
                'label': "PICKPASS",
                'value': "PICKPASS",
                'selected': true
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
                'label': "CANDIDATE_FOR_RTO",
                'value': "CANDIDATE_FOR_RTO",
                'selected': false
            }, {
                'label': "RTO_REATTEMPT",
                'value': "RTO_REATTEMPT",
                'selected': false
            }, {
                'label': "REPRINTINVOICE",
                'value': "REPRINTINVOICE",
                'selected': false
            }, {
                'label': "POSPAYMENTPENDING",
                'value': "POSPAYMENTPENDING",
                'selected': false
            }]
        };

        return DelayedOrderData;
    });
