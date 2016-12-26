'use strict';

describe('Directive: showLoader', function () {

  // load the directive's module
  beforeEach(module('omsieApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<show-loader></show-loader>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the showLoader directive');
  }));
});
