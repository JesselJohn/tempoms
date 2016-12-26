'use strict';

/**
 * @ngdoc service
 * @name omsieApp.PickupOrderData
 * @description
 * # PickupOrderData
 * Factory in the omsieApp.
 */
angular.module('omsieApp')
    .factory('PickupOrderData', function() {
        var PickupOrderData = {
            'orderStartDate': new Date(),
            'orderStartMinDate': new Date(),
            'orderEndDate': null,
            'filter': {

            }
        };

        return PickupOrderData;
    });
