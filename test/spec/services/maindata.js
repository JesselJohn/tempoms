'use strict';

describe('Service: MainData', function () {

  // load the service's module
  beforeEach(module('omsieApp'));

  // instantiate service
  var MainData;
  beforeEach(inject(function (_MainData_) {
    MainData = _MainData_;
  }));

  it('should do something', function () {
    expect(!!MainData).toBe(true);
  });

});
