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
        //$rootScope.$apply();
      });
      return deferred.promise;
    };

    service.isLoggedIn = function() {
      console.log("isLoggedIn: " + isLoggedIn);
      return isLoggedIn;
    };

    return service;
  }
})();
