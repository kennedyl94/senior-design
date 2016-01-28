(function() {
  'use strict';

  angular.module('createClub')
    .factory('createClubService', ['$http', 'config', GetService]);

  function GetService($http, config) {
    var service = this;

    service.submitClub = function(org, success) {
      $http({method: 'POST', url: config.domain + 'createClub', data: {club: org}})
        .then(success);
    };
    /*
    function init() {
      var promises = [];
      promises.push($http.get(config.domain + 'createClub'));
      $q.all(promises).then(function(data) {
        service.data.title = data[0].data.title;
      });
    }

    init();*/
    return service;
  }
})();
