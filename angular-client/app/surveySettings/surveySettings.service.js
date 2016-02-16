(function() {
  'use strict';

  angular.module('surveySettings')
    .factory('surveySettingsService', ['$q','$http','config', GetService]);

  function GetService($q, $http, config) {

    var service = this;

    service.data = {
      questions: {},
      num:0
      
    };
    

    function init() {
      //TODO -- Make initial call to get survey questions
      var promises = [];
      promises.push($http({method: 'GET', url: config.domain+"surveySet"}));
      promises.push($http({method: 'GET', url: config.domain+"surveySet/num"}));
      
      $q.all(promises).then(function(data) {
        service.data.questions = data[0].data;
        service.data.num = data[1].data.num;
        
      });
    }
    service.submit = function(post, success){
        $http(post).then(success);
    }
    

    init();

    return service;
  }
})();
