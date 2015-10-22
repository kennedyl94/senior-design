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

      //////////////////////////////////////////////////////////////////////////////////////////
      // LOCAL DEPENDENCIES
      'organizations',
      'test',
	  'createClub'

    ]);
})();
