'use strict';

/**
 * @ngdoc service
 * @name omsieApp.MainData
 * @description
 * # MainData
 * Factory in the omsieApp.
 */
angular.module('omsieApp')
    .factory('MainData', function() {
        var MainData = {
            'storeDeliveryPickups': [
                "ALL",
                "ASSIGNED",
                "QCPASS",
                "DELIVERYMODIFIED",
                "INVOICED",
                "PACKED",
                "REPRINTINVOICE",
                "SHIPPED"
            ],
            'warehouseDeliverPickups': [
                "ALL",
                "ASSIGNED",
                "SAPPICKPASS",
                "PICKPASS",
                "QCPASS",
                "DELIVERYMODIFIED",
                "INVOICED",
                "PACKED",
                "REPRINTINVOICE",
                "SHIPPED"
            ],
            'pickupOrders': [
                "ALL",
                "ASSIGNED",
                "POSPAYMENTPENDING",
                "QCPASS",
                "INVOICED",
                "READYFORCUSTOMERPICK",
                "CUSTOMERPICKCOMPLETE"
            ]
        };

        return MainData;
    });
