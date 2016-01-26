(function() {
  'use strict';

  angular.module('logout')
    .controller('LogoutController', ['logoutService', '$state', Controller]);

  function Controller(logoutService, $state) {
    var vm = this;

    vm.logout = function() {
      logoutService.logout().then(function(response) {
        console.log("Log out controller response: " + response);
        $("#showLoggedIn").html("<a href='#/login'>Log In</a>");
        $state.go('root.organizations', { redirect : true });
      });
    };
  }
})();
