(function() {
  'use strict';

  angular.module('tagSearch')
    .factory('tagSearchService', ['$q', '$http', GetService]);

  function GetService($q, $http) {

    var deferred  = $q.defer();

    var service = this;

    service.data = {
      tags: {}
    };

    function init() {
      var promises = [];
      promises.push($http.get('http://orgmatcher.msoe.edu/api/tagSearch/'));
      $q.all(promises).then(function(data) {
        service.data.tags = data[0].data.tags;
        deferred.resolve(service);
      });
    }

    init();
    return deferred.promise;
  }
})();
