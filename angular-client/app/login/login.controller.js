(function() {
  'use strict';

  angular.module('login')
    .controller('LoginController', ['loginService', '$window', '$state', '$scope', '$location', Controller]);

  function Controller(loginService, $window, $state) {
    var vm = this;
    vm.username = "";
    vm.password = "";

    vm.login = function() {
      console.log("something in controller");
      loginService.login(vm.username, vm.password).then(function(response) {
        console.log("code: " + response.code);
        console.log("type: " + response.type);
        if(response.code == 200) {
          console.log("Response: " + response);
          console.log("Logged In - Username: " + vm.username);
          console.log("User status: " + loginService.isLoggedIn());
          //alert("You have been successfully logged in!");
          $state.go('root.organizations', { redirect : true });
        } else {
          alert("Incorrect Log In Credentials");
          $state.go('root.login', {redirect: true});
        }
      });
    };

    vm.logout = function() {
      loginService.logout().then(function(response) {
        //console.log("Log out response: " + response);
        console.log("Logged Out - Username: " + vm.username);
        alert("You have been successfully logged out!");
        $state.go('root.organizations', { redirect : true });
        $window.location.reload();
      });
    };

    //vm.isActive = function () {
    //  console.log(loginService.user);
    //  return loginService.user;
    //}
  }
})();
