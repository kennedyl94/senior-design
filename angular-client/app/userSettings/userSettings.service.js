(function() {
  'use strict';

  angular.module('userSettings')
    .factory('userSettingsService', ['$q', '$http', 'config', '$cookies', GetService]);

  function GetService($q, $http, config, $cookies) {
    var service = this;

    service.data = {
      users: {},
      type:"",
      err:""
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
    service.submit = function(post, success){
      $http(post).then(success);
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
        var code = data[0].status;
        // console.log(code);
        if(code == 200){
          location.reload();
        } else {
          service.data.err="There was an Error Changing your Password";
        }

      })

    }

    init();

    return service;
  }
})();
