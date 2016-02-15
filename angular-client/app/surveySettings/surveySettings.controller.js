(function() {
  'use strict';

  angular.module('surveySettings')
    .controller('SurveySettingsController', ["surveySettingsService", '$http', 'config', Controller]);

  function Controller(surveySettingsService, $http, config) {

    var vm = this;
    vm.data = surveySettingsService.data
    
    vm.del = function(_id){
        
      console.log(_id);
      
      var req = {
        method: 'delete',
        url: config.domain+'surveySet',
        headers: {},
        data: {'id':_id}
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
