(function() {
  'use strict';

  angular.module('createClub')
    .controller('CreateClubController', ['createClubService', '$http', Controller]);

  function Controller(createClubService, $http) {

    var vm = this;
    vm.title = {};

    createClubService.then(function (service) {
      vm.title = service.data.title;
    });

    vm.club = {
      name: "",
      description: "",
      tags: "",
      contact: {
        name: "",
        email: "",
        phone: ""
      }
    }

    angular.element('#phone').formatter({
      'pattern': '({{999}}) {{999}}-{{9999}}'
    });

    vm.submitted = false;
    vm.failed = false;

    vm.submit = function(form) {
      vm.submitted = false;
      vm.failed = false;

      if (vm.club.tags.indexOf(',') != -1) {
        vm.club.tags = vm.club.tags.split(',');
      } else {
        vm.club.tags = [vm.club.tags];
      }

      var req = {
        method: 'POST',
        url: 'http://localhost:3000/createClub',
        headers: {},
        data: {club: vm.club}
      }

      $http(req)
        .success(function (data, status, headers, config) {
          console.log(vm.club);
          vm.club = {
            name: "",
            description: "",
            tags: "",
            contact: {
              name: "",
              email: "",
              phone: ""
            }
          }
          form.$setPristine();
          form.$setUntouched();
          vm.submitted = true;
        }).error(function(err, status, headers, config) {
          console.log('error: ' + err);
          vm.failed = true;
        });
    }
  }

})();
