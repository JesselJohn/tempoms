'use strict';

/**
 * @ngdoc directive
 * @name omsieApp.directive:omsDashboardMain
 * @description
 * # omsDashboardMain
 */
angular.module('omsieApp')
    .directive('omsDashboardMain', [function() {
        return {
            scope: {
                'data': "=",
                'displayProps': "=",
                'navigateTo': "@"
            },
            template: '' +
                '<div>' +
                '   <div class="oms-box-table" ng-show="data">' +
                '       <div class="oms-box-row">' +
                '           <div class="oms-box-col-th">Status</div>' +
                '           <div style="width:10px" class="oms-box-col-th">Number of Order</div>' +
                '       </div>' +
                '       <a class="oms-link oms-box-row"' +
                '           ng-if="navigateTo"' +
                '           ng-repeat="prop in displayProps"' +
                '           ng-href="{{navigateTo}}">' +
                '           <div class="oms-box-col" ng-bind="prop">' +
                '           </div>' +
                '           <div class="oms-box-col" ng-bind="data[prop]">' +
                '           </div>' +
                '       </a>' +
                '       <div class="oms-box-row"' +
                '           ng-if="!navigateTo"' +
                '           ng-repeat="prop in displayProps">' +
                '           <div class="oms-box-col" ng-bind="prop">' +
                '           </div>' +
                '           <div class="oms-box-col" ng-bind="data[prop]">' +
                '           </div>' +
                '       </div>' +
                '   </div>' +
                '   <center ng-show="!data">' +
                '       <svg width="30" height="30">' +
                '           <image xlink:href="/images/rolling.svg" src="/images/rolling.gif" width="30" height="30" />' +
                '       </svg>' +
                '   </center>' +
                '</div>',
            restrict: 'E',
            replace: true,
            controller: ['$scope',
                function($scope) {}
            ]
        };
    }]);
