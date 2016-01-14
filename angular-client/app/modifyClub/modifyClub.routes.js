(function(){
  'use strict';

  angular.module('modifyClub')
    .config(['$stateProvider',
      function($stateProvider) {

        $stateProvider
          .state('root.modifyClub', {
            url: 'modifyClub',
            views: {
              'content@': {
                templateUrl: 'modifyClub/modifyClub.template.html',
                controller: 'ModifyClubController',
                controllerAs: 'modClubCtrl'
              }
            },
            params: {
              org: null
            }
          });
      }]);
})();
