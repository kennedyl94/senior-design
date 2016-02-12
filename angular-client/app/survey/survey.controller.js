(function() {
  'use strict';

  angular.module('survey')
    .controller('SurveyController', ['surveyService', Controller]);

  function Controller(surveyService, $http, config) {

    var vm = this;
    vm.data = surveyService.data;
    vm.orgs = {};

    // console.log("TESTING: " + JSON.stringify(surveyService.data.questions));

    vm.ans={};
    vm.address = '';

    vm.submitted = false;

    vm.submit = function() {
      vm.submitted = false;
      surveyService.submit(vm.ans, function(data) {
        vm.orgs = data;
        vm.submitted = true;
      });
    };

    vm.sendResults = function() {
      surveyService.sendResults(vm.address, vm.orgs);
    }
  }


})();
