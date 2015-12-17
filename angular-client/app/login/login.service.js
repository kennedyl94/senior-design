(function() {
  'use strict';

  angular.module('login')
    .factory('loginService', ['$q', '$http', GetService]);

  function GetService($q, $http) {

    var service = this;

    service.login = function(username, password) {
      var deferred = $q.defer();
      //var promise = $http({method: 'POST', url: 'http://localhost:3000/api/login', data: {username: username, password:password}});
      var promise = $http({method: 'POST', url: 'http://orgmatcher.msoe.edu/api/login', data: {username: username, password:password}});
      promise.then(function(data) {
        console.log("in service: " + data.data);
        deferred.resolve(data.data);
      });
      return deferred.promise;
    };

    return service;
  }
})();
