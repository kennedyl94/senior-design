(function() {
  'use strict';

  angular.module('logout')
    .factory('logoutService', ['$q', '$http', 'config', '$cookies', GetService]);

  function GetService($q, $http, config, $cookies) {

    var service = this;

    service.logout = function() {
      var deferred = $q.defer();
      var promise = $http({method: 'GET', url: config.domain + 'logout'});
      promise.then(function(data) {
        $cookies.put('om_slAdmin', 'false');
        deferred.resolve(data.data);
      });
      return deferred.promise;
    };

    return service;
  }
})();
