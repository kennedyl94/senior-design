(function() {
  'use strict';

  angular.module('tagSearch')
    .controller('TagSearchController', ['tagSearchService', Controller]);

  function Controller(tagSearchService) {

    var vm = this;
    vm.tags = tagSearchService.data.tags;
    vm.orgList = [];

    vm.search = function() {
      vm.showOrgs = false;
      vm.orgList = [];
      tagSearchService.searchTags(vm.tags, function(tempOrgList) {
        vm.orgList = tempOrgList;
      });
    }

    vm.clear = function() {
      var i = 0;
      for(i; i < vm.tags.length; i++) {
        vm.tags[i].checked = false;
      }
      vm.orgList = [];
    }
  }
})();
