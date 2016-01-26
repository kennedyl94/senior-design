(function() {
  'use strict';

  angular.module('logout')
    .factory('logoutService', ['$q', '$http', 'config', GetService]);

  function GetService($q, $http, config) {

    var service = this;

    service.logout = function() {
      console.log("logout service");
      var deferred = $q.defer();
      var promise = $http({method: 'GET', url: config.domain + 'logout'});
      promise.then(function(data) {
        console.log("in logout service fulfilling promise: " + data.data);
        deferred.resolve(data.data);
      });
      return deferred.promise;
    };

    return service;
  }
})();
