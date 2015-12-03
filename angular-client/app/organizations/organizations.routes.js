(function(){
  'use strict';

  angular.module('organizations')
    .config(['$stateProvider',
      function($stateProvider) {
        $stateProvider
          .state('root.organizations', {
            url: 'organizations',
            views: {
              'content@': {
                templateUrl: 'organizations/organizations.template.html',
                controller: 'OrganizationsController',
                controllerAs: 'orgsCtrl'
              }
            }
          });
      }]);
})();
