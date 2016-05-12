(function(){
  'use strict';

  angular.module('approvals')
    .config(['$stateProvider',
      function($stateProvider) {
        $stateProvider
          .state('root.approvals', {
            url: 'admin/approvals',
            views: {
              'content@': {
                templateUrl: 'approvals/approvals.template.html',
                controller: 'ApprovalsController',
                controllerAs: 'approvalsCtrl'
              },
              data: {
                restricted: true,
                studentOrgs: false
              }
            }
          });
      }]);
})();
