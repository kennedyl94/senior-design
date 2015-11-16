(function() {
  'use strict';

  angular.module('survey')
    .controller('SurveyController', ['surveyService', Controller]);

  function Controller(surveyService) {

    var vm = this;
    vm.questions = {};

    surveyService.then(function (service) {
      vm.questions = service.questions;
    });
  }

})();
