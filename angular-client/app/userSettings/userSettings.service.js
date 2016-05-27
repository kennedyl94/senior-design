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

    service.updateUsers = function() {
      init();
    };

    service.addUser = function(user) {
      var deferred = $q.defer();
      var promise = $http({method: 'PUT', url: config.domain + 'userSettings/addNew', data: {user: user}});
      promise.then(function(data) {
        deferred.resolve(data.data);
      });
      return deferred.promise;
    };

    service.modifyUser = function(user) {
      var deferred = $q.defer();
      var promise = $http({method: 'PUT', url: config.domain + 'userSettings/editExisting/' + user._id, data: {user: user}});
      promise.then(function(data) {
        deferred.resolve(data.data);
      });
      return deferred.promise;
    };

    service.deleteUser = function(user) {
      var deferred = $q.defer();
      var promise = $http({method: 'DELETE', url: config.domain + 'userSettings/delete/' + user._id});
      promise.then(function(data) {
        deferred.resolve();
      });
      return deferred.promise;
    };

    service.submit = function(post, success){
      $http(post).then(success);
    };

    service.updatePassword = function(old, newPass, repeat) {
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
        if(code == 200){

        } else {
          service.data.err="There was an error when changing your password";
        }
      })
    };

    init();

    return service;
  }
})();
