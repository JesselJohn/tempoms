'use strict';

/**
 * @ngdoc service
 * @name omsieApp.OrderDetailService
 * @description
 * # OrderDetailService
 * Factory in the omsieApp.
 */
angular.module('omsieApp')
    .factory('OrderDetailService', ['CONSTANTS', '$http', '$q',
        function(CONSTANTS, $http, $q) {
            var OrderDetailService = {
                getOrderDetails: function(consignmentId) {
                    var defer = $q.defer();
                    $http({
                        method: 'GET',
                        url: CONSTANTS.API_URL + "/api/consignment/" + consignmentId
                    }).success(function(data) {
                        defer.resolve(data);
                    }).error(function(err) {
                        defer.reject(err);
                    });
                    return defer.promise;
                }
            };

            return OrderDetailService;
        }
    ]);
