(function() {
  'use strict';

  angular.module('organizations')
    .factory('organizationsService', ['$q', '$http', 'config', GetService]);

  function GetService($q, $http, config) {

    var service = this;

    service.data = {
      orgs: {}
    };

    function init() {
      var promises = [];
      promises.push($http({method: 'GET', url: config.domain + 'Organizations/name'}));
      $q.all(promises).then(function(data) {
        service.data.orgs = data[0].data;
      });
    }

    init();

    return service;
  }
})();
