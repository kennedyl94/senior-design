(function() {
  'use strict';

  angular.module('login')
    .controller('LoginController', ['loginService', Controller]);

  function Controller(loginService) {
    var vm = this;
    vm.username = "";
    vm.password = "";

    vm.login = function() {
      console.log("something in controller");
      loginService.login(vm.username, vm.password).then(function(response) {
        console.log("Response: " + response);
        //todo carry on from here after authenticating!!!!
      });
    }
  }
})();
