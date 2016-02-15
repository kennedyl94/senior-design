(function() {
  'use strict';

  angular.module('surveySettings')
    .controller('SurveySettingsController', ["surveySettingsService", '$http', 'config', Controller]);

  function Controller(surveySettingsService, $http, config) {

    var vm = this;
    vm.data = surveySettingsService.data
    vm.question = {
        question:"",
        tags:"",
        category:""
    }
    vm.num =0;
    
    vm.del = function(_id){
        
      console.log(_id);
      
      var req = {
        method: 'delete',
        url: config.domain+'surveySet',
        headers: {'Content-Type': 'application/json'},
        data: _id
      }
      
       $http(req)
        .success(function (data, status, headers, config) {
          console.log(data);
          location.reload();
        }).error(function(err, status, headers, config) {
          console.log('error: ' + err);
        });
    }
    vm.add = function(){
        console.log(vm.question);
        
        var req = {
        method: 'post',
        url: config.domain+'surveySet/add',
        headers: {},
        data: vm.question
      }
      
       $http(req)
        .success(function (data, status, headers, config) {
          console.log(data);
          location.reload();
        }).error(function(err, status, headers, config) {
          console.log('error: ' + err);
        });
    }
    vm.questionNum = function(){
        console.log(vm.num);
        
        var req = {
        method: 'post',
        url: config.domain+'surveySet/questionNum',
        headers: {},
        data: {num: vm.num}
      }
      
       $http(req)
        .success(function (data, status, headers, config) {
          console.log(data);
          location.reload();
        }).error(function(err, status, headers, config) {
          console.log('error: ' + err);
        });
    }

  }
 
  
})();
