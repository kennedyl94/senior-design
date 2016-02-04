(function() {
  'use strict';

  angular.module('survey')
    .controller('SurveyController', ['surveyService', '$http','config', Controller]);

  function Controller(surveyService, $http, config) {

    var vm = this;
    vm.data = surveyService.data;
    vm.orgs = surveyService.orgs;
    
    
    // console.log("TESTING: " + JSON.stringify(surveyService.data.questions));
    
    vm.ans={};
    
    vm.submit = function() {

      
      var req = {
        method: 'POST',
        url: config.domain+'survey',
        headers: {},
        data: vm.ans
      
      }
      
      $http(req)
        .success(function (data, status, headers, config) {
          console.log(data);
          vm.orgs = data;
        }).error(function(err, status, headers, config) {
          console.log('error: ' + err);
        });
    }
     

  }
  

})();
