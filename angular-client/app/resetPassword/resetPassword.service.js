(function() {
  'use strict';

  angular.module('resetPassword')
    .factory('resetPasswordService', ['$q', '$http','config', '$cookies', GetService]);

  function GetService($q, $http, config, $cookies) {

    var service = this;

    service.sendReset = function(username, email) {
      $http({method: 'POST', url: config.domain + 'resetPassword', data: {username: username, email:email}});
    };
    return service;
  }
})();
