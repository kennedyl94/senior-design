(function() {
  'use strict';

  angular.module('survey')
    .factory('surveyService', ['$q','$http', GetService]);

  function GetService($q, $http) {

    var service = this;

    service.data = {
      questions: {}
    };

    function init() {
      //TODO -- Make initial call to get survey questions
      var promises = [];
      promises.push($http({method: 'GET', url: 'http://localhost:3000/survey'}));
      $q.all(promises).then(function(data) {
        service.data.questions = data[0].data;
        console.log(data[0].data);
      });
    }

    init();

    return service;
  }
})();
