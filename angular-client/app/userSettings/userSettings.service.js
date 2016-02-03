(function() {
  'use strict';

  angular.module('userSettings')
    .factory('userSettingsService', ['$q', '$http', 'config', GetService]);

  function GetService($q, $http, config) {
    var service = this;

    service.data = {
      users: {}
    };

    function init() {
      var promises = [];
      promises.push($http({method: 'GET', url: config.domain + 'userSettings'}));
      $q.all(promises).then(function(data) {
        console.log("in user Settings Service: " + data[0].data);
        service.data.users = data[0].data;
      });
    }

    init();

    return service;
  }
})();
