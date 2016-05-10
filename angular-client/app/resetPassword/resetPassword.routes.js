(function(){
  'use strict';

  angular.module('resetPassword')
    .config(['$stateProvider',
      function($stateProvider) {
        $stateProvider
          .state('root.resetPassword', {
            url:'resetPassword/:token',
            views: {
              'content@': {
                templateUrl: 'resetPassword/resetPassword.template.html',
                params: {
                  token: {
                    value: '',
                    squash: false
                  }
                },
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
