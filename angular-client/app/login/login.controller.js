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
        console.log("code: " + response.code);
        console.log("type: " + response.type);
        if(response.code == 200) {
          //$state.go('root.logout', {redirect : true});
          $("#showLoggedIn").html("<a href='#/logout'>Log Out</a>");
          //alert("You have been successfully logged in!");
          $state.go('root.organizations', { redirect : true });
        } else {
          alert("Incorrect Log In Credentials");
          $state.go('root.login', {redirect: true});
        }
      });
    };
  }
})();
