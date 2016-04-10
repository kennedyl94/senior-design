(function() {
  'use strict';

  angular.module('userSettings')
    .controller('UserSettingsController', ['userSettingsService', '$modal', '$window', Controller]);

  function Controller(userSettingsService, $modal, $window) {
    var vm = this;
    vm.data = userSettingsService.data;

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
  }
})();
