(function() {
  'use strict';

  angular.module('userSettings')
    .factory('userSettingsService', ['$q', '$http', 'config', '$cookies', GetService]);

  function GetService($q, $http, config, $cookies) {
    var service = this;

    service.data = {
      users: {}
    };

    function init() {
      var promises = [];
      var currentUser = $cookies.get('currentUser');
      promises.push($http({method: 'GET', url: config.domain + 'userSettings/user/' + currentUser}));
      $q.all(promises).then(function(data) {
        service.data.users = data[0].data;
      });
    }

    init();

    return service;
  }
})();
