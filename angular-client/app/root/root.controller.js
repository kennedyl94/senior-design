(function() {
  'use strict';

  angular.module('root')
    .controller('RootController', ['$scope', '$cookies', '$state', Controller]);

  function Controller($scope, $cookies, $state) {

    var vm = this;

    vm.isStudentLifeAdmin = $cookies.get('om_slAdmin');

    $scope.$watch(function() { return $cookies.get('om_slAdmin'); }, function(isStudentLifeAdmin) {
      vm.isStudentLifeAdmin = isStudentLifeAdmin;
    });
    $scope.$watch(function() { return $cookies.get('om_orgAdmin'); }, function(isOrgAdmin) {
      vm.isOrgAdmin = isOrgAdmin;
    });

    vm.navigate = function (link) {
      $state.go(link);
    };

    vm.navButtons = [
      {
        imgUrl: "content/images/svg/overview_1.svg",
        link: "root.tagSearch",
        description: "TAG SEARCH"
      },
      {
        imgUrl: "content/images/svg/overview_2.svg",
        link: "root.organizations",
        description: "ORGANIZATIONS"
      },
      {
        imgUrl: "content/images/svg/overview_3.svg",
        link: "root.survey",
        description: "SURVEY"
      }
    ]


  }
})();
