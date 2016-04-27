(function() {
  'use strict';

  angular.module('orgSettings')
    .controller('OrgSettingsController', ['orgSettingsService', 'emailService', '$modal', '$confirm', '$scope', '$cookies', Controller]);

  function Controller(orgSettingsService, emailService, $modal, $confirm, $scope, $cookies) {

    var vm = this;
    var editOrgModal;
    vm.data = orgSettingsService.data;
    vm.proposedChange = {
      name: "",
      description: "",
      tags: "",
      links: "",
      meetings: "",
      contact: {
        name: "",
        email: "",
        phone: ""
      }
    };

    $scope.$watch(vm.data, function(){
      vm.updateOrgs();
    });

    vm.modifyOrg = function(org) {
      var isStudentOrgAdmin = $cookies.get('om_orgAdmin');
      console.log("is org admin: " + isStudentOrgAdmin);
      if(isStudentOrgAdmin == 'true') {
        console.log("propose change");
        vm.proposeChange(org);
      } else {
        console.log("save change");
        orgSettingsService.saveModifiedOrg(org).then(function () {
          editOrgModal.close('ok');
          vm.updateOrgs();
        });
      }
    };

    vm.proposeChange = function(org) {
      var changes = vm.mapOrgInfoToChanges(org);
      orgSettingsService.submitProposedChange(changes).then(function() {
        emailService.proposeChange(changes);
        editOrgModal.close('ok');
        vm.updateOrgs();
      });
    };

    vm.mapOrgInfoToChanges = function(org){
      vm.proposedChange.name = org.name;
      vm.proposedChange.description = org.description;
      vm.proposedChange.tags = org.tags;
      vm.proposedChange.links = org.links;

      if (org.meetings == undefined) {
        vm.proposedChange.meetings = ' ';
      } else {
        vm.proposedChange.meetings = org.meetings;
      }

      vm.proposedChange.contact = org.contact;

      return vm.proposedChange;
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
