(function() {
  'use strict';

  angular.module('survey')
    .factory('surveyService', ['$q','$http','config', GetService]);

  function GetService($q, $http, config) {

    var service = this;

    service.data = {
      questions: {}
    };

    service.submit = function(ans, success) {
      $http({method: 'POST', url: config.domain + 'survey', data: ans})
        .then(function(data) {
          success(data.data);
        });
    };

    service.sendResults = function(address, orgs) {
      $http({method: 'POST', url: config.domain + 'email', data: {address: address, result: orgs}});
    };

    function init() {
      //TODO -- Make initial call to get survey questions
      var promises = [];
      promises.push($http({method: 'GET', url: config.domain+'survey'}));
      $q.all(promises).then(function(data) {
        service.data.questions = data[0].data;
        console.log(data[0].data);
      });
    }

    init();

    return service;
  }
})();
