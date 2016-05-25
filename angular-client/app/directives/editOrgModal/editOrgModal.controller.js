(function() {
  'use strict';
  angular.module('editOrgModal')
    .controller('EditOrgModalController', ['$modalInstance', 'contents', Controller]);

  function Controller($modalInstance, contents) {
    var vm = this;

    vm.org = contents.org;

    vm.modifiedOrg = {
      _id: vm.org._id,
      name: vm.org.name,
      description: vm.org.description,
      tags: vm.org.tags,
      links: vm.org.links,
      meetings: vm.org.meetings,
      contact: {
        name: vm.org.contact.name,
        email: vm.org.contact.email,
        phone: vm.org.contact.phone
      }
    };
    vm.function = contents.function;

    vm.back = function() {
      $modalInstance.close('ok');
    };
  }
})();
