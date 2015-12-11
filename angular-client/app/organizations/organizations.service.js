(function() {
  'use strict';

  angular.module('organizations')
    .factory('organizationsService', ['$q', '$http', GetService]);

  function GetService($q, $http) {

    var service = this;

    service.data = {
      orgs: {}
    };

    service.sortOrgs = function(selectedOption) {
      var deferred = $q.defer();
      var promise =
        $http({method: 'GET', url: 'http://orgmatcher.msoe.edu/api/Organizations/' + selectedOption.id});
      promise.then(function(data) {
        deferred.resolve(data.data);
      });
      return deferred.promise;
    }

    function init() {
      var promises = [];
      promises.push($http({method: 'GET', url: 'http://orgmatcher.msoe.edu/api/Organizations/name'}));
      $q.all(promises).then(function(data) {
        service.data.orgs = data[0].data;
      });
    }

    init();

    return service;
  }
})();
