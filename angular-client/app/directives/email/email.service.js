(function() {
  'use strict';

  angular.module('email')
    .factory('emailService', ['$q','$http','config', GetService]);

  function GetService($q, $http, config) {

    var service = this;

    service.sendResults = function(address, orgs) {
      $http({method: 'POST', url: config.domain + 'email', data: {address: address, result: orgs}});
    };

    service.proposeChange = function(changes) {
      $http({method: 'POST', url: config.domain + 'email/proposeChange', data: {result: changes}});
    };

    return service;
  }
})();
