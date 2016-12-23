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
        'ngSanitize'
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
                .when('/about', {
                    templateUrl: 'views/about.html',
                    controller: 'AboutCtrl',
                    controllerAs: 'about'
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
