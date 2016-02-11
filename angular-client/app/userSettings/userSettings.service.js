(function() {
  'use strict';

  angular.module('userSettings')
    .factory('userSettingsService', ['$q', '$http', 'config', GetService]);

  function GetService($q, $http, config) {
    var service = this;

    service.data = {
      users: {}
    };

    //service.saveNewUser = function(user) {
    //  var deferred = $q.defer();
    //  var promise = $http({method: 'PUT', url: config.domain + 'userSettings/addNew', data: {user: user}});
    //  promise.then(function(data) {
    //    deferred.resolve(data.data);
    //  });
    //  return deferred.promise;
    //};

    service.saveChanges = function(user) {
      var deferred = $q.defer();
      var promise = $http({method: 'PUT', url: config.domain + 'userSettings/editExisting/' + user._id, data: {user: user}});
      promise.then(function(data) {
        deferred.resolve(data.data);
      });
      return deferred.promise;
    };

    service.deleteUser = function(username) {
      var deferred = $q.defer();
      var promise =
        $http({method: 'DELETE', url: config.domain + 'userSettings/delete/'+username});
      promise.then(function(data) {
        deferred.resolve();
      });
      return deferred.promise;
    };

    function init() {
      var promises = [];
      promises.push($http({method: 'GET', url: config.domain + 'userSettings'}));
      $q.all(promises).then(function(data) {
        service.data.users = data[0].data;
      });
    }

    init();

    return service;
  }
})();
