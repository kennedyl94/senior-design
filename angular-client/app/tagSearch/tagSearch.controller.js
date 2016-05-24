(function() {
  'use strict';

  angular.module('tagSearch')
    .controller('TagSearchController', ['tagSearchService', Controller]);

  function Controller(tagSearchService) {

    var vm = this;
    tagSearchService.update();
    vm.data = tagSearchService.data;
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
      vm.submitted = false;
      var i = 0;
      for(i; i < vm.data.tags.length; i++) {
        vm.data.tags[i].checked = false;
      }
      vm.orgList = [];
    }
  }
})();
