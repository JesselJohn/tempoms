'use strict';

describe('Service: KeyClock', function () {

  // load the service's module
  beforeEach(module('omsieApp'));

  // instantiate service
  var KeyClock;
  beforeEach(inject(function (_KeyClock_) {
    KeyClock = _KeyClock_;
  }));

  it('should do something', function () {
    expect(!!KeyClock).toBe(true);
  });

});
