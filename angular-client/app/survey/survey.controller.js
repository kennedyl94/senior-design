(function() {
  'use strict';

  angular.module('survey')
    .controller('SurveyController', ['surveyService', Controller]);

  function Controller(surveyService) {

    var vm = this;
    vm.data = surveyService.data;
    
    console.log("TESTING: " + vm.data);

  }

})();
