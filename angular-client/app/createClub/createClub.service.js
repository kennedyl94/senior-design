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

    return service;
  }
})();
