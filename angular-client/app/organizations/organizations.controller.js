(function() {
  'use strict';

  angular.module('organizations')
    .controller('OrganizationsController', ['organizationsService', Controller]);

  function Controller(organizationService) {

    var vm = this;
    organizationService.update();
    vm.data = organizationService.data;

  }
})();
