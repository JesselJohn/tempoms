'use strict';

/**
 * @ngdoc service
 * @name omsieApp.HandOverService
 * @description
 * # HandOverService
 * Factory in the omsieApp.
 */
angular.module('omsieApp')
    .factory('HandOverService', ['CONSTANTS', 'CommonService', '$http', '$q',
        function(CONSTANTS, CommonService, $http, $q) {
            var HandOverService = {
                getHandoverData: function(obj) {
                    var defer = $q.defer(),
                        path = CommonService.getURLWithQueryParams("/api/search/shipment_transactions", obj);
                    $http({
                        method: 'GET',
                        url: "https://kong-qa.ailiens.com:8443/bumblebee" + path
                    }).success(function(data) {
                        var invocation = new XMLHttpRequest();


                    }).error(function(err) {
                        defer.reject(err);
                    });
                    return defer.promise;
                }
            };
            return HandOverService;
        }
    ]);
