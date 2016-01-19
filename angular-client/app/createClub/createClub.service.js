(function() {
  'use strict';

  angular.module('createClub')
    .factory('createClubService', ['$http', 'config', GetService]);

  function GetService($http, config) {
    var service = this;

    service.submitClub = function(org, success, error) {
      var req = {
        method: 'POST',
        url: config.domain + 'createClub',
        headers: {},
        data: {club: org}
      };

      $http(req).success(function(data, status, headers, config) {
        success();
      }).error(function(err, status, headers, config) {
        error(err);
      });
    }
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
