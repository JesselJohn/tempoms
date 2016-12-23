'use strict';

/**
 * @ngdoc function
 * @name omsieApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the omsieApp
 */
angular.module('omsieApp')
    .controller('MainCtrl', ['$scope', 'MainService',
        function($scope, MainService) {
            MainService.getDashboardData().then(function(data) {
                console.log(data);
            });
        }
    ]);
