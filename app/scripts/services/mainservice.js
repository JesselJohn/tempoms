'use strict';

/**
 * @ngdoc service
 * @name omsieApp.MainService
 * @description
 * # MainService
 * Factory in the omsieApp.
 */
angular.module('omsieApp')
    .factory('MainService', ['CONSTANTS', '$http', '$q',
        function(CONSTANTS, $http, $q) {
            console.log(CONSTANTS);
            var MainService = {
                /**
                 * [Get Dashboard Data]
                 * @return {Object} [Promise]
                 */
                getDashboardData: function() {
                    var defer = $q.defer();
                    $http({
                        method: 'GET',
                        url: CONSTANTS.API_URL + "/api/returnorder/query?" +
                            "returnStatus=INITIATED&" +
                            "returnMode=RETURNTOSTORE&" +
                            "page=0&" +
                            "size=1"
                    }).success(function(data) {
                        defer.resolve(data);
                    }).error(function(err) {
                        defer.reject(err);
                    });
                    return defer.promise;
                }
            };

            return MainService;
        }
    ]);
