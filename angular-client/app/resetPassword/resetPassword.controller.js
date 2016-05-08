(function() {
  'use strict';

  angular.module('resetPassword')
    .controller('resetPasswordController', ['resetPasswordService', '$state', Controller]);

  function Controller(resetPasswordService, $state) {
    var vm = this;
    vm.username = "";
    vm.email = "";

    vm.sendReset = function() {
      resetPasswordService.sendReset(vm.username, vm.email);
      $state.go('root.login', {redirect: true});
    };
  }
})();
