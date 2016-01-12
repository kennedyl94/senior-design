(function() {
  'use strict';

  angular.module('tagSearch')
    .factory('tagSearchService', ['$q', '$http', 'config', GetService]);

  function GetService($q, $http, config) {

    var deferred  = $q.defer();

    var service = this;

    service.data = {
      tags: {},
      orgs: {}
    };

    function init() {
      var promises = [];
      promises.push($http.get(config.domain + 'tagSearch'));
      $q.all(promises).then(function(data) {
        //console.log(data[0].data);
        service.data.tags = data[0].data.tags;
        service.data.orgs = data[0].data.orgs;
        deferred.resolve(service);
      });
    }

    init();
    return deferred.promise;
  }
})();
