(function() {
  'use strict';

  angular.module('logout')
    .factory('logoutService', ['$q', '$http', 'config', 'loginService', GetService]);

  function GetService($q, $http, config, loginService) {

    var service = this;

    service.logout = function() {
      var deferred = $q.defer();
      var promise = $http({method: 'GET', url: config.domain + 'logout'});
      promise.then(function(data) {
        loginService.setLoginStatus(false);
        deferred.resolve(data.data);
      });
      return deferred.promise;
    };

    return service;
  }
})();
