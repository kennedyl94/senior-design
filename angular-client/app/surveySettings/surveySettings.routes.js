(function(){
  'use strict';

  angular.module('surveySettings')
    .config(['$stateProvider',
      function($stateProvider) {
        $stateProvider
          .state('root.surveySettings', {
            url: 'admin/surveySettings',
            views: {
              'content@': {
                templateUrl: 'surveySettings/surveySettings.template.html',
                controller: 'SurveySettingsController',
                controllerAs: 'surveySettingsCtrl'
              }
            }
          });
      }]);
})();
