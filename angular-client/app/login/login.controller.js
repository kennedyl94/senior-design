(function() {
  'use strict';

  angular.module('login')
    .controller('LoginController', ['loginService', '$state', Controller]);

  function Controller(loginService, $state) {
    var vm = this;
    vm.username = "";
    vm.password = "";

    vm.login = function() {
      loginService.login(vm.username, vm.password).then(function(response) {
        if(response.code == 200) {
          $("#showLoggedIn").html("<a href='#/logout'>Log Out</a>");
          $state.go('root.organizations', { redirect : true });
        } else {
          $state.go('root.login', {redirect: true});
        }
      });
    };
  }
})();
