(function(){
  'use strict';

  angular.module('survey')
    .config(['$stateProvider',
      function($stateProvider) {
        $stateProvider
          .state('root.survey', {
            url: 'survey',
            views: {
              'content@': {
                templateUrl: 'survey/survey.template.html',
                controller: 'SurveyController',
                controllerAs: 'surveyCtrl'
              }
            }
          });
      }]);
})();
