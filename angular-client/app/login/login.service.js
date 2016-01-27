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
          if(data.data.type == "SL") {
            $cookies.put('om_slAdmin', 'true');
            service.isStudentLifeAdmin = true;
          } else if(data.data.type == "Org") {
            service.isOrgLeaderAdmin = true;
          }
          isLoggedIn = true;
        }
        deferred.resolve(data.data);
      });
      return deferred.promise;
    };

    /*service.setLoginStatus = function(loggedIn) {
      isLoggedIn = loggedIn;
      if(!loggedIn) {
        service.isStudentLifeAdmin = false;
        service.isOrgLeaderAdmin = false;
      }
    }*/

    /*service.getLoginStatus = function() {
      return isLoggedIn;
    };*/

    return service;
  }
})();
