(function() {
  'use strict';

  angular.module('tagSearch')
    .factory('tagSearchService', ['$q', '$http', 'config', GetService]);

  function GetService($q, $http, config) {

    var deferred  = $q.defer();

    var service = this;

    service.data = {};

    function init() {
      var promises = [];
      promises.push($http.get(config.domain + 'tagSearch'));
      $q.all(promises).then(function(data) {
        service.data = data[0].data;
        deferred.resolve(service);
      });
    }

    init();
    return deferred.promise;
  }
})();
