'use strict';

/**
 * @ngdoc function
 * @name omsieApp.controller:HandoverCtrl
 * @description
 * # HandoverCtrl
 * Controller of the omsieApp
 */
angular.module('omsieApp')
    .controller('HandoverCtrl', ['HandOverService', '$scope',
        function(HandOverService, $scope) {
            var handoverReqObj = {
                'q': "status==In*Scanned",
                'page': "0",
                'size': "1000"
            };

            HandOverService
                .getHandoverData(handoverReqObj)
                .then(function(data) {

                });
        }
    ]);
