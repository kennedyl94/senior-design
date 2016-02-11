(function() {
  'use strict';

  angular.module('userSettings')
    .controller('UserSettingsController', ['userSettingsService', '$modal', '$window', Controller]);

  function Controller(userSettingsService, $modal, $window) {
    var vm = this;
    vm.data = userSettingsService.data;

    vm.newUser = "";
    vm.newPassword = "";
    vm.newType = "";
    vm.newOrgs = [];

    vm.user = null;
    vm.Type = "";
    vm.Orgs = [].toString();

    vm.saveChanges = function(user) {
      user.Type = vm.Type;
      user.Orgs = vm.Orgs;
      userSettingsService.saveChanges(user).then(function(response) {
      });
    };

    vm.saveNewUser = function() {
      var user = {
        Username: vm.newUser,
        Password: vm.newPassword,
        Type: vm.newType,
        Orgs: vm.newOrgs
      }
      userSettingsService.saveNewUser(user).then(function() {
        $window.location.reload();
      })
    };

    vm.deleteUser = function (username) {
      //DIALOG -- ARE YOU SURE YOU WANT TO DELETE THIS ORG?
      userSettingsService.deleteUser(username).then(function () {
        $window.location.reload();
      });
    };

    // MODAL CREATIONS
    vm.openEditUserModal = function (user) {
      console.log("open user modal for user: " + user._id);
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
      console.log("open Add user modal");
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
  }
})();
