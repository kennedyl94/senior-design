(function() {
  'use strict';

  angular.module('approvals')
    .controller('ApprovalsController', ['approvalsService', '$modal', Controller]);

  function Controller(approvalsService, $modal) {

    var vm = this;
    var editChangeModal;
    vm.data = approvalsService.data;

    vm.applyChange = function(change) {
      console.log("in apply change: " + change.name);
    };

    vm.approveChange = function(change) {
      var org = mapChangeToOrg(change);
      approvalsService.updateChanges(org);
      approvalsService.removeChange(change);
      alert("Change for: " + change.name + " approved!!");
    };

    function mapChangeToOrg(change) {
      return {
        name: change.name,
        description: change.description,
        tags: change.tags,
        links: change.links,
        meetings: change.meetings,
        contact: {
          name: change.contact.name,
          phone: change.contact.phone,
          email: change.contact.email
        }
      }
    }

    vm.rejectChange = function(change) {
      approvalsService.removeChange(change);
      alert("Change for: " + change.name + " rejected. SUCKS!!");
    };

    vm.openEditChangesModal = function(change) {
      editChangeModal = $modal.open({
        animation: true,
        templateUrl: 'directives/editChangeModal/editChangeModal.template.html',
        controller: 'EditChangeModalController as editChangeModalCtrl',
        resolve: {
          contents: function() {
            return {
              change: change,
              function: vm.applyChange
            };
          }
        }
      });
    };
  }
})();
