'use strict';

describe('OrganizationsController', function() {
  var $compile;
  var $scope;
  var $httpBackend;

  beforeEach(function() {
    module('orgFinder');
    module('ngOrganizations');
  });

  beforeEach(inject(function(_$compile_, _$rootScope_) {
    $compile = _$compile_;
    $scope = _$rootScope_.$new();
  }));

  describe("test", function() {
    it("should do something", function() {
      var elem = angular.element('<ng-organizations></ng-organizations>');
      $compile(elem)($scope);
      $scope.$digest();
      var controller = elem.controller('ngOrganizations');
      console.log(controller);
    });
  });

  function createController() {
    return $controller('OrganizationsController', {
      organizationsService: organizationsService,
      $modal: $modal,
      $sce: $sce
    });
  };
});

