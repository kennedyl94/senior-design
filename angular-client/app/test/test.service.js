(function() {
  'use strict';

  angular.module('test')
    .factory('testService', ['$q', '$http', GetService]);

  function GetService($q, $http) {

    var deferred  = $q.defer();

    var service = this;

    service.data = {
      testString: null
    };

    function init() {
      var promises = [];
      promises.push($http({method: 'GET', url: 'http://localhost:3000/test'}));
      $q.all(promises).then(function(data) {
        service.data.testString = data[0].data;
        deferred.resolve(service);
      });
    }

    init();
    return deferred.promise;
  }
})();
