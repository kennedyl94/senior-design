(function() {
  'use strict';

  angular.module('userSettings')
    .factory('userSettingsService', ['$q', '$http', 'config', GetService]);

  function GetService($q, $http, config) {
    var service = this;

    service.data = {
      users: {}
    };

    service.addNewUser = function() {
      console.log("add user");
      var deferred = $q.defer();
      var promise = $http({method: 'POST', url: config.domain + 'userSettings/addNew', data: {username: username, type: type, orgs: orgs}});
      promise.then(function(data) {
        console.log("in defer promise: service");
        deferred.resolve();
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
