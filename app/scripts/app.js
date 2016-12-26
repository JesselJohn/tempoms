'use strict';

/**
 * @ngdoc overview
 * @name omsieApp
 * @description
 * # omsieApp
 *
 * Main module of the application.
 */
angular
    .module('omsieApp', [
        'ngCookies',
        'ngRoute',
        'ngSanitize',
        'ui.bootstrap'
    ])
    .constant('CONSTANTS', {
        'API_URL': "http://localhost:9000"
    })
    .config(['$routeProvider', '$httpProvider', '$locationProvider',
        function($routeProvider, $httpProvider, $locationProvider) {
            $routeProvider
                .when('/', {
                    templateUrl: 'views/main.html',
                    controller: 'MainCtrl',
                    controllerAs: 'main'
                })
                .when('/pickuporder', {
                    templateUrl: 'views/pickuporder.html',
                    controller: 'PickuporderCtrl',
                    controllerAs: 'pickup'
                })
                .when('/orderdetail/:consignmentId', {
                    templateUrl: 'views/orderdetail.html',
                    controller: 'OrderdetailCtrl',
                    controllerAs: 'orderdetail'
                })
                .otherwise({
                    redirectTo: '/'
                });

            $httpProvider.defaults.useXDomain = true;
            $httpProvider.interceptors.push('AuthInterceptor');
            $locationProvider.html5Mode(true);
        }
    ]).run(['$rootScope', '$timeout',
        function($rootScope, $timeout) {

        }
    ]);
