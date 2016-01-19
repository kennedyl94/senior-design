(function() {
  'use strict';

  angular.module('modifyClub')
    .controller('ModifyClubController', ['modifyClubService', '$stateParams', '$state', Controller]);

  function Controller(modifyClubService, $stateParams, $state) {

    var vm = this;

    vm.org = $stateParams.org;

    /*angular.element('#phone').formatter({
      'pattern': '({{999}}) {{999}}-{{9999}}'
    });*/

    vm.saveModifiedOrg = function() {

      if (vm.org.tags.indexOf(',') != -1) {
        vm.org.tags = vm.org.tags.split(',');
      } else {
        vm.org.tags = [vm.org.tags];
      }

      modifyClubService.saveModifiedOrg(vm.org).then(function () {
        //$state.go('root.organizations', { redirect : true });
      });
    }
  }

})();
