'use strict';

/**
 * @ngdoc directive
 * @name omsieApp.directive:omsSearchBlock
 * @description
 * # omsSearchBlock
 */
angular.module('omsieApp')
    .directive('omsDelayedSearchBlock', ['DeliveryorderService',
        function(DeliveryorderService) {
            return {
                scope: {
                    'delayedData': "=",
                    'onFilterChange': "&"
                },
                templateUrl: 'views/omsdelayedsearchblock.html',
                restrict: 'E',
                replace: true,
                controller: ['$scope',
                    function($scope) {
                        ///////////////
                        // Functions //
                        ///////////////

                        function toggleFormVisibilityFn() {
                            $scope.isFormVisible = !$scope.isFormVisible;
                        }

                        function filterSearchFn() {
                            $scope.delayedData.data = null;
                            $scope.$$postDigest(function() {
                                $scope.onFilterChange({
                                    'filter': {
                                        'consignmentStatus': $scope.delayedData.consignmentStatusSelected.join(","),
                                        'page': "0",
                                        'size': "10"
                                    }
                                });
                            });
                        };

                        /////////////////////////////
                        // Scope Property Bindings //
                        /////////////////////////////
                        $scope.isFormVisible = false;
                        $scope.toggleFormVisibility = toggleFormVisibilityFn;
                        $scope.filterSearch = filterSearchFn;

                        ////////////////////
                        // Function Calls //
                        ////////////////////

                        filterSearchFn();
                    }
                ]
            };
        }
    ]);
