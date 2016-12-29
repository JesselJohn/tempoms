'use strict';

/**
 * @ngdoc function
 * @name omsieApp.controller:DeliveryorderCtrl
 * @description
 * # DeliveryorderCtrl
 * Controller of the omsieApp
 */
angular.module('omsieApp')
    .controller('DeliveryorderCtrl', ['DeliveryorderService', 'DeliveryOrderData', '$scope',
        function(DeliveryorderService, DeliveryOrderData, $scope) {
            function onFilterChangeFn(obj) {
                DeliveryorderService
                    .getDeliveryorderData(obj)
                    .then(function(data) {
                        DeliveryOrderData.data = data;
                    });
            }

            /////////////////////////////
            // Scope Property Bindings //
            /////////////////////////////

            $scope.DeliveryOrderData = DeliveryOrderData;
            $scope.onFilterChange = onFilterChangeFn;
        }
    ]);
