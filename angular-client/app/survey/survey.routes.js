(function(){
  'use strict';

  angular.module('survey')
    .config(['$routeProvider',
      function($routeProvider) {
        $routeProvider
          .when('/survey', {
            templateUrl: 'survey/survey.template.html',
            controller: 'SurveyController',
            controllerAs: 'surveyCtrl'
          });
      }]);

})();
