'use strict';

/**
 * @ngdoc directive
 * @name omsieApp.directive:omsPrintFile
 * @description
 * # omsPrintFile
 */
angular.module('omsieApp')
    .directive('omsPrintFile', function() {
        return {
            templateUrl: '/views/print.html',
            restrict: 'E'
        };
    });
