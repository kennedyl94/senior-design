(function(){
  'use strict';

  angular.module('login')
    .config(['$stateProvider',
      function($stateProvider) {
        $stateProvider
          .state('root.login', {
            url:'login',
            views: {
              'content@': {
                templateUrl: 'login/login.template.html',
                controller: 'LoginController',
                controllerAs: 'loginCtrl',
                access: {restricted: false}
              }
            }
          });
      }]);
})();
