'use strict';

/**
 * @ngdoc function
 * @name omsieApp.controller:HandoverCtrl
 * @description
 * # HandoverCtrl
 * Controller of the omsieApp
 */
angular.module('omsieApp')
    .controller('HandoverCtrl', ['HandOverService', 'HandOverData', '$scope',
        function(HandOverService, HandOverData, $scope) {
            var handoverReqObj = {
                'q': "status==In*Scanned",
                'page': "0",
                'size': "1000"
            };

            /////////////////////////////
            // Scope Property Bindings //
            /////////////////////////////

            $scope.HandOverData = HandOverData;

            ///////////////////
            // Service Calls //
            ///////////////////

            HandOverService
                .getHandoverData(handoverReqObj)
                .then(function(data) {
                    console.log(data);
                    HandOverData.data = data;
                });
        }
    ]);
