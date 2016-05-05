(function() {
  'use strict';

  angular.module('root')
    .controller('RootController', ['$scope', '$cookies', '$state', Controller]);

  function Controller($scope, $cookies, $state) {

    var vm = this;

    vm.isStudentLifeAdmin = $cookies.get('om_slAdmin');
    vm.isOrgAdmin = $cookies.get('om_orgAdmin');
    vm.currentUser = $cookies.get('currentUser');

    $scope.$watch(function() { return $cookies.get('om_slAdmin'); }, function(isStudentLifeAdmin) {
      vm.isStudentLifeAdmin = isStudentLifeAdmin;
    });
    $scope.$watch(function() { return $cookies.get('om_orgAdmin'); }, function(isOrgAdmin) {
      vm.isOrgAdmin = isOrgAdmin;
    });

    $scope.$watch(function() { return $cookies.get('currentUser'); }, function(currentUser) {
      vm.currentUser = currentUser;
    });

    vm.navigate = function (link) {
      $state.go(link);
    };

    vm.navButtons = [
      {
        imgUrl: "content/images/svg/overview_1.svg",
        link: "root.tagSearch",
        description: "Do you have an idea of what you are interested in? If so, check out the Tag Search feature. " +
                      "Tag Search will allow you to select tags representing your interests in order to discover " +
                      "which organizations best suit you!"
      },
      {
        imgUrl: "content/images/svg/overview_2.svg",
        link: "root.organizations",
        description: "There are many student organizations available at the Milwaukee School of Engineering. " +
                      "Click here to find out more information on the specific student organizations " +
                      "available on campus."
      },
      {
        imgUrl: "content/images/svg/overview_3.svg",
        link: "root.survey",
        description: "Are you unsure of your interests or what student organization you may want to join? " +
                      "If so, take the Student Organization Survey to be matched to a list of student organizations " +
                      "that you will most likely be interested in!"
      }
    ]


  }
})();
