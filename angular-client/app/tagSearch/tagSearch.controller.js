(function() {
  'use strict';

  angular.module('tagSearch')
    .controller('TagSearchController', ['tagSearchService', '$modal', Controller]);

  function Controller(tagSearchService, $modal) {

    var vm = this;
    vm.tags = tagSearchService.data.tags;
    vm.orgList = [];
    vm.showOrgs = false;

    vm.search = function() {
      vm.showOrgs = false;
      vm.orgList = [];

      tagSearchService.searchTags(vm.tags, function(tempOrgList) {
        tempOrgList.forEach(function(tempOrg) {
          vm.orgList.push(tempOrg.organization);
        });
        vm.showOrgs = true;
      });
    }

    // -- TODO --
    // DUMMY DATA UNTIL IMAGE DATA IS ADDED TO ORGANIZATION SCHEMA
    vm.images = [
      {url: "content/images/msoe1.jpg", name: "Picture 1"},
      {url: "content/images/msoe2.jpg", name: "Picture 2"},
      {url: "content/images/msoe3.jpg", name: "Picture 3"},
      {url: "content/images/msoe4.jpg", name: "Picture 4"},
      {url: "content/images/msoe5.jpg", name: "Picture 5"},
      {url: "content/images/msoe6.jpg", name: "Picture 6"},
      {url: "content/images/msoe7.jpg", name: "Picture 7"}
    ];

    vm.openModal = function(org, images) {

      return $modal.open({
        animation: true,
        templateUrl: 'directives/modal/modal.template.html',
        controller: 'ModalController as modalCtrl',
        resolve: {
          contents: function () {
            return {
              org: org,
              images: images
            };
          }
        }
      });
    };
  }

})();
