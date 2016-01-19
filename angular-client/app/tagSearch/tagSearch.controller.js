(function() {
  'use strict';

  angular.module('tagSearch')
    .controller('TagSearchController', ['tagSearchService', '$http', '$modal', 'config', Controller]);

  function Controller(tagSearchService, $http, $modal, config) {

    var vm = this;
    vm.tags = [];
    vm.orgList = [];
    vm.showOrgs = false;

    tagSearchService.then(function(service) {
      var tempTags = service.data;
      var index = tempTags.indexOf('inactive');
      if (index != -1) {
        tempTags.splice(index, 1);
      }

      tempTags.forEach(function(tag) {
        vm.tags.push({text: tag, checked: false});
      });
    });

    vm.search = function() {
      var tagList = [];
      vm.orgList = [];
      vm.tags.forEach(function(tag) {
        if (tag.checked) {
          tagList.push(tag.text);
        }
      });

      var req = {
        method: 'POST',
        url: config.domain + 'tagSearch',
        headers: {},
        data: {tags: tagList}
      }

      var tempOrgList = [];
      $http(req)
        .then(function(res) {
          tempOrgList = res.data;
          tempOrgList.forEach(function(tempOrg) {
            vm.orgList.push(tempOrg.organization);
          });
        }, function(err) {console.log(err)});

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
