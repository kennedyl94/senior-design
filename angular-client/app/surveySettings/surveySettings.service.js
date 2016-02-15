(function() {
  'use strict';

  angular.module('surveySettings')
    .factory('surveySettingsService', ['$q','$http','config', GetService]);

  function GetService($q, $http, config) {

    var service = this;

    service.data = {
      questions: {}
    };
    

    function init() {
      //TODO -- Make initial call to get survey questions
      var promises = [];
      promises.push($http({method: 'GET', url: config.domain+"surveySet"}));
      $q.all(promises).then(function(data) {
        service.data.questions = data[0].data;
        console.log(data[0].data);
      });
    }
    

    init();

    return service;
  }
})();
