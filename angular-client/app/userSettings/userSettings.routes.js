(function(){
  'use strict';

  angular.module('userSettings')
    .config(['$stateProvider',
      function($stateProvider) {
        $stateProvider
          .state('root.userSettings', {
            url: 'userSettings',
            views: {
              'content@': {
                templateUrl: 'userSettings/userSettings.template.html',
                controller: 'UserSettingsController',
                controllerAs: 'userSettingsCtrl'
              }
            },
            data: {
              restricted: true
            }
          });
      }]);
})();
