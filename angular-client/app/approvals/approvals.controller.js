(function() {
  'use strict';

  angular.module('approvals')
    .controller('ApprovalsController', ['approvalsService', Controller]);

  function Controller(approvalsService) {

    var vm = this;
    vm.data = approvalsService.data;
    vm.address = "";
    vm.showEmailField = false;

    vm.approveChange = function(change) {
      var org = vm.mapChangeToOrg(change);
      approvalsService.updateOrg(org);
      approvalsService.removeChange(change);
      location.reload();
    };

    vm.mapChangeToOrg = function(change) {
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
    };

    vm.rejectChange = function(change) {
      approvalsService.removeChange(change);
      location.reload();
    };

    vm.showAdminEmail = function() {
      vm.showEmailField = true;
    };

    vm.changeEmail = function() {
      approvalsService.changeEmail(vm.address);
      vm.showEmailField = false;
      vm.address = "";
    }
  }
})();
