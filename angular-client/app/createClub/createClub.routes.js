(function(){
  'use strict';

  angular.module('createClub')
    .config(['$stateProvider',
      function($stateProvider) {
        $stateProvider
          .state('root.createClub', {
            url: 'createClub',
            views: {
              'content@': {
                templateUrl: 'createClub/createClub.template.html',
                controller: 'CreateClubController',
                controllerAs: 'crClCtrl'
              }
            },
            data: {
              restricted: true
            }
          });
      }]);
})();
