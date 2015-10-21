(function() {
  'use strict';

  angular.module('createClub')
    .controller('createClubController', ['createClubService', '$scope', Controller]);

  function Controller(createClubService, $scope) {

    var vm = this;
    this.data = {};

    createClubService.then(function (service) {
      vm.data = service.data;
    });
  }
  
  function submit () {
	var that = this;
	this.data = {
		clubName: $("#clubName").val();
		description: $("#description").val();
		tags: $("#tags").val();
		leaderName: $("#leaderName").val();
		email: $("#email").val();
		phone: $("#phone").val();
	}
	createClubService.create(data);
  }
})();
