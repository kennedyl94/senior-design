(function() {
  'use strict';

  angular.module('tagSearch')
    .controller('TagSearchController', ['tagSearchService', Controller]);

  function Controller(tagSearchService) {

    var vm = this;
    vm.tags = tagSearchService.data.tags;
    vm.orgList = [];
    vm.submitted = false;

    vm.search = function() {
      vm.submitted = false;
      vm.orgList = [];
      tagSearchService.searchTags(vm.tags, function(tempOrgList) {
        vm.orgList = tempOrgList;
        vm.submitted = true;
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
