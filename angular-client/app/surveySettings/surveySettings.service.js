(function() {
  'use strict';

  angular.module('surveySettings')
    .factory('surveySettingsService', ['$q','$http','config', GetService]);

  function GetService($q, $http, config) {

    var service = this;

    service.data = {
      questions: {},
      num:0,
      rules:[]
      
    };
    

    function init() {
      //TODO -- Make initial call to get survey questions
      var promises = [];
      promises.push($http({method: 'GET', url: config.domain+"surveySet"}));
      promises.push($http({method: 'GET', url: config.domain+"surveySet/num"}));
      promises.push($http({method: 'GET', url: config.domain+"surveySet/getrules"}));
      
      $q.all(promises).then(function(data) {
        service.data.questions = data[0].data;
        service.data.num = data[1].data.num;
        service.data.rules = data[2].data;
        
      });
    }
    service.submit = function(post, success){
        $http(post).then(success);
    }
    

    init();

    return service;
  }
})();
