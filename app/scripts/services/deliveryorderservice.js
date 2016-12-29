'use strict';

/**
 * @ngdoc service
 * @name omsieApp.DeliveryorderService
 * @description
 * # DeliveryorderService
 * Factory in the omsieApp.
 */
angular.module('omsieApp')
    .factory('DeliveryorderService', ['CONSTANTS', 'CommonService', '$http', '$q',
        function(CONSTANTS, CommonService, $http, $q) {
            var DeliveryorderService = {
                getDeliveryorderData: function(obj) {
                    var defer = $q.defer(),
                        path = CommonService.getURLWithQueryParams("/api/order/query", obj);
                    $http({
                        method: 'GET',
                        url: CONSTANTS.API_URL + path
                    }).success(function(data) {
                        defer.resolve(data);
                    }).error(function(err) {
                        defer.reject(err);
                    });
                    return defer.promise;
                }
            };

            return DeliveryorderService;
        }
    ]);
