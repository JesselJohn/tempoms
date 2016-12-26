'use strict';

/**
 * @ngdoc function
 * @name omsieApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the omsieApp
 */
angular.module('omsieApp')
    .controller('MainCtrl', ['MainService', 'MainData', '$scope',
        function(MainService, MainData, $scope) {
            ///////////////
            // Functions //
            ///////////////

            function getAllOrdersNumFn() {
                if (!$scope.data) {
                    return "";
                }
                return $scope.data.store.DELIVERY.ASSIGNED + $scope.data.store.STOREPICK.ASSIGNED + $scope.data.warehouse.DELIVERY.ASSIGNED
            }
            /////////////////////////////
            // Scope Property Bindings //
            /////////////////////////////

            $scope.MainData = MainData;
            $scope.getAllOrdersNum = getAllOrdersNumFn;

            ///////////////////
            // Service Calls //
            ///////////////////
            MainService.getDashboardData().then(function(data) {
                $scope.data = data;
            });

            MainService.getReturnData().then(function(data) {
                $scope.returnData = data;
                console.log(data);
            });
        }
    ]);
