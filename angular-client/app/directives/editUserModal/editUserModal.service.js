(function() {
  'use strict';

  angular.module('editUserModal')
    .factory('editUserModalService', ['$q', '$http', 'config', GetService]);

  function GetService($q, $http, config) {

    var service = this;

    service.saveChanges = function(user) {
      var deferred = $q.defer();
      var promise = $http({method: 'PUT', url: config.domain + 'userSettings/editExisting/' + user._id, data: {user: user}});
      promise.then(function(data) {
        deferred.resolve(data.data);
      });
      return deferred.promise;
    };

    service.deleteUser = function(user) {
      var deferred = $q.defer();
      var promise =
        $http({method: 'DELETE', url: config.domain + 'userSettings/delete/' + user._id});
      promise.then(function(data) {
        deferred.resolve();
      });
      return deferred.promise;
    };

    return service;
  }
})();
