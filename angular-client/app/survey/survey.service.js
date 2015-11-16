(function() {
  'use strict';

  angular.module('survey')
    .factory('surveyService', ['$q', '$http', GetService]);

  function GetService($q,$http) {

    var deferred = $q.defer();
    var service = this;

    service.questions = {};

    function init() {
      //TODO -- Make initial call to get survey questions
      /*var promises = [];
      promises.push($http({method: 'GET', url: ''}));
      $q.all(promises).then(function(data) {
        deferred.resolve(service);
      });*/
    }

    init();

    return deferred.promise;
  }
})();
