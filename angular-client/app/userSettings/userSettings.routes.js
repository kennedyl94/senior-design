(function(){
  'use strict';

  angular.module('userSettings')
    .config(['$stateProvider',
      function($stateProvider) {
        $stateProvider
          .state('root.userSettings', {
            url: 'admin/userSettings',
            views: {
              'content@': {
                templateUrl: 'userSettings/userSettings.template.html',
                controller: 'UserSettingsController',
                controllerAs: 'userSettingsCtrl'
              }
            }
          });
      }]);
})();
