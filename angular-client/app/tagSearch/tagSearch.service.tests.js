'use strict';

describe('tagSearchService', function() {
  var $http;
  var tagSearchService;
  var URL;

  var testTags = ["tag1", "tag2", "tag3", "tag4", "tag5"];

  beforeEach(function() {
    module('config');
    module('organizations');
  });

  beforeEach(inject(function (_$httpBackend_, _tagSearchService_, _config_) {
    tagSearchService = _tagSearchService_;
    $http = _$httpBackend_;
    URL = _config_.domain + "tagSearch";
  }));

  afterEach(function() {
    $http.verifyNoOutstandingExpectation();
    $http.verifyNoOutstandingRequest();
  });

  describe('Get tags', function() {
    it('should call to get all tags', function() {
      $http.expectGET(URL).respond(testTags);
      $http.flush();
    });
  });
});
