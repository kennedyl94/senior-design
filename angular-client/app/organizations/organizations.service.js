(function() {
  'use strict';

  angular.module('organizations')
    .factory('organizationsService', ['$q', '$http', GetService]);

  function GetService($q, $http) {

    var service = {};

    service.data = {
      organizations: null

    };


    function init() {

    }

    init();

    return service;
  }
})();
