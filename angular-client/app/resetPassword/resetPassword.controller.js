(function() {
  'use strict';

  angular.module('resetPassword')
    .controller('resetPasswordController', ['resetPasswordService', '$state', Controller]);

  function Controller(resetPasswordService, $state) {
    var vm = this;
    vm.username = "";
    vm.email = "";
    vm.newPassword="";
    vm.confirmPassword="";
    //vm.token = $state.params.token;
    vm.validPassword = false;

    resetPasswordService.checkValidToken().then(function(data){
      if(data.code == 200){
        $state.go('root.login,' {redirect: true});
      }

    vm.parseForm = function(){
      vm.validPassword = vm.newPassword.length > 0 && vm.newPassword == vm.confirmPassword;
      if(vm.token.length > 0){
        sendNewPassword();
      }
      else{
        sendReset();
      }
    };

    function sendNewPassword(){
      if(vm.validPassword){
          resetPasswordService.sendNewPassword(vm.newPassword, vm.token);
      }
    }

    function sendReset(){
      resetPasswordService.sendReset(vm.username, vm.email);
      $state.go('root.login', {redirect: true});
    };
  }
})();
