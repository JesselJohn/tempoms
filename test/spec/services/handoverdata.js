'use strict';

describe('Service: HandOverData', function () {

  // load the service's module
  beforeEach(module('omsieApp'));

  // instantiate service
  var HandOverData;
  beforeEach(inject(function (_HandOverData_) {
    HandOverData = _HandOverData_;
  }));

  it('should do something', function () {
    expect(!!HandOverData).toBe(true);
  });

});
