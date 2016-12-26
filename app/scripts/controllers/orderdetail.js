'use strict';

/**
 * @ngdoc function
 * @name omsieApp.controller:OrderdetailCtrl
 * @description
 * # OrderdetailCtrl
 * Controller of the omsieApp
 */
angular.module('omsieApp')
    .controller('OrderdetailCtrl', ['OrderDetailService', '$routeParams', '$scope',
        function(OrderDetailService, $routeParams, $scope) {
            OrderDetailService
                .getOrderDetails($routeParams.consignmentId)
                .then(function(data) {
                    $scope.orderDetailsData = data;
                });
        }
    ]);
