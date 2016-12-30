/**
 * @ngdoc function
 * @name omsieApp.controller:DelayedorderCtrl
 * @description
 * # DelayedorderCtrl
 * Controller of the omsieApp
 */
angular.module('omsieApp')
    .controller('DelayedorderCtrl', ['DelayedOrderService', 'DelayedOrderData', '$scope',
        function(DelayedOrderService, DelayedOrderData, $scope) {
            function onFilterChangeFn(obj) {
                DelayedOrderService
                    .getDelayedorderData(obj)
                    .then(function(data) {
                        DelayedOrderData.data = data;
                    });
            }

            /////////////////////////////
            // Scope Property Bindings //
            /////////////////////////////

            $scope.DelayedOrderData = DelayedOrderData;
            $scope.onFilterChange = onFilterChangeFn;
        }
    ]);
