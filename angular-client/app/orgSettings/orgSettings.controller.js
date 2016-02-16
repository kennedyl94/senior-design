(function() {
  'use strict';

  angular.module('orgSettings')
    .controller('OrgSettingsController', ['orgSettingsService', Controller]);

  function Controller(orgSettingsService) {

    var vm = this;
    vm.data = orgSettingsService.data;
  }
})();
