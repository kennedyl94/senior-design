(function() {
  'use strict';

  angular.module('orgSettings')
    .controller('OrgSettingsController', ['orgSettingsService', '$modal', Controller]);

  function Controller(orgSettingsService, $modal) {

    var vm = this;
    vm.data = orgSettingsService.data;

    vm.modifyOrg = function(org) {
      orgSettingsService.saveModifiedOrg(org).then(function () {
        return $modal.open({
          animation: true,
          templateUrl: 'directives/editOrgModal/editOrgModal.template.html',
          controller: 'EditOrgModalController as editOrgModalCtrl',
          resolve: {
            contents: function() {
              return {
                org: org
              };
            }
          }
        });
      });
    };

    vm.deleteOrg = function(org) {
      //DIALOG -- ARE YOU SURE YOU WANT TO DELETE THIS ORG?
      orgSettingsService.deleteOrg(org).then(function () {
        console.log('deleted org: ' + org.name);
      });
    };

    vm.inactiveOrg = function(org) {
      //DIALOG -- ARE YOU SURE YOU WANT TO MARK THIS ORG ACTIVE/INACTIVE?
      orgSettingsService.inactivity(org).then(function () {
        console.log('inactivity org: ' + org.name);
      });
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
