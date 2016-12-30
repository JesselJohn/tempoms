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
                .when('/deliveryorder', {
                    templateUrl: 'views/deliveryorder.html',
                    controller: 'DeliveryorderCtrl',
                    controllerAs: 'delivery'
                })
                .when('/orderdetail/:consignmentId', {
                    templateUrl: 'views/orderdetail.html',
                    controller: 'OrderdetailCtrl',
                    controllerAs: 'orderdetail'
                })
                .when('/missedorder', {
                    templateUrl: 'views/missedorder.html',
                    controller: 'MissedorderCtrl',
                    controllerAs: 'missed'
                })
                .when('/delayedorder', {
                    templateUrl: 'views/delayedorder.html',
                    controller: 'DelayedorderCtrl',
                    controllerAs: 'delayed'
                })
                .when('/handover', {
                    templateUrl: 'views/handover.html',
                    controller: 'HandoverCtrl',
                    controllerAs: 'handover'
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
