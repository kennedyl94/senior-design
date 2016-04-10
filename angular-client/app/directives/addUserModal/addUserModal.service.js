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



    //function init() {
    //  var deferred = $q.defer();
    //  var promise = $http({method: 'GET', url: config.domain + 'Organizations/name'});
    //  promise.then(function(data) {
    //    console.log("Data: " + data);
    //    service.orgs.orgs = data[0].data;
    //    console.log(service.orgs.orgs[1].name);
    //    console.log("Org Map: " + service.orgMap.orgs);
    //    for(var i = 0; i < service.orgs.orgs.length; i++) {
    //      service.orgMap.orgs[i] = {key:service.orgs.orgs[i].name, value: service.orgs.orgs[i].name}
    //      console.log("Key: " + service.orgMap.orgs[i].key);
    //      console.log("Value: " + service.orgMap.orgs[i].value);
    //    }
    //    console.log(service.orgMap.orgs[1].key);
    //    deferred.resolve(service.orgMap.orgs);
    //  });
    //  return deferred.promise();
    //}

    //init();

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
