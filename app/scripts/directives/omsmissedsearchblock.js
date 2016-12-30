'use strict';

/**
 * @ngdoc directive
 * @name omsieApp.directive:omsSearchBlock
 * @description
 * # omsSearchBlock
 */
angular.module('omsieApp')
    .directive('omsMissedSearchBlock', ['DeliveryorderService',
        function(DeliveryorderService) {
            return {
                scope: {
                    'missedData': "=",
                    'onFilterChange': "&"
                },
                templateUrl: 'views/omsmissedsearchblock.html',
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
                            $scope.missedData.data = null;
                            $scope.onFilterChange({
                                'filter': {
                                    'consignmentId': $scope.consignmentId,
                                    'orderId': $scope.orderId,
                                    'customerId': $scope.customerId,
                                    'orderingCenterName': $scope.orderingCenterName,
                                    'orderingCenterId': $scope.orderingCenterId,
                                    'fulfilmentCenterId': $scope.fulfilmentCenterId,
                                    'fulfillmentCenterName': $scope.fulfillmentCenterName,
                                    'orderStatus': undefined,
                                    'page': "0",
                                    'size': "10"
                                }
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
