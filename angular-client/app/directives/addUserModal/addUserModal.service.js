(function() {

  angular.module('addUserModal')
    .factory('addUserModalService', ['$q', '$http', 'config', GetService]);

  function GetService($q, $http, config) {

    var service = this;

    service.data = {
      orgs: {}
    };

    function init() {
      var promises = [];
      promises.push($http({method: 'GET', url: config.domain + 'Organizations/name'}));
      $q.all(promises).then(function(data) {
        for(var i = 0; i< data[0].data.length; i++) {
          service.data.orgs[i] = data[0].data[i].name;
          console.log(service.data.orgs[i]);
        }
      });
    }

    init();

    service.saveNewUser = function(user) {
      var deferred = $q.defer();
      var promise = $http({method: 'PUT', url: config.domain + 'userSettings/addNew', data: {user: user}});
      promise.then(function(data) {
        deferred.resolve(data.data);
      });
      return deferred.promise;
    };

    return service;
  }
})();
