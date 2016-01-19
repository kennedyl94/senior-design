(function() {
  'use strict';

  angular.module('login')
    .factory('loginService', ['$q', '$http', 'config', GetService]);

  function GetService($q, $http, config) {

    var service = this;
    var isLoggedIn = false;
    var isStudentLifeAdmin = false;
    var isStudentOrgAdmin = false;

    service.login = function(username, password) {
      var deferred = $q.defer();
      var promise = $http({method: 'POST', url: config.domain + 'login', data: {username: username, password:password}});
      promise.then(function(data) {
        console.log("in service: " + data.data.type);
        deferred.resolve(data.data);
        isLoggedIn = true;
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
      return isLoggedIn;
    };

    return service;
  }
})();
