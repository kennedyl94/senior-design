(function() {
  'use strict';

  angular.module('orgSettings')
    .controller('OrgSettingsController', ['orgSettingsService', Controller]);

  function Controller(orgSettingsService) {

    var vm = this;
    vm.data = orgSettingsService.data;

    vm.modifyOrg = function() {
      console.log('modifyOrg?');
    };

    vm.deleteOrg = function(org) {
      console.log('deleteOrg?');

    };

    vm.inactiveOrg = function(org) {
      console.log('inactiveOrg?');
    };

    vm.settingsBtns = {
      editBtn:
      {
        text: "Edit",
        function: vm.modifyOrg
      },
      deleteBtn:
      {
        text: "Delete",
        function: vm.deleteOrg
      },
      inactiveBtn:
      {
        text: "Mark Inactive",
        function: vm.inactiveOrg
      }
    };
  }
})();
