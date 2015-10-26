(function() {
  'use strict';

  angular.module('orgFinder',
    [
      /*
       Below are all of the dependencies to the application.
       */

      //////////////////////////////////////////////////////////////////////////////////////////
      // 3rd PARTY DEPENDENCIES

      /* ngRoute is Angular's routing library. */
      'ngRoute',

      /* ngAnimate is Angular's own animation library. */
      'ngAnimate',

      /* ngCookies is Angular's library for manipulating cookies. */
      'ngCookies',

      /* ui.bootstrap is a rewrite of many of Bootstrap's components in Angular */
      'ui.bootstrap',

      //////////////////////////////////////////////////////////////////////////////////////////
      // LOCAL DEPENDENCIES
      'organizations',
	    'createClub',
      'modal'

    ]);
})();
