'use strict';

describe('resetPasswordService', function() {
  var resetPasswordService;
  var httpBackend;
  var config;
  var URL;

  var fakeUser = 'username';
  var fakeEmail = 'me@me.me';
  var fakeToken = 'fakeToken';

  beforeEach(function() {
    module('config');
    module('resetPassword');
  });

  beforeEach(inject(function (_$httpBackend_, _config_, _resetPasswordService_) {
    resetPasswordService = _resetPasswordService_;
    httpBackend = _$httpBackend_;
    config = _config_;
    URL = config.domain + "resetPassword/";
  }));

  afterEach(function() {
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });

  describe('Post send reset', function() {
    it('should call to verify user and email', function() {
      httpBackend.expectPOST(URL + 'sendReset').respond(200);
      resetPasswordService.sendReset(fakeUser, fakeEmail);
      httpBackend.flush();
    });
  });

  describe('Get check valid token', function(){
    it('should call to verify reset token', function(){
      httpBacked.expectGET(URL + checkValidToken +'/' + fakeToken);
      resetPasswordService.checkValidToken(fakeToken);
      httpBackend.flush();
    });
  });

  describe('Post send new password', function(){
    it('should call to replace password for user with token', function() {
      httpBackend.expectPOST(URL).respond(200);
      resetPasswordService.sendNewPassword(fakeToken, fakePassword);
      httpBackend.flush();
    });
  });*/
});
