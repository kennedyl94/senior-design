(function() {
  'use strict';

  angular.module('approvals')
    .factory('approvalsService', ['$q', '$http', 'config', GetService]);

  function GetService($q, $http, config) {
    var service = this;

    service.data = {
      changes: {}
    };

    service.updateChanges = function(org) {
      var deferred = $q.defer();
      var promise = $http({method: 'PUT', url: config.domain + 'Organizations/modifyOrgByName', data: {org: org}});
      promise.then(function(data) {
        alert("saved (but you should still check)!!");
        deferred.resolve(data.data);
      });
      return deferred.promise;
    };

    service.removeChange = function(change) {
      var deferred = $q.defer();
      var promise = $http({method: 'DELETE', url: config.domain + 'proposeChanges/delete/' + change._id});
      promise.then(function(data) {
        alert("removed (but you should still check)!!");
        deferred.resolve();
      });
      return deferred.promise;
    };

    function init() {
      var promises = [];
      promises.push($http({method: 'GET', url: config.domain + 'proposeChanges/allChanges'}));
      $q.all(promises).then(function(data) {
        service.data.changes = data[0].data;
        console.log("got the data");
        console.log("service.data.changes: " + service.data.changes[0].name);
      });
    }

    init();

    return service;
  }
})();
