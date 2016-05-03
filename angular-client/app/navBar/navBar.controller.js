(function(){
  'use strict'

  angular.module('navBar')
    .controller('NavBarController', ['$scope', '$compile', '$confirm', '$location', '$cookies', '$state', 'loginService', Controller]);

  function Controller($scope, $compile, $confirm, $location, $cookies, $state, loginService) {

    var vm = this;

    $scope.$watch(function() { return $cookies.get('om_loggedIn'); }, function(loggedIn) {
      if(loggedIn.toString() == 'true') {
        $("#showLoggedIn").html($compile("<a href='' ng-click='navCtrl.logout()'>Log Out</a>")($scope));
      } else if(loggedIn.toString() == 'false') {
        $("#showLoggedIn").html("<a href='#/login'>Log In</a>");
      }
    });

    $scope.isActive = function (viewLocation) {
      return viewLocation === $location.path();
    };

    vm.logout = function() {
      $confirm({
        text: 'Are you sure you want to logout?',
        title: 'Logout',
        ok: "Yes",
        cancel: 'No'})
        .then(function() {
          loginService.logout().then(function(response) {
            $state.go('root.organizations', { redirect : true });
          });
        });
    };
  }
})();
