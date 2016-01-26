(function(){
  'use strict';

  angular.module('logout')
    .config(['$stateProvider',
      function($stateProvider) {
        $stateProvider
          .state('root.logout', {
            url:'logout',
            views: {
              'content@': {
                templateUrl: 'logout/logout.template.html',
                controller: 'LogoutController',
                controllerAs: 'logoutCtrl'
              }
            },
            data: {
              restricted: false
            }
          });
      }]);
})();
