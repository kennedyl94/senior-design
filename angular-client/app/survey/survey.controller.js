(function() {
  'use strict';

  angular.module('survey')
    .controller('SurveyController', ['surveyService', '$http', Controller]);

  function Controller(surveyService, $http) {

    var vm = this;
    vm.data = surveyService.data;
    
    
    // console.log("TESTING: " + JSON.stringify(surveyService.data.questions));
    
    vm.ans={};
    
    vm.submit = function() {

      
      var req = {
        method: 'POST',
        url: 'http://localhost:3000/survey',
        headers: {},
        data: vm.ans
      
      }
      
      $http(req)
        .success(function (data, status, headers, config) {
          console.log(data);
        }).error(function(err, status, headers, config) {
          console.log('error: ' + err);
        });
    }
     

  }
  

})();
