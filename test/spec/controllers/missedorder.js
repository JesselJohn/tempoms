'use strict';

describe('Controller: MissedorderCtrl', function () {

  // load the controller's module
  beforeEach(module('omsieApp'));

  var MissedorderCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MissedorderCtrl = $controller('MissedorderCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(MissedorderCtrl.awesomeThings.length).toBe(3);
  });
});
