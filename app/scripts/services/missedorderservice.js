'use strict';

/**
 * @ngdoc service
 * @name omsieApp.MissedOrderService
 * @description
 * # MissedOrderService
 * Factory in the omsieApp.
 */
angular.module('omsieApp')
    .factory('MissedOrderService', ['CONSTANTS', 'CommonService', '$http', '$q',
        function(CONSTANTS, CommonService, $http, $q) {
            var MissedOrderService = {
                getMissedorderData: function(obj) {
                    var defer = $q.defer(),
                        path = CommonService.getURLWithQueryParams("/api/failorders/query", obj);
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

            return MissedOrderService;
        }
    ]);
