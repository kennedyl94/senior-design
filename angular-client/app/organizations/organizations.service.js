(function() {
  'use strict';

  angular.module('organizations')
    .factory('organizationsService', ['$q', '$http', GetService]);

  function GetService($q, $http) {

    var service = this;

    service.data = {
      orgs: {}
    };

    function init() {
      var promises = [];
      promises.push($http({method: 'GET', url: 'http://localhost:3000/Organizations/name'}));
      $q.all(promises).then(function(data) {
        service.data.orgs = data[0].data;
      });
    }

    init();

    return service;
  }
})();
