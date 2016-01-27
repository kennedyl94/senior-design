(function() {
  'use strict';

  angular.module('logout')
    .controller('LogoutController', ['logoutService', '$state', Controller]);

  function Controller(logoutService, $state) {
    var vm = this;

    vm.logout = function() {
      logoutService.logout().then(function(response) {
        $state.go('root.organizations', { redirect : true });
      });
    };
  }
})();
