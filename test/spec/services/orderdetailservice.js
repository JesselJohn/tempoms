'use strict';

describe('Service: OrderDetailService', function () {

  // load the service's module
  beforeEach(module('omsieApp'));

  // instantiate service
  var OrderDetailService;
  beforeEach(inject(function (_OrderDetailService_) {
    OrderDetailService = _OrderDetailService_;
  }));

  it('should do something', function () {
    expect(!!OrderDetailService).toBe(true);
  });

});
