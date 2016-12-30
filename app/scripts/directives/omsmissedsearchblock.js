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
                            var reasonVal = ($scope.reasonVal || {}).value,
                                orderStatus = ($scope.orderStatus || {}).value,
                                consignmentStatus = ($scope.currentStatus || {}).value;
                            $scope.missedData.data = null;
                            $scope.onFilterChange({
                                'filter': {
                                    'itemId': $scope.itemId,
                                    'consignmentId': $scope.consignmentId,
                                    'orderId': $scope.orderId,
                                    'customerId': $scope.customerId,
                                    'reason': reasonVal,
                                    'orderStatus': orderStatus,
                                    'consignmentStatus': consignmentStatus,
                                    'HUCode': $scope.huCode,
                                    'EAN': $scope.eanVal,
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
