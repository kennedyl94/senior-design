(function() {
  'use strict';

  angular.module('organizations')
    .factory('organizationsService', ['$q', '$http', GetService]);

  function GetService($q, $http) {

    var deferred  = $q.defer();
    var service = this;

    service.orgs = {};

    function init() {
      //WAIT UNTIL BACK-END ROUTE IS SETUP

      /*var promises = [];
      promises.push($http({method: 'GET', url: ''}));
      $q.all(promises).then(function(data) {
        service.data.orgs = data[0].data;
        deferred.resolve(service);
      });*/

      // FOR NOW USE SOME TEST DATA...
      service.orgs =[
        {
          "name": "name1",
          "property2": "testproperty",
          "property3": "testproperty",
          "property4": "testproperty",
          "property5": "testproperty"
        },
        {
          "name": "name2",
          "property2": "testproperty",
          "property3": "testproperty",
          "property4": "testproperty",
          "property5": "testproperty"
        },
        {
          "name": "name3",
          "property2": "testproperty",
          "property3": "testproperty",
          "property4": "testproperty",
          "property5": "testproperty"
        }
      ];
      deferred.resolve(service);
    }

    init();
    return deferred.promise;
  }
})();
