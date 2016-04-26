(function() {
  'use strict';

  angular.module('orgFinder',
    [
      /*
       Below are all of the dependencies to the application.
       */

      //////////////////////////////////////////////////////////////////////////////////////////
      // 3rd PARTY DEPENDENCIES

      /*The 'ui-router' is provided by the 'angular-ui-router' package. It manages all of
      the routing in the application and allows for advanced features such as multiple
      views on a page, nested views, and most importantly state.
      (This functionality should be implemented in Angular 2.0!)
      See: http://angularjs.blogspot.com/2015/09/angular-2-survey-results.html */
      'ui.router',

      /* Bootstrap's components in Angular */
      'ui.bootstrap',

      /* allows a JSON object to be converted into an array when using ng-repeat */
      'angular-toArrayFilter',

      /* used for $cookieStore to maintain session variables */
      'ngCookies',

      /* confirm dialog
      *  https://github.com/Schlogen/angular-confirm
      */
      'angular-confirm',

      //////////////////////////////////////////////////////////////////////////////////////////
      // LOCAL DEPENDENCIES
      'config',
      'templates',
      'root',
      'navBar',
      'ngNavSidebar',
      'ngOrganizations',
      'navSidebar',
      'navOrgSidebar',
      'approvals',
      'userSettings',
      'editUserModal',
      'addUserModal',
      'orgSettings',
      'surveySettings',
      'organizations',
	    'createClub',
      'modal',
      'editOrgModal',
      'survey',
      'massUpload',
      'fileUpload',
      'login',
      'logout',
      'tagSearch',
      'email'
    ])

    .run(['$rootScope', '$location', '$cookies', function ($rootScope, $location, $cookies) {
    $rootScope.$on('$stateChangeStart', function (event, next) {
      if (next.data && next.data.restricted && $cookies.get('om_slAdmin') == 'false') {
        $location.path('/login');
      } else if(next.data && next.data.studentOrgs && $cookies.get('om_orgAdmin') == 'false') {
        $location.path('/login');
      }
    });
  }]);
})();
