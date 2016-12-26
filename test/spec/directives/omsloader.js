'use strict';

describe('Directive: omsLoader', function () {

  // load the directive's module
  beforeEach(module('omsieApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<oms-loader></oms-loader>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the omsLoader directive');
  }));
});
