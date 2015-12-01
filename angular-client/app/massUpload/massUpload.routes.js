(function(){
  'use strict';

  angular.module('massUpload')
    .config(['$routeProvider',
      function($routeProvider) {
        $routeProvider
          .when('/massUpload', {
            templateUrl: 'massUpload/massUpload.template.html',
          });
      }]);

})();
