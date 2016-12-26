'use strict';

/**
 * @ngdoc directive
 * @name omsieApp.directive:omsDatePicker
 * @description
 * # omsDatePicker
 */
angular.module('omsieApp')
    .directive('omsDatePicker', function() {
        return {
            scope: {
                "date": "=",
                "minDate": "="
            },
            template: '' +
                '<div class="oms-datepicker">' +
                '   <input type="text"' +
                '           class="oms-input-text"' +
                '           datepicker-popup="{{format}}"' +
                '           ng-model="date"' +
                '           is-open="opened"' +
                '           min-date="minDate"' +
                '           show-weeks="false"' +
                '           show-button-bar="false"' +
                '           datepicker-options="dateOptions"' +
                '           date-disabled="disabled(date, mode)"' +
                '           ng-required="true"' +
                '           close-text="Close"' +
                '           ng-click="open($event)" />' +
                '</div>',
            restrict: 'E',
            replace: true,
            controller: ['$scope',
                function($scope) {
                    ///////////////
                    // Functions //
                    ///////////////

                    function disabledFn(date, mode) {
                        return (mode === 'day' && (date.getDay() === 0 || date.getDay() === 6));
                    }

                    function openFn($event) {
                        $event.preventDefault();
                        $event.stopPropagation();

                        $scope.opened = true;
                    }

                    /////////////////////////////
                    // Scope Property Bindings //
                    /////////////////////////////
                    $scope.minDate = $scope.minDate || new Date();
                    $scope.dateOptions = {
                        'formatYear': 'yy',
                        'startingDay': 1
                    };
                    $scope.format = 'dd-MMMM-yyyy';
                    $scope.opened = false;
                    $scope.disabled = disabledFn;
                    $scope.open = openFn;
                }
            ]
        };
    });
