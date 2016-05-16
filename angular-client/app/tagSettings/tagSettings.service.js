(function() {
  'use strict';

  angular.module('tagSettings')
    .factory('tagSettingsService', ['$q', '$http', 'config', GetService]);

  function GetService($q, $http, config) {

    var service = this;

    service.data = {};

    service.updateTags = function() {
      init();
    };

    function init() {
      var promises = [];
      promises.push($http({method: 'GET', url: config.domain + 'tagSettings'}));
      $q.all(promises).then(function(data) {
        service.data.tags = data[0].data;
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
