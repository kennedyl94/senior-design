(function() {
  'use strict';

  angular.module('modal')
    .factory('modalService', ['$q', '$http', 'config', GetService]);

  function GetService($q, $http, config) {

    var service = this;

    service.deleteOrg = function(org) {
      var deferred = $q.defer();
      var promise =
        $http({method: 'DELETE', url: config.domain + 'Organizations/delete/' + org._id });
      promise.then(function(data) {
        deferred.resolve();
      });
      return deferred.promise;
    };

    return service;
  }
})();
