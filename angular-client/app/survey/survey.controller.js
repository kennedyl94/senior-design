(function() {
  'use strict';

  angular.module('survey')
    .controller('SurveyController', ['surveyService', 'emailService', Controller]);

  function Controller(surveyService, emailService, $http, config) {

    var vm = this;
    surveyService.update();
    vm.data = surveyService.data;
    vm.orgs = {};
    vm.ans = {};
    vm.submitted = false;

    vm.submit = function() {
      vm.submitted = false;
      surveyService.submit(vm.ans, function(data) {
        vm.orgs = data;
        vm.submitted = true;
      });
    };
  }
})();
