(function() {
  'use strict';

  angular.module('modifyClub')
    .factory('modifyClubService', ['$q', '$http', 'config', GetService]);

  function GetService($q, $http, config) {

    var service = this;

    service.saveModifiedOrg = function(org) {
      var deferred = $q.defer();
      var promise =
        $http({method: 'PUT', data: org, url: config.domain + 'Organizations/modify/' + org._id});
      promise.then(function(data) {
        deferred.resolve();
      });
      return deferred.promise;
    }

    return service;
  }
})();
