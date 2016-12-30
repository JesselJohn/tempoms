'use strict';

describe('Controller: DelayedordersCtrl', function () {

  // load the controller's module
  beforeEach(module('omsieApp'));

  var DelayedordersCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DelayedordersCtrl = $controller('DelayedordersCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(DelayedordersCtrl.awesomeThings.length).toBe(3);
  });
});
