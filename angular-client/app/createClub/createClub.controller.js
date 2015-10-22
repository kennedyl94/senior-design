(function() {
  'use strict';

  angular.module('createClub')
    .controller('CreateClubController', ['createClubService', Controller]);

  function Controller(createClubService) {

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
	
	vm.submit = function () {
		createClubService.create(vm.club);
	}
  }
  
  
})();
