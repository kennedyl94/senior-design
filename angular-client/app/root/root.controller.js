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

    vm.navigate = function (image) {
      $state.go(image.link);
    };

    vm.navButtons = [
      {
        imgUrl: "content/images/svg/approval.svg",
        link: "root.tagSearch"
      },
      {
        imgUrl: "content/images/svg/approval.svg",
        link: "root.organizations"
      },
      {
        imgUrl: "content/images/svg/approval.svg",
        link: "root.survey"
      }
    ]


  }
})();
