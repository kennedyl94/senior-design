(function() {
  'use strict';

  angular.module('resetPassword')
    .factory('resetPasswordService', ['$http','config', GetService]);

  function GetService($http, config) {

    var service = this;

    service.sendReset = function(username, email) {
      $http({method: 'POST', url: config.domain + 'resetPassword/sendReset', data: {username: username, email:email}});
    };
    return service;
  }
})();
