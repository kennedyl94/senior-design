'use strict';

describe('resetPasswordService', function() {
  var resetPasswordService;
  var httpBackend;
  var config;
  var URL;

  var fakeUser = 'username';
  var fakeEmail = 'me@me.me';

  beforeEach(function() {
    module('config');
    module('resetPassword');
  });

  beforeEach(inject(function (_$httpBackend_, _config_, _resetPasswordService_) {
    resetPasswordService = _resetPasswordService_;
    httpBackend = _$httpBackend_;
    config = _config_;
    URL = config.domain + "resetPassword";
  }));

  afterEach(function() {
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });

  describe('Post send reset', function() {
    it('should call to verify user and email', function() {
      httpBackend.expectPOST(URL).respond(200);
      resetPasswordService.sendReset(fakeUser, fakeEmail);
      httpBackend.flush();
    });
  });
});
