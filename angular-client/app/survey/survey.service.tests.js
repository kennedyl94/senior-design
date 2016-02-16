'use strict';

describe('SurveyService', function() {
  var surveyService;
  var httpBackend;
  var config;
  var URL;

  var fakeQues = ["Test question 1", "Test question 2"];
  var fakeAns = [false, true, false];
  var fakeOrg = {name: 'fakeOrg'};

  beforeEach(function() {
    module('config');
    module('survey');
  });

  beforeEach(inject(function (_$httpBackend_, _config_, _surveyService_) {
    surveyService = _surveyService_;
    httpBackend = _$httpBackend_;
    config = _config_;
    URL = config.domain + "survey";
  }));

  afterEach(function() {
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });

  describe('Get questions', function() {
    it('should be defined', function() {
      httpBackend.expectGET(URL).respond(fakeQues);
      httpBackend.flush();
      expect(surveyService).toBeDefined();
    });
  });

  describe('Submit survey', function() {
    it('should return results from the survey', function() {
      var result = {};
      httpBackend.expectGET(URL).respond(fakeQues);
      httpBackend.expectPOST(URL).respond(fakeOrg);
      surveyService.submit(fakeAns, function(org) {
        result = org;
      });
      httpBackend.flush();
      expect(result.name).toEqual(fakeOrg.name);
      expect(result).toEqual(fakeOrg);
    });
  });
});
