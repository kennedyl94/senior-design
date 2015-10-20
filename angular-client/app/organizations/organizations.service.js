(function() {
  'use strict';

  angular.module('organizations')
    .factory('organizationsService', ['$q', '$http', GetService]);

  function GetService($q, $http) {

    var deferred  = $q.defer();
    var service = this;

    service.orgs = {};

    function init() {
      var promises = [];
      promises.push($http({method: 'GET', url: 'http://localhost:3000/Organizations'}));
      $q.all(promises).then(function(data) {
        service.orgs = data[0].data;
        deferred.resolve(service);
      });
    }

    init();
    return deferred.promise;
  }
})();
