'use strict';

describe('Directive: omsSearchBlock', function () {

  // load the directive's module
  beforeEach(module('omsieApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<oms-search-block></oms-search-block>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the omsSearchBlock directive');
  }));
});
