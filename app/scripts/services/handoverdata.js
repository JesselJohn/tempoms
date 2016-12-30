'use strict';

/**
 * @ngdoc service
 * @name omsieApp.HandOverData
 * @description
 * # HandOverData
 * Factory in the omsieApp.
 */
angular.module('omsieApp')
  .factory('HandOverData', function () {
    // Service logic
    // ...

    var meaningOfLife = 42;

    // Public API here
    return {
      someMethod: function () {
        return meaningOfLife;
      }
    };
  });
