'use strict';

/**
 * @ngdoc function
 * @name omsieApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the omsieApp
 */
angular.module('omsieApp')
    .controller('PickuporderCtrl', ['PickuporderService', '$scope',
        function(PickuporderService, $scope) {
            PickuporderService.getPickuporderData().then(function(data) {
                $scope.pickUpdata = data;
                console.log(data);
            });
        }
    ]);
