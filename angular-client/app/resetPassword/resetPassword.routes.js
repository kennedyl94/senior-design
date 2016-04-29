(function(){
  'use strict';

  angular.module('resetPassword')
    .config(['$stateProvider',
      function($stateProvider) {
        $stateProvider
          .state('root.resetPassword', {
            url:'resetPassword',
            views: {
              'content@': {
                templateUrl: 'resetPassword/resetPassword.template.html',
                controller: 'resetPasswordController',
                controllerAs: 'rstPswdCtrl'
              }
            },
            data: {
                restricted: false
            }
          });
      }]);
})();
