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
                "CANCELLED"
            ],
            'orderStatusSelected': [],
            'consignmentStatusOptions': [
                "INITIATED",
                "DELIVERED",
                "CANCELLED"
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
