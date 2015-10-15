(function() {
  'use strict';

  angular.module('organizations')
    .controller('OrganizationsController', ['organizationsService', Controller]);

  function Controller(organizationService) {

    var vm = this;

    vm.data = organizationService.data;

    console.log("TESTING!");
    console.dir("TESTING!");
  }
})();
