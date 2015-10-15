(function(){
  'use strict';

  angular.module('test')
    .config(['$routeProvider',
      function($routeProvider) {
        $routeProvider
          .when('/test', {
            templateUrl: 'test/test.template.html',
            controller: 'TestController',
            controllerAs: 'testCtrl'
          });
      }]);

})();
