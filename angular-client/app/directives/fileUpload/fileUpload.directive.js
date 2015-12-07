(function() {
  'use strict';

  angular.module('fileUpload')
    .directive('ngFileUpload', ['fileUploadService', Directive]);

  function Directive(fileUploadService) {
    return {
      restrict: 'A',
      scope: true,
      link: function (scope, element, attr) {

        element.bind('change', function () {
          var formData = new FormData();
          formData.append('file', element[0].files[0]);
          fileUploadService.uploadFile('http://orgmatcher.msoe.edu/api/UploadFile', formData, function (callback) {
            console.log("TEST: " + callback);
          });
        });

      }
    };
  }

})();
