(function() {
  'use strict';

  angular.module('createClub')
    .controller('CreateClubController', ['createClubService', Controller]);

  function Controller(createClubService) {

    var vm = this;
    vm.data = createClubService.data;

    vm.submitted = false;
    vm.club = {
      name: "",
      description: "",
      tags: [],
      links: "",
      meetings: "",
      contact: {
        name: "",
        email: "",
        phone: ""
      }
    };

    vm.submit = function(form) {
      vm.submitted = false;

      createClubService.submitClub(vm.club, function() {
          vm.club = {
            name: "",
            description: "",
            tags: [],
            links: "",
            meetings: "",
            contact: {
              name: "",
              email: "",
              phone: ""
            }
          };
          form.$setPristine();
          form.$setUntouched();
          vm.submitted = true;
        });
    }
  }

})();
