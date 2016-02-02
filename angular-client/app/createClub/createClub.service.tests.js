'use strict';

describe('CreateClubService', function() {
  var createClubService;
  var httpBackend;
  var config;
  var URL;

  var fakeClub = {
    name: "Fake",
    description: "Fake",
    tags: "tag1,tag2,tag3",
    contact: {
      name: "Ryan",
      email: "fake@fake.fake",
      phone: "(123) 456-7890"
    }
  };

  beforeEach(function() {
    module('config');
    module('createClub');
  });

  beforeEach(inject(function (_$httpBackend_, _config_, _createClubService_) {
    createClubService = _createClubService_;
    httpBackend = _$httpBackend_;
    config = _config_;
    URL = config.domain + "createClub";
  }));

  afterEach(function() {
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });

  describe('Post new org', function() {
    it('should call to post fake org', function() {
      httpBackend.expectPOST(URL).respond(200);
      createClubService.submitClub(fakeClub, null);
      httpBackend.flush();
    });
  });
});
