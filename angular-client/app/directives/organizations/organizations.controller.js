(function(){
  angular.module('ngOrganizations')
    .controller('ngOrgsController', ['$modal', '$sce', '$scope', '$filter', Controller]);

  function Controller($modal, $sce, $scope, $filter) {
    var vm = this;

    // Manages the pagination:
    // We have to use $scope $watchers in order to deal with 'toArray' and splicing.
    $scope.totalItems = 0;
    $scope.currentPage = 1;
    $scope.itemsPerPage = 3;
    $scope.start = (($scope.currentPage-1)*$scope.itemsPerPage);
    $scope.end = (($scope.currentPage)*$scope.itemsPerPage);

    vm.pageChanged = function() {
      $scope.start = (($scope.currentPage-1)*$scope.itemsPerPage);
      $scope.end = (($scope.currentPage)*$scope.itemsPerPage);
    };

    $scope.$watch('orgs', function(orgs) {
      // We have to use the toArray filter first in order to get the length
      var temp = $filter('toArray')(orgs);
      $scope.totalItems = temp.length;
    });

    $scope.query = '';

    vm.inactive = [];
    vm.query = '';

    // Filters Orgs -- If name/description contains vm.query
    vm.search = function(org) {
      var query = vm.query || '';
      if(query != '') { query = query.toLowerCase(); }

      var name = org.name.toLowerCase();
      var description = org.description.toLowerCase();
      var tags = org.tags;

      if (query != 'inactive' && tags.indexOf('inactive') == -1) {
        var i = 0;
        for (i; i < tags.length; i++) {
          if (tags[i].toLowerCase().indexOf(query || '') !== -1) {
            return true;
          }
        }
      } else if (query == 'inactive' && tags.indexOf('inactive') != -1) {
        return true;
      }

      return !!((tags.indexOf('inactive') == -1 &&
      (name.indexOf(query || '') !== -1 || description.indexOf(query || '') !== -1)));
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

    /*vm.sortOrgs = function(selectedOption) {
      organizationService.sortOrgs(selectedOption).then(function(sortedOrgs) {
        vm.data.orgs = sortedOrgs;
      });
    };*/

    // MODAL CREATIONS
    vm.openModal = function(org, images) {

      return $modal.open({
        animation: true,
        templateUrl: 'directives/modal/modal.template.html',
        controller: 'ModalController as modalCtrl',
        resolve: {
          contents: function() {
            return {
              org: org,
              images: images
            };
          }
        }
      });
    };
  }

  // Used for slicing the orgs to be paginated.
  angular.module('ngOrganizations').filter('slice', function($filter) {
    return function(arr, start, end) {
      var temp = $filter('toArray')(arr);
      return temp.slice(start, end);
    };
  });

  /*angular.module('ngOrganizations').filter('search', function () {
    return function (org) {
      var query = vm.query || '';
      if(query != '') { query = query.toLowerCase(); }

      var name = org.name.toLowerCase();
      var description = org.description.toLowerCase();
      var tags = org.tags;

      if (query != 'inactive' && tags.indexOf('inactive') == -1) {
        var i = 0;
        for (i; i < tags.length; i++) {
          if (tags[i].toLowerCase().indexOf(query || '') !== -1) {
            return true;
          }
        }
      } else if (query == 'inactive' && tags.indexOf('inactive') != -1) {
        return true;
      }

      return !!((tags.indexOf('inactive') == -1 &&
      (name.indexOf(query || '') !== -1 || description.indexOf(query || '') !== -1)));
    };
  });*/
})();
