'use strict';

/**
 * @ngdoc service
 * @name omsieApp.PickuporderService
 * @description
 * # PickuporderService
 * Factory in the omsieApp.
 */
angular.module('omsieApp')
    .factory('PickuporderService', ['CONSTANTS', '$http', '$q',
        function(CONSTANTS, $http, $q) {
            var PickuporderService = {
                getPickuporderData: function() {
                    var defer = $q.defer();
                    $http({
                        method: 'GET',
                        url: CONSTANTS.API_URL + "/api/order/query?" +
                            "deliveryType=STOREPICK&" +
                            "sort=orderLines.slaEndTime,desc&" +
                            "page=0&" +
                            "size=10"
                    }).success(function(data) {
                        defer.resolve(data);
                    }).error(function(err) {
                        defer.reject(err);
                    });
                    return defer.promise;
                }
            };

            return PickuporderService;
        }
    ]);
