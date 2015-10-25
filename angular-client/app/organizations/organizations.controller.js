(function() {
  'use strict';

  angular.module('organizations')
    .controller('OrganizationsController', ['organizationsService', '$q', '$http', Controller]);

  function Controller(organizationService, $q, $http) {

    var vm = this;
    vm.orgs = {};

    vm.options = [
      {id: "name", name: "Name"},
      {id: "description", name: "Description"},
      {id: "contact.name", name: "Contact"}
    ];

    vm.selectedOption = vm.options[0];

    vm.sortOrgs = function(selectedOption) {
      var deferred = $q.defer();
      var promise =
        $http({method: 'GET', url: 'http://localhost:3000/Organizations/' + selectedOption.id});
      promise.then(function(data) {
        vm.orgs = data.data;
        deferred.resolve();
      });
    };

    organizationService.then(function (service) {
      vm.orgs = service.orgs;
    });
  }
})();
