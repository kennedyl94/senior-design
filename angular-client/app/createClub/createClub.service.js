(function() {
  'use strict';

  angular.module('createClub')
    .factory('createClubService', ['$q', '$http', 'config', GetService]);

  function GetService($q, $http, config) {
    var service = this;

    service.data = {
      tags: []
    };

    function init() {
      var promises = [];
      promises.push($http({method: 'GET', url: config.domain + 'tagSettings'}));
      $q.all(promises).then(function(data) {
        service.data.tags = data[0].data;
      });
    }

    service.submitClub = function(org, success) {
      $http({method: 'POST', url: config.domain + 'createClub', data: {club: org}})
        .then(success);
    };

    init();

    return service;
  }
})();
