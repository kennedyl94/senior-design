(function() {
  'use strict';

  angular.module('resetPassword')
    .factory('resetPasswordService', ['$http','config', GetService]);

  function GetService($http, config) {

    var service = this;

    service.sendReset = function(username, email) {
      $http({method: 'POST', url: config.domain + 'resetPassword/sendReset', data: {username: username, email:email}});
    };

    service.checkValidToken = function(token){
      var promise = $http({method: 'POST', url: config.domain + 'resetPassword/checkToken', data: {token: token}});
      return promise;
    };

    service.sendNewPassword = function(token, password){
      $http({method: 'POST', url: config.domain + 'resetPassword/', data: {token: token, password: password}});
    };
    
    return service;
  }
})();
