(function() {
  'use strict';

  angular.module('orgSettings')
    .controller('OrgSettingsController', ['orgSettingsService', '$modal', '$confirm', '$scope', Controller]);

  function Controller(orgSettingsService, $modal, $confirm, $scope) {

    var vm = this;
    var editOrgModal;
    vm.data = orgSettingsService.data;

    $scope.$watch(vm.data, function(){
      vm.updateOrgs();
    });

    vm.modifyOrg = function(org) {
      orgSettingsService.saveModifiedOrg(org).then(function () {
        editOrgModal.close('ok');
        vm.updateOrgs();
      });
    };

    vm.openModifyOrgModal = function(org) {
      editOrgModal = $modal.open({
          animation: true,
          templateUrl: 'directives/editOrgModal/editOrgModal.template.html',
          controller: 'EditOrgModalController as editOrgModalCtrl',
          resolve: {
            contents: function() {
              return {
                org: org,
                function: vm.modifyOrg
              };
            }
          }
        });
    };

    vm.deleteOrg = function(org) {
      $confirm({text: 'Are you sure you want to delete: ' + org.name + '?',
                title: 'Delete Organization',
                ok: "Delete",
                cancel: 'Exit'})
        .then(function() {
          orgSettingsService.deleteOrg(org).then(function () {
            vm.updateOrgs();
          });
      });
    };

    vm.activateOrg = function(org) {
      $confirm({text: 'Are you sure you want to activate: ' + org.name + '?',
        title: 'Activate Organization',
        ok: "Activate",
        cancel: 'Exit'})
        .then(function() {
          orgSettingsService.activation(org, false).then(function () {
            vm.updateOrgs();
          });
        });
    };

    vm.deactivateOrg = function(org) {
      $confirm({text: 'Are you sure you want to deactivate: ' + org.name + '?',
        title: 'Deactivate Organization',
        ok: "Deactivate",
        cancel: 'Exit'})
        .then(function() {
          orgSettingsService.activation(org, true).then(function () {
            vm.updateOrgs();
          });
        });
    };

    vm.updateOrgs = function() {
      orgSettingsService.updateOrgs();
      vm.data = orgSettingsService.data;
    };

    vm.settingsBtns = {
      editBtn:
      {
        text: "Edit",
        function: vm.openModifyOrgModal
      },
      deleteBtn:
      {
        text: "Delete Org",
        function: vm.deleteOrg
      },
      deactivateBtn:
      {
        text: "Deactivate",
        function: vm.deactivateOrg
      },
      activateBtn:
      {
        text: "Activate",
        function: vm.activateOrg
      }
    };
  }
})();
