(function() {
  'use strict';

  angular.module('ngTagSelect')
    .factory('ngTagSelectService', ['$http', 'config', GetService]);

  function GetService($http, config) {

    var service = this;

    service.data = {
      tags: {}
    };

    function init() {
      $http({method: 'GET', url: config.domain + 'tagSettings'}).then(function(retTags) {
        service.data.tags = retTags;
      });
    }

    init();

    return service;
  }
})();
