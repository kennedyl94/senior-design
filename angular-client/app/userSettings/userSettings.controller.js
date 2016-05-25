(function() {
  'use strict';

  angular.module('userSettings')
    .controller('UserSettingsController', ['userSettingsService', '$modal', 'config', '$cookies', '$confirm', Controller]);

  function Controller(userSettingsService, $modal, config, $cookies, $confirm) {
    var vm = this;
    vm.data = userSettingsService.data;
    vm.showPasswordDiv = false;
    vm.err = "";
    vm.update ={
      old:"",
      newPass:"",
      repeat:""
    };

    var editUserModal;
    var addUserModal;

    vm.isStudentLifeAdmin = function() {
      return $cookies.get('om_slAdmin');
    };

    vm.showChangePasswordDiv = function() {
      vm.showPasswordDiv = true;
    };

    // MODAL CREATIONS
    vm.openEditUserModal = function (user) {
      editUserModal = $modal.open({
        animation: true,
        templateUrl: 'directives/editUserModal/editUserModal.template.html',
        controller: 'EditUserModalController as editUserModalCtrl',
        resolve: {
          contents: function () {
            return {
              user: user,
              updateFunction: vm.modifyUser,
              deleteFunction: vm.deleteUser
            };
          }
        }
      })
    };

    vm.openAddUserModal = function (user) {
      addUserModal = $modal.open({
        animation: true,
        templateUrl: 'directives/addUserModal/addUserModal.template.html',
        controller: 'AddUserModalController as addUserModalCtrl',
        resolve: {
          contents: function () {
            return {
              addFunction: vm.addUser
            };
          }
        }
      })
    };

    vm.modifyUser = function(user) {
      userSettingsService.modifyUser(user).then(function() {
        editUserModal.close('ok');
        vm.updateUsers();
      });
    };

    vm.addUser = function(user) {
      userSettingsService.addUser(user).then(function() {
        addUserModal.close('ok');
        vm.updateUsers();
      });
    };

    vm.deleteUser = function(user) {
      $confirm({text: 'Are you sure you want to delete: ' + user.Username + '?',
        title: 'Delete User',
        ok: "Delete",
        cancel: 'Exit'})
        .then(function() {
          userSettingsService.deleteUser(user).then(function () {
            vm.updateUsers();
          });
        });
    };

    vm.updateUsers = function() {
      userSettingsService.updateUsers();
      vm.data = userSettingsService.data;
    };

    vm.changePassword = function(){
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
        var code = data.status;
        if(code == 200) {
          vm.update.old = "";
          vm.update.newPass = "";
          vm.update.repeat = "";
          vm.showPasswordDiv = false;
        } else if(code == 201){
          vm.err = "There was an error when changing your password: Incorrect Password";
        } else if(code == 202) {
          vm.err = "There was an error when changing your password: Passwords do not match";
        } else {
          vm.err = "There was an error when changing your password";
        }
      })
    }

  }
})();
