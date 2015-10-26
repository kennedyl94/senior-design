(function() {
  'use strict';

  angular.module('organizations')
    .controller('OrganizationsController', ['organizationsService', '$q', '$http', '$modal', Controller]);

  function Controller(organizationService, $q, $http, $modal) {

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

    /** MODAL STUFF **/

    vm.openModal = function(org) {

      return $modal.open({
        animation: true,
        templateUrl: 'directives/modal/modal.template.html',
        controller: 'ModalController as modalCtrl',
        resolve: {
          contents: function () {
            return {
              org: org
            };
          }
        }
      });
    };

    organizationService.then(function (service) {
      vm.orgs = service.orgs;
    });
  }
})();
