(function() {
  'use strict';

  angular.module('fileUpload')
    .directive('ngFileUpload', ['fileUploadService', 'config', Directive]);

  function Directive(fileUploadService, config) {
    return {
      restrict: 'A',
      scope: {
        callback: '&ngFileUploadCallback'
      },
      link: function (scope, element, attr) {

        element.bind('change', function () {
          var formData = new FormData();
          formData.append('file', element[0].files[0]);
          if(attr.name == "orgFile"){
            fileUploadService.uploadFile(config.domain + 'UploadFile', formData, function (callback) {
              //console.log("TEST: " + callback);
            });
          }
          else{
            fileUploadService.uploadFile(config.domain + 'UploadFile/UserFile', formData, function (callback) {
              //console.log("TEST: " + callback)
              scope.callback();
            });
          }
        });
      }
    };
  }

})();
