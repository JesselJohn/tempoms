'use strict';

/**
 * @ngdoc service
 * @name omsieApp.DelayedOrderService
 * @description
 * # DelayedOrderService
 * Factory in the omsieApp.
 */
angular.module('omsieApp')
    .factory('DelayedOrderService', ['CONSTANTS', 'CommonService', '$http', '$q',
        function(CONSTANTS, CommonService, $http, $q) {
            var DelayedOrderService = {
                getDelayedorderData: function(obj) {
                    var defer = $q.defer(),
                        path = CommonService.getURLWithQueryParams("/api/delayedorder/query", obj);
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

            return DelayedOrderService;
        }
    ]);
