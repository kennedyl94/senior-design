(function() {
  'use strict';

  angular.module('userSettings')
    .controller('UserSettingsController', ['userSettingsService', '$modal', '$window', 'config', '$cookies', Controller]);

  function Controller(userSettingsService, $modal, $window, config, $cookies) {
    var vm = this;
    vm.data = userSettingsService.data;

    vm.update ={
      old:"",
      newPass:"",
      repeat:""
    }
    vm.err=""

    // MODAL CREATIONS
    vm.openEditUserModal = function (user) {
      return $modal.open({
        animation: true,
        templateUrl: 'directives/editUserModal/editUserModal.template.html',
        controller: 'EditUserModalController as editUserModalCtrl',
        resolve: {
          contents: function () {
            return {
              user: user
            };
          }
        }
      })
    };

    // MODAL CREATIONS
    vm.openAddUserModal = function () {
      return $modal.open({
        animation: true,
        templateUrl: 'directives/addUserModal/addUserModal.template.html',
        controller: 'AddUserModalController as addUserModalCtrl',
        resolve: {
          contents: function () {
            return {

            };
          }
        }
      })
    };
    vm.changePassword = function(){
      console.log(vm.update.newPass);
      // userSettingsService.updatePassword(vm.update.old, vm.update.newPass, vm.update.repeat).then(function () {
        // vm.data.err=userSettingsService.data.err;

      // });
      var currentUser = $cookies.get('currentUser');
      var req = {
        method: 'post',
        url: config.domain+'userSettings/updatePass',
        headers: {},
        data: {
          user: currentUser,
          old: vm.update.old,
          newPass: vm.update.newPass,
          repeat: vm.update.repeat
        }
      };
      userSettingsService.submit(req, function (data) {
        console.log(data);
        var code = data.status;
        console.log(code);
        if(code == 200){
          location.reload();
        } else if(code == 201){
          vm.err="There was an Error Changing your Password: Incorrect Password";
        } else if(code == 202) {
          vm.err = "There was an Error Changing your Password: Passwords do not match";
        } else {
          vm.err = "There was an Error Changing your Password";
        }

      })

    }

  }
})();
