(function() {
  'use strict';

  angular.module('orgSettings')
    .factory('orgSettingsService', ['$q', '$http', 'config', '$cookies', GetService]);

  function GetService($q, $http, config, $cookies) {

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

    service.activation = function(org, isActive) {
      var deferred = $q.defer();
      var promise =
        $http({method: 'PUT', data: {isActive: isActive}, url: config.domain + 'Organizations/activation/' + org._id});
      promise.then(function(data) {
        deferred.resolve();
      });
      return deferred.promise;
    };

    service.updateOrgs = function() {
      init();
    };

    function init() {
      var promises = [];
      var currentUser = $cookies.get('currentUser');
      promises.push($http({method: 'GET', url: config.domain + 'Organizations/user/' + currentUser}));
      $q.all(promises).then(function(data) {
        service.data.orgs = data[0].data;
      });
    }

    init();

    return service;
  }
})();
