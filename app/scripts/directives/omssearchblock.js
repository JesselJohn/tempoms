'use strict';

/**
 * @ngdoc directive
 * @name omsieApp.directive:omsSearchBlock
 * @description
 * # omsSearchBlock
 */
angular.module('omsieApp')
    .directive('omsSearchBlock', ['PickupOrderData',
        function(PickupOrderData) {
            return {
                scope: {
                    'onFilterChange': "&"
                },
                templateUrl: '/views/omssearchblock.html',
                restrict: 'E',
                replace: true,
                controller: ['$scope',
                    function($scope) {
                        function toggleFormVisibilityFn() {
                            $scope.isFormVisible = !$scope.isFormVisible;
                        }

                        /////////////////////////////
                        // Scope Property Bindings //
                        /////////////////////////////
                        $scope.isFormVisible = false;
                        $scope.PickupOrderData = PickupOrderData;
                        $scope.toggleFormVisibility = toggleFormVisibilityFn;
                    }
                ]
            };
        }
    ]);
