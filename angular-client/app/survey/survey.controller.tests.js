'use strict';

describe("SurveyController", function() {
  var $controller;
  var surveyService;

  beforeEach(function() {
    module('survey');
  });

  beforeEach(inject(function (_$controller_, _surveyService_) {
    $controller = _$controller_;
    surveyService = _surveyService_;
  }));

  function createController() {
    return $controller('SurveyController', {
      surveyService: surveyService
    });
  }
  /* Can't make test until able to test control vs service
   describe('Post new org', function() {
   it('should call to post fake org', function() {
   var ctrl = createController();
   ctrl.club = fakeClub;
   ctrl.submit(null);
   });
   });*/
});
