(function() {
  'use strict';

  angular.module('organizations')
    .controller('OrganizationsController', ['organizationsService', Controller]);

  function Controller(organizationService) {

    var vm = this;
    vm.orgs = {};

    organizationService.then(function (service) {
      vm.orgs = service.orgs;
    });
  }
})();
