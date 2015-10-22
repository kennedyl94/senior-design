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
			phone: 0
		}
	}

    vm.submit = function() {

      var req = {
        method: 'POST',
        url: 'http://localhost:3000/createClub',
        headers: {},
        data: {club: vm.club}
      }

      $http(req)
        .success(function (data, status, headers, config) {
          console.log(vm.club);
        }).error(function(err, status, headers, config) {
          console.log('error: ' + err);
        });
    }
  }

})();
