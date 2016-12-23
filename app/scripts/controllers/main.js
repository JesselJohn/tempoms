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
            /////////////////////////////
            // Scope Property Bindings //
            /////////////////////////////

            $scope.MainData = MainData;

            ///////////////////
            // Service Calls //
            ///////////////////
            MainService.getDashboardData().then(function(data) {
                $scope.data = data;
            });
        }
    ]);
