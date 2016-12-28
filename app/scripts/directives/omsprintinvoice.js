'use strict';

/**
 * @ngdoc directive
 * @name omsieApp.directive:omsPrintInvoice
 * @description
 * # omsPrintInvoice
 */
angular.module('omsieApp')
    .directive('omsPrintInvoice', ['$timeout',
        function($timeout) {
            return {
                templateUrl: 'views/omsprintinvoice.html',
                restrict: 'E',
                replace: true,
                controller: ['$scope',
                    function($scope) {
                        ///////////////
                        // Functions //
                        ///////////////

                        function printInvoiceFn() {
                            var iframe = document.createElement('iframe');
                            iframe.src = "/views/print.html";
                            iframe.hidden = true;
                            document.getElementsByTagName('body')[0].appendChild(iframe);
                            iframe.onload = function() {
                                iframe.contentWindow.print();
                            };
                        }

                        /////////////////////////////
                        // Scope Property Bindings //
                        /////////////////////////////

                        $scope.printInvoice = printInvoiceFn;
                    }
                ]
            };
        }
    ]);
