'use strict';

/**
 * @ngdoc directive
 * @name omsieApp.directive:omsLoader
 * @description
 * # omsLoader
 */
angular.module('omsieApp')
    .directive('omsLoader', function() {
        return {
            scope: {},
            template: function(element, attrs) {
                return '' +
                    '<svg class="oms-loader" width="' + attrs.width + '" height="' + attrs.height + '">' +
                    '    <image xlink:href="/images/rolling.svg" src="/images/rolling.gif" width="' + attrs.width + '" height="' + attrs.height + '" />' +
                    '</svg>';
            },
            restrict: 'E',
            replace: true
        };
    });
