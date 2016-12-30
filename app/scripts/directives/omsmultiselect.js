'use strict';

/**
 * @ngdoc directive
 * @name omsieApp.directive:omsMultiSelect
 * @description
 * # omsMultiSelect
 */
angular.module('omsieApp')
    .directive('omsMultiSelect', function() {
        return {
            scope: {
                'selected': "=",
                'allOptions': "="
            },
            template: '' +
                '<div class="oms-multi-select-wrapper">' +
                '   <div class="oms-multi-select oms-button"' +
                '       ng-click="toggleOptionsVisibility($event)"' +
                '       ng-bind="selected.length===0?\'Select\':selected.length+\' checked\'">' +
                '   </div>' +
                '   <div class="oms-multi-select-options-wrapper" ng-show="isOptionsVisible">' +
                '       <label class="oms-multi-select-options" ng-repeat="option in allOptions">' +
                '           <input type="checkbox" ng-model="active" ng-value="option.value" ng-checked="option.selected" ng-init="onInit(option.selected, option)" ng-change="onOptionChange(active, option)" />' +
                '           <span ng-bind="option.label"></span>' +
                '       </label>' +
                '   </div>' +
                '</div>',
            restrict: 'E',
            replace: true,
            controller: ['$scope',
                function($scope) {
                    //////////////
                    // Funtions //
                    //////////////

                    function toggleOptionsVisibilityFn(e) {
                        e.stopPropagation();
                        $scope.isOptionsVisible = !$scope.isOptionsVisible;
                    }

                    function onInitFn(active, option) {
                        if (active) {
                            $scope.selected.push(option.value);
                        }
                    }

                    function onOptionChangeFn(active, option) {
                        if (active) {
                            $scope.selected.push(option.value);
                        } else {
                            $scope.selected.splice($scope.selected.indexOf(option.value), 1);
                        }
                    }

                    ////////////////////
                    // Scope Bindings //
                    ////////////////////

                    $scope.isOptionsVisible = false;
                    $scope.onInit = onInitFn;
                    $scope.onOptionChange = onOptionChangeFn;
                    $scope.toggleOptionsVisibility = toggleOptionsVisibilityFn;
                }
            ]
        };
    });
