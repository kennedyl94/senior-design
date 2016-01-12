(function() {
  'use strict';

  angular.module('tagSearch')
    .controller('TagSearchController', ['tagSearchService', '$http', '$modal', Controller]);

  function Controller(tagSearchService, $http, $modal) {

    var vm = this;
    vm.tags = {};
    vm.orgs = {};
    vm.orgList = {};
    vm.showOrgs = false;

    tagSearchService.then(function(service) {
      vm.tags = service.data.tags;
      vm.tags.remove('inactive');
      vm.orgs = service.data.orgs;
    });

    vm.search = function(form) {
      var tagList = {};
      form.tagCheck.forEach(function(tag) {
        if (tag.checked) {
          tagList.push(tag.value);
        }
      });

      var tempOrgList = {};
      vm.orgs.forEach(function(org) {
        if (!org.contains('invalid')) {
          var rating = 0;
          vm.tags.forEach(function(tag) {
            if (org.tags.contains(tag)) {
              rating++;
            }
          });

          if (rating > 0) {
            tempOrgList.push({organization: org, priority: rating});
          }
        }
      });

      tempOrgList.sort(function(a,b){return -(a.priority- b.priority);});
      tempOrgList.forEach(function(tempOrg) {
        vm.orgList.push(tempOrgList.org);
      });
      vm.showOrgs = true;
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
