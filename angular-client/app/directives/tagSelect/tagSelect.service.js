(function() {
  'use strict';

  angular.module('ngTagSelect')
    .factory('ngTagSelectService', ['$q', '$http', 'config', GetService]);

  function GetService($q, $http, config) {

    var service = this;

    service.data = {
      tags: {}
    };

    function init() {
      var promises = [];
      promises.push($http({method: 'GET', url: config.domain + 'tagSettings'}));
      $q.all(promises).then(function(data) {
        service.data.tags = data[0].data;
      });
    }

    init();

    return service;
  }
})();
