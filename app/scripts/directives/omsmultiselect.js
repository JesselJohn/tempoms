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
                '	<div class="oms-multi-select oms-button"' +
                '		ng-click="toggleOptionsVisibility()"' +
                '		ng-bind="selected.length===0?\'Select\':selected.length+\' checked\'">' +
                '	</div>' +
                '	<div class="oms-multi-select-options-wrapper" ng-show="isOptionsVisible">' +
                '		<label class="oms-multi-select-options" ng-repeat="option in allOptions">' +
                '			<input type="checkbox" ng-model="active" ng-value="option" ng-change="onOptionChange(active, option)" />' +
                '			<span ng-bind="option"></span>' +
                '		</label>' +
                '	</div>' +
                '</div>',
            restrict: 'E',
            replace: true,
            controller: ['$scope',
                function($scope) {
                    //////////////
                    // Funtions //
                    //////////////

                    function toggleOptionsVisibilityFn() {
                        $scope.isOptionsVisible = !$scope.isOptionsVisible;
                        console.log($scope.selected);
                    }

                    function onOptionChangeFn(active, option) {
                        if (active) {
                            $scope.selected.push(option);
                        } else {
                        	console.log($scope.selected.indexOf(option));
                            $scope.selected.splice($scope.selected.indexOf(option), 1);
                        }
                    }

                    ////////////////////
                    // Scope Bindings //
                    ////////////////////

                    $scope.isOptionsVisible = false;
                    $scope.onOptionChange = onOptionChangeFn;
                    $scope.toggleOptionsVisibility = toggleOptionsVisibilityFn;
                }
            ]
        };
    });
