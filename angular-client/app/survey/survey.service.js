(function() {
  'use strict';

  angular.module('survey')
    .factory('surveyService', ['$q', GetService]);

  function GetService($q) {

    var service = this;

    service.data = {
      questions: {}
    };

    function init() {
      //TODO -- Make initial call to get survey questions
      /*var promises = [];
      promises.push($http({method: 'GET', url: ''}));
      $q.all(promises).then(function(data) {
        service.data.questions = data[0].data;
      });*/
    }

    init();

    return service;
  }
})();
