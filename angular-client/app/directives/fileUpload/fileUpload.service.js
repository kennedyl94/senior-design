(function() {
  'use strict';

  angular.module('fileUpload')
    .factory('fileUploadService', ['$http', 'config', GetService]);

  function GetService($http, config, Upload) {

    var service = this;

    service.uploadFile = function(file, data, callback) {
      $http({
        url: file,
        method: "POST",
        data: data,
        headers: {'Content-Type': undefined}
      }).success(function (response) {
        callback(response);
      }).error(function (error) {
        callback(error);
      });
    };

    return service;
  }
})();
