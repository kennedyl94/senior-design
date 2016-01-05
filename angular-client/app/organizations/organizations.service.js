(function() {
  'use strict';

  angular.module('organizations')
    .factory('organizationsService', ['$q', '$http', 'config', GetService]);

  function GetService($q, $http, config) {

    var service = this;

    service.data = {
      orgs: {}
    };

    service.sortOrgs = function(selectedOption) {
      var deferred = $q.defer();
      var promise =
        $http({method: 'GET', url: config.domain + 'Organizations/' + selectedOption.id});
      promise.then(function(data) {
        deferred.resolve(data.data);
      });
      return deferred.promise;
    }

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
