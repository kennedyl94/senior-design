(function() {
  'use strict';

  angular.module('login')
    .factory('loginService', ['$q', '$http','config', '$cookies', GetService]);

  function GetService($q, $http, config, $cookies) {

    var service = this;
    var isLoggedIn = false;
    service.isStudentLifeAdmin = false;
    service.isOrgLeaderAdmin = false;

    service.login = function(username, password) {
      var deferred = $q.defer();
      var promise = $http({method: 'POST', url: config.domain + 'login', data: {username: username, password:password}});
      promise.then(function(data) {
        if(data.data.code == 200) {
          if(data.data.currentUser.Type == "SL") {
            $cookies.put('currentUser', data.data.currentUser.Username);
            $cookies.put('om_slAdmin', 'true');
            $cookies.put('om_loggedIn', 'true');
            service.isStudentLifeAdmin = true;
          } else if(data.data.currentUser.Type == "Org") {
            $cookies.put('currentUser', data.data.currentUser.Username);
            $cookies.put('om_orgAdmin', 'true');
            $cookies.put('om_loggedIn', 'true');
            service.isOrgLeaderAdmin = true;
          }
          isLoggedIn = true;
        }
        deferred.resolve(data.data);
      });
      return deferred.promise;
    };

    service.logout = function() {
      var deferred = $q.defer();
      var promise = $http({method: 'GET', url: config.domain + 'logout'});
      promise.then(function(data) {
        $cookies.put('om_loggedIn', 'false');
        $cookies.remove("om_slAdmin");
        $cookies.remove("om_orgAdmin");
        service.isStudentLifeAdmin = false;
        service.isOrgLeaderAdmin = false;
        deferred.resolve(data.data);
      });
      return deferred.promise;
    };

    return service;
  }
})();
