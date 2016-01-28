(function(){
  'use strict'

  angular.module('navBar')
    .controller('NavBarController', ['$scope', '$location', '$cookies', Controller]);

  function Controller($scope, $location, $cookies) {

    var vm = this;

    $scope.$watch(function() { return $cookies.get('om_loggedIn'); }, function(loggedIn) {
      if(loggedIn.toString() == 'true') {
        $("#showLoggedIn").html("<a href='#/logout'>Log Out</a>");
      } else if(loggedIn.toString() == 'false') {
        $("#showLoggedIn").html("<a href='#/login'>Log In</a>");
      }
    });

    $("#showLoggedIn").html("<a href='#/logout'>Log Out</a>");

    $scope.isActive = function (viewLocation) {
      return viewLocation === $location.path();
    }
  }
})();
