(function() {
  'use strict';

  angular.module('orgSettings')
    .factory('orgSettingsService', ['$q', '$http', 'config', GetService]);

  function GetService($q, $http, config) {

    var service = this;

    service.data = {
      orgs: {}
    };

    service.deleteOrg = function(org) {
      var deferred = $q.defer();
      var promise =
        $http({method: 'DELETE', url: config.domain + 'Organizations/delete/' + org._id });
      promise.then(function(data) {
        deferred.resolve();
      });
      return deferred.promise;
    };

    service.saveModifiedOrg = function(org) {
      var deferred = $q.defer();
      var promise =
        $http({method: 'PUT', data: org, url: config.domain + 'Organizations/modify/' + org._id});
      promise.then(function(data) {
        deferred.resolve();
      });
      return deferred.promise;
    };

    service.inactivity = function(org) {
      var deferred = $q.defer();
      var promise =
        $http({method: 'PUT', data: org, url: config.domain + 'Organizations/inactivity/' + org._id});
      promise.then(function(data) {
        deferred.resolve();
      });
      return deferred.promise;
    };

    function init() {
      var promises = [];
      promises.push($http({method: 'GET', url: config.domain + 'Organizations/name'}));
      $q.all(promises).then(function(data) {
        service.data.orgs = data[0].data;
      });
    }

    init();

    return service;
  }
})();
