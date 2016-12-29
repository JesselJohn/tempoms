'use strict';

/**
 * @ngdoc directive
 * @name omsieApp.directive:omsSearchBlock
 * @description
 * # omsSearchBlock
 */
angular.module('omsieApp')
    .directive('omsDeliverySearchBlock', ['DeliveryorderService',
        function(DeliveryorderService) {
            return {
                scope: {
                    'deliveryData': "=",
                    'onFilterChange': "&"
                },
                templateUrl: 'views/omsdeliverysearchblock.html',
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
                            var orderStartDate = $scope.deliveryData.orderStartDate ?
                                $scope.deliveryData.orderStartDate.toISOString() : null,
                                orderEndDate = $scope.deliveryData.orderEndDate ?
                                $scope.deliveryData.orderEndDate.toISOString() : null,
                                deliveryStartDate = $scope.deliveryData.deliveryStartDate ?
                                $scope.deliveryData.deliveryStartDate.toISOString() : null,
                                deliveryEndDate = $scope.deliveryData.deliveryEndDate ?
                                $scope.deliveryData.deliveryEndDate.toISOString() : null;
                            $scope.deliveryData.data = null;
                            $scope.onFilterChange({
                                'filter': {
                                    'consignmentId': $scope.consignmentId,
                                    'orderId': $scope.orderId,
                                    'orderDateStart': orderStartDate,
                                    'orderDateEnd': orderEndDate,
                                    'deliveryDateStart': deliveryStartDate,
                                    'deliveryDateEnd': deliveryEndDate,
                                    'customerId': $scope.customerId,
                                    'orderingCenterName': $scope.orderingCenterName,
                                    'orderingCenterId': $scope.orderingCenterId,
                                    'fulfilmentCenterId': $scope.fulfilmentCenterId,
                                    'fulfillmentCenterName': $scope.fulfillmentCenterName,
                                    'orderStatus': $scope.deliveryData.orderStatusSelected.join(","),
                                    'consignmentStatus': $scope.deliveryData.consignmentStatusSelected.join(","),
                                    'fulfilmentType': $scope.deliveryData.fulfilmentTypeSelected.join(","),
                                    'deliveryType': "DELIVERY",
                                    'sort': "orderLines.slaEndTime,desc",
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

                        /////////////
                        // Watches //
                        /////////////

                        $scope.$watch('deliveryData.orderStartDate', function(date) {
                            $scope.deliveryData.orderEndMinDate = date || new Date();
                        });

                        $scope.$watch('deliveryData.deliveryStartDate', function(date) {
                            $scope.deliveryData.deliveryEndMinDate = date || new Date();
                        });
                    }
                ]
            };
        }
    ]);
