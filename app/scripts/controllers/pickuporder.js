'use strict';

/**
 * @ngdoc function
 * @name omsieApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the omsieApp
 */
angular.module('omsieApp')
    .controller('PickuporderCtrl', ['PickuporderService', 'PickupOrderData', '$scope',
        function(PickuporderService, PickupOrderData, $scope) {
            /////////////////////////////
            // Scope Property Bindings //
            /////////////////////////////

            $scope.PickupOrderData = PickupOrderData;

            ///////////////////
            // Service Calls //
            ///////////////////
            PickuporderService.getPickuporderData().then(function(data) {
                $scope.pickUpdata = data;
            });
        }
    ]);
