(function(){
  'use strict';

  angular.module('tagSettings')
    .config(['$stateProvider',
      function($stateProvider) {
        $stateProvider
          .state('root.tagSettings', {
            url: 'admin/tagSettings',
            views: {
              'content@': {
                templateUrl: 'tagSettings/tagSettings.template.html',
                controller: 'tagSettingsController',
                controllerAs: 'tagSetCtrl'
              }
            },
            data: {
              restricted: true
            }
          });
      }]);
})();
