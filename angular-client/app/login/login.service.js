(function() {
  'use strict';

  angular.module('login')
    .factory('loginService', ['$q', '$http', 'config', GetService]);

  function GetService($q, $http, config) {

    var service = this;
    var user = false;

    service.login = function(username, password) {
      var deferred = $q.defer();
      var promise = $http({method: 'POST', url: config.domain + 'login', data: {username: username, password:password}});
      promise.then(function(data) {
          console.log("in service: " + data.data);
          deferred.resolve(data.data);
          user = true;
      });
      return deferred.promise;
    };

    service.logout = function() {
      var deferred = $q.defer();
      var promise = $http({method: 'GET', url: config.domain + 'login'});
      promise.then(function(data) {
        console.log("in service: " + data.data);
        deferred.resolve(data.data);
      });
      return deferred.promise;
    };

    service.isLoggedIn = function() {
      if(user) {
        return true;
      } else {
        return false;
      }
    };

    service.getUserStatus = function() {
      return user;
    };

    return service;
  }
})();
