(function() {
  'use strict';

  angular.module('userSettings')
    .controller('UserSettingsController', ['userSettingsService', '$modal', Controller]);

  function Controller(userSettingsService, $modal) {
    var vm = this;
    vm.data = userSettingsService.data;

    vm.add = function() {
      userSettingsService.addNewUser().then(function(response) {
        console.log("back from add");
        //$window.location.reload();
      })
    };

    vm.deleteUser = function (username) {
      //DIALOG -- ARE YOU SURE YOU WANT TO DELETE THIS ORG?
      userSettingsService.deleteUser(username).then(function () {
        $window.location.reload();
      });
    };

    // MODAL CREATIONS
    vm.openUserModal = function (user) {
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
  }
})();
