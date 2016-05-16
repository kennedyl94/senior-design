(function() {
  'use strict';

  angular.module('userSettings')
    .factory('userSettingsService', ['$q', '$http', 'config', '$cookies', GetService]);

  function GetService($q, $http, config, $cookies) {
    var service = this;

    service.data = {
      users: {},
      type:""
    };

    function init() {
      var promises = [];
      var currentUser = $cookies.get('currentUser');
      promises.push($http({method: 'GET', url: config.domain + 'userSettings/user/' + currentUser}));
      promises.push($http({method: 'GET', url: config.domain + 'userSettings/userType/user/' + currentUser}));
      $q.all(promises).then(function(data) {
        service.data.users = data[0].data;
        service.data.type = data[1].data;
      });
    }
    service.updatePassword = function(old, newPass, repeat) {
      // console.log(old);
      var promises = [];
      var currentUser = $cookies.get('currentUser');

      var req = {
        method: 'post',
        url: config.domain+'userSettings/updatePass',
        headers: {},
        data: {
          user: currentUser,
          old: old,
          newPass: newPass,
          repeat: repeat
        }
      };

      promises.push($http(req));

      $q.all(promises).then(function(data) {
        service.data.users = data[0].data;
        service.data.type = data[1].data;
      });
    }

    init();

    return service;
  }
})();
