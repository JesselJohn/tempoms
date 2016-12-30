'use strict';

describe('Service: DelayedOrdersData', function () {

  // load the service's module
  beforeEach(module('omsieApp'));

  // instantiate service
  var DelayedOrdersData;
  beforeEach(inject(function (_DelayedOrdersData_) {
    DelayedOrdersData = _DelayedOrdersData_;
  }));

  it('should do something', function () {
    expect(!!DelayedOrdersData).toBe(true);
  });

});
