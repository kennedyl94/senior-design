(function() {
  'use strict';

  angular.module('tagSearch')
    .controller('TagSearchController', ['tagSearchService', '$http', Controller]);

  function Controller(tagSearchService, $http) {

    var vm = this;
    vm.tags = {};
    vm.orgs = {};

    tagSearchService.then(function(service) {
      vm.tags = service.data.tags;
      vm.tags.remove('inactive');
    });

    vm.search = function(form) {
      var tagList = {};
      form.tagCheck.forEach(function(tag) {
        if(tag.checked) {
          tagList.push(tag.value);
        }
      });
    }

  }

})();
