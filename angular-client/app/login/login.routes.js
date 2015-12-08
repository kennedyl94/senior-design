(function(){
  'use strict';

  angular.module('login')
    .config(['$routeProvider',
      function($routeProvider) {
        $routeProvider
          .when('/login', {
            templateUrl: 'login/login.template.html',
            controller: 'LoginController',
            controllerAs: 'loginCtrl'
          });
      }]);

})();
