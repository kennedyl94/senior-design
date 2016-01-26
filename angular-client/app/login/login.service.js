(function() {
  'use strict';

  angular.module('login')
    .factory('loginService', ['$q', '$http', 'config', GetService]);

  function GetService($q, $http, config) {

    var vm = this;
    var service = this;
    var isLoggedIn = false;

    service.login = function(username, password) {
      var deferred = $q.defer();
      var promise = $http({method: 'POST', url: config.domain + 'login', data: {username: username, password:password}});
      promise.then(function(data) {
        deferred.resolve(data.data);
        vm.setLoginStatus(true);
      });
      return deferred.promise;
    };

    service.setLoginStatus = function(loggedIn) {
      isLoggedIn = loggedIn;
    }

    service.getLoginStatus = function() {
      return isLoggedIn;
    };

    return service;
  }
})();
