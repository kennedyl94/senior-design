(function() {
  'use strict';

  angular.module('createClub')
    .controller('CreateClubController', ['createClubService', '$http', 'config', Controller]);

  function Controller(createClubService, $http, config) {

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

    vm.submitted = false;
    vm.failed = false;

    vm.submit = function(form) {
      vm.submitted = false;
      vm.failed = false;

      var req = {
        method: 'POST',
        url: config.domain + 'createClub',
        headers: {},
        data: {club: vm.club}
      }

      $http(req)
        .success(function (data, status, headers, config) {
          vm.club = {
            name: "",
            description: "",
            tags: "",
            contact: {
              name: "",
              email: "",
              phone: ""
            }
          };
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
