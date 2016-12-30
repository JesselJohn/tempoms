'use strict';

describe('Controller: HandoverCtrl', function () {

  // load the controller's module
  beforeEach(module('omsieApp'));

  var HandoverCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    HandoverCtrl = $controller('HandoverCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(HandoverCtrl.awesomeThings.length).toBe(3);
  });
});
