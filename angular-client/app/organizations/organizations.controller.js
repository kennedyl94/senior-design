(function() {
  'use strict';

  angular.module('organizations')
    .controller('OrganizationsController', ['organizationsService', '$q', '$http', '$modal', '$sce', Controller]);

  function Controller(organizationService, $q, $http, $modal, $sce) {

    var vm = this;
    vm.data = organizationService.data;

    vm.query = "";

    // Filters Orgs -- If name/description contains vm.query
    vm.search = function (org) {
      var name = org.name.toLowerCase();
      var description = org.description.toLowerCase();
      var query = vm.query || '';
      if(query != '') { query = query.toLowerCase(); }
      return !!((name.indexOf(query || '') !== -1 || description.indexOf(query || '') !== -1));
    }

    // Highlights organization description words that match vm.query
    vm.highlight = function(text, search) {
      if(!search) {
        return $sce.trustAsHtml(text);
      }
      return $sce.trustAsHtml(text.replace(new RegExp(search, 'gi'), '<span class="highlightedText">$&</span>'));
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

    vm.options = [
      {id: "name", name: "Name"},
      {id: "description", name: "Description"},
      {id: "contact.name", name: "Contact"}
    ];

    vm.selectedOption = vm.options[0];

    vm.sortOrgs = function(selectedOption) {
      organizationService.sortOrgs(selectedOption).then(function (sortedOrgs) {
        vm.data.orgs = sortedOrgs;
      });
    };

    // MODAL CREATIONS
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
