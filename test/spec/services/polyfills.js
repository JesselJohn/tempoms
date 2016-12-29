'use strict';

describe('Service: Polyfills', function () {

  // load the service's module
  beforeEach(module('omsieApp'));

  // instantiate service
  var Polyfills;
  beforeEach(inject(function (_Polyfills_) {
    Polyfills = _Polyfills_;
  }));

  it('should do something', function () {
    expect(!!Polyfills).toBe(true);
  });

});
