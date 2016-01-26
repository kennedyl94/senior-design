(function() {
  'use strict';

  angular.module('login')
    .factory('loginService', ['$q', '$http', 'config', GetService]);

  function GetService($q, $http, config) {

    var service = this;
    var isLoggedIn = false;

    service.login = function(username, password) {
      var deferred = $q.defer();
      var promise = $http({method: 'POST', url: config.domain + 'login', data: {username: username, password:password}});
      promise.then(function(data) {
        deferred.resolve(data.data);
        isLoggedIn = true;
      });
      return deferred.promise;
    };

    service.isLoggedIn = function() {
      return isLoggedIn;
    };

    return service;
  }
})();
