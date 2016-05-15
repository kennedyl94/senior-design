(function() {
  'use strict';

  angular.module('tagSettings')
    .factory('tagSettingsService', ['$http','config', GetService]);

  function GetService($http, config) {

    var service = this;

    service.data = {};


    function init() {
      console.log("Test");
      $http({method: 'GET', url: config.domain+"tagSettings"}).then(function(retTags) {
        console.log(retTags);
        service.data = {tags: retTags};
      });
    }

    service.delete = function(id, success) {
      $http({method: 'delete', url: config.domain+'tagSettings/' + id}).then(success);
    };

    service.submit = function(tag, success) {
      $http({method: 'PUT', url: config.domain + 'tagSettings', data: {tag: tag}}).then(success);
    };

    service.edit = function(id, tag, success) {
      $http({method: 'POST', url: config.domain + 'tagSettings/' + id, data: {tag: tag}}).then(success);
    };

    init();

    return service;
  }
})();
