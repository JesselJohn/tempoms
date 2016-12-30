/**
 * @ngdoc function
 * @name omsieApp.controller:MissedorderCtrl
 * @description
 * # MissedorderCtrl
 * Controller of the omsieApp
 */
angular.module('omsieApp')
    .controller('MissedorderCtrl', ['MissedOrderService', 'MissedOrderData', '$scope',
        function(MissedOrderService, MissedOrderData, $scope) {
            function onFilterChangeFn(obj) {
                MissedOrderService
                    .getMissedorderData(obj)
                    .then(function(data) {
                        MissedOrderData.data = data;
                    });
            }

            /////////////////////////////
            // Scope Property Bindings //
            /////////////////////////////

            $scope.MissedOrderData = MissedOrderData;
            $scope.onFilterChange = onFilterChangeFn;
        }
    ]);
