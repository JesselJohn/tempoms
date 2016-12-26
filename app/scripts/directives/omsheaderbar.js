'use strict';

/**
 * @ngdoc directive
 * @name omsieApp.directive:headerBar
 * @description
 * # headerBar
 */
angular.module('omsieApp')
    .directive('omsHeaderBar', ['$timeout',
        function($timeout) {
            return {
                templateUrl: '/views/omsheader.html',
                restrict: 'E',
                replace: true,
                scope: {},
                controller: ['$scope',
                    function($scope) {
                        ///////////////
                        // Functions //
                        ///////////////
                        function logoutFn() {
                            keycloak.logout({
                                'redirectUri': window.location.origin
                            });
                        }

                        ////////////////////
                        // Scope Bindings //
                        ////////////////////
                        $scope.logout = logoutFn;

                        ///////////////////
                        // Service Calls //
                        ///////////////////
                        keycloak.loadUserInfo()
                            .success(function(user) {
                                $timeout(function() {
                                    $scope.userInfo = user;
                                });
                            });
                    }
                ]
            };
        }
    ]);
