'use strict';

describe('Service: HandOverService', function () {

  // load the service's module
  beforeEach(module('omsieApp'));

  // instantiate service
  var HandOverService;
  beforeEach(inject(function (_HandOverService_) {
    HandOverService = _HandOverService_;
  }));

  it('should do something', function () {
    expect(!!HandOverService).toBe(true);
  });

});
