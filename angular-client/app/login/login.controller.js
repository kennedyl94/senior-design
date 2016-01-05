(function() {
  'use strict';

  angular.module('login')
    .controller('LoginController', ['loginService', '$window', Controller]);

  function Controller(loginService, $window) {
    var vm = this;
    vm.username = "";
    vm.password = "";

    vm.login = function() {
      console.log("something in controller");
      loginService.login(vm.username, vm.password).then(function(response) {
        //console.log("Response: " + response);
        console.log("Logged In - Username: " + vm.username);
        $window.location.href = '/#/organizations';
      });
    }

    vm.logout = function() {
      loginService.logout().then(function(response) {
        //console.log("Log out response: " + response);
        console.log("Logged Out - Username: " + vm.username);
        $window.location.href = '#/organizations';
      });
    }
  }
})();
