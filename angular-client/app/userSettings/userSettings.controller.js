(function() {
  'use strict';

  angular.module('userSettings')
    .controller('UserSettingsController', ['userSettingsService', Controller]);

  function Controller(userSettingsService) {
    var vm = this;
    vm.data = userSettingsService.data;

    vm.editUser = function(username, type, orgs) {
      console.log("edit user: " + username);
      console.log("edit type: " + type);
      console.log("edit orgs: " + orgs);
    }
  }
})();
