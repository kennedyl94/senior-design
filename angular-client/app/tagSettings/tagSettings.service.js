(function() {
  'use strict';

  angular.module('tagSettings')
    .factory('tagSettingsService', ['$http','config', GetService]);

  function GetService($q, $http, config) {

    var service = this;

    service.data = {};


    function init() {
      $http({method: 'GET', url: config.domain+"tagSettings"}).then(function(retTags) {
        service.data = {tags: retTags};
      });
    }

    service.delete = function(id, success) {
      $http({method: 'delete', url: config.domain+'tagSettings', data: id}).then(success);
    };

    service.submit = function(tag, sucess) {
      $http({method: 'post', url: config.domain + 'tagSettings', data: tag}).then(success);
    };


    init();

    return service;
  }
})();
