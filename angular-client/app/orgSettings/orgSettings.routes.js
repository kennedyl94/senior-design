(function(){
  'use strict';

  angular.module('orgSettings')
    .config(['$stateProvider',
      function($stateProvider) {
        $stateProvider
          .state('root.orgSettings', {
            url: 'admin/orgSettings',
            views: {
              'content@': {
                templateUrl: 'orgSettings/orgSettings.template.html',
                controller: 'OrgSettingsController',
                controllerAs: 'orgSettingsCtrl'
              }
            },
            data: {
              restricted: true
            }
          });
      }]);
})();
