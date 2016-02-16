'use strict';

describe('OrganizationsDirectiveController', function() {
  var $rootScope;
  var $controller;
  var $modal;
  var $filter;
  var $scope;
  var ctrl;

  var testOrgs = [
    {
      _id: '1',
      name: 'Org1',
      tags: [
        'tag1', 'tag2', 'tag3'
      ],
      description: 'description_1',
      contact: {
        name: 'contact_name_1',
        email: 'contact_email_1',
        phone: 'contact_phone_1'
      }
    },
    {
      _id: '2',
      name: 'Org2',
      tags: [
        'tag1', 'tag2', 'tag4'
      ],
      description: 'description_2',
      contact: {
        name: 'contact_name_2',
        email: 'contact_email_2',
        phone: 'contact_phone_2'
      }
    },
    {
      _id: '3',
      name: 'aOrg13',
      tags: [
        'tag1', 'tag5', 'tag6'
      ],
      description: 'adescription_13',
      contact: {
        name: 'acontact_name_13',
        email: 'contact_email_13',
        phone: 'contact_phone_13'
      }
    }
  ];

  var fakeModalInstance = {
    result: {
      then: function (backCallback) {
        //Store the callbacks for later when the user clicks on the Back button of the dialog
        this.backCallback = backCallback;
      }
    },
    back: function (type) {
      //The user clicked back on the modal dialog, call the stored cancel callback
      this.result.backCallback(type);
    }
  };

  beforeEach(module(function ($provide) {
    $provide.value('$modal', {
      open: function() {
        return fakeModalInstance;
      }
    });
  }));

  beforeEach(function() {
    module('ngOrganizations');
    inject(function(_$rootScope_, _$controller_, _$modal_, _$filter_) {
      $rootScope = _$rootScope_;
      $controller = _$controller_;
      $modal = _$modal_;
      $filter = _$filter_;
      $scope = $rootScope.$new();

      var dictionaryOfControllerBindings  = {
        orgs: testOrgs,
        totalItems: testOrgs.length,
        itemsPerPage: 2,
        currentPage: 1,
        query: '',
        filtered: []
      };

      ctrl = $controller('ngOrgsController', {$modal:$modal, $scope:$scope, $filter:$filter}, dictionaryOfControllerBindings);
      $scope.ngOrgsCtrl = ctrl;
    });
  });

  describe('test controller bindings', function() {
    it('orgs should be binded', function() {
      expect(ctrl.orgs).toBe(testOrgs);
    });
    it('totalItems should be binded', function() {
      expect(ctrl.totalItems).toBe(testOrgs.length);
    });
    it('itemsPerPage should be binded', function() {
      expect(ctrl.itemsPerPage).toBe(2);
    });
    it('currentPage should be binded', function() {
      expect(ctrl.currentPage).toBe(1);
    });
    it('query should be binded', function() {
      expect(ctrl.query).toBe('');
    });
    it('filtered should be empty', function() {
      expect(ctrl.filtered.length).toBe(0);
    });
  });

  describe('test search filter', function() {
    it('should return (0) organizations', function() {
      ctrl.query = 'iamnotanamedescriptionortag';
      $scope.$digest();
      expect(ctrl.filtered.length).toBe(0);
    });
    it('should return (1) organization searching by organization name', function() {
      ctrl.query = 'Org13';
      $scope.$digest();
      expect(ctrl.filtered.length).toBe(1);
    });
    it('should return (2) organizations searching by organization name', function() {
      ctrl.query = 'Org1';
      $scope.$digest();
      expect(ctrl.filtered.length).toBe(2);
    });
    it('should return (3) organizations searching by organization name', function() {
      ctrl.query = 'Org';
      $scope.$digest();
      expect(ctrl.filtered.length).toBe(3);
    });
    it('should return (1) organization searching by organization description', function() {
      ctrl.query = 'description_13';
      $scope.$digest();
      expect(ctrl.filtered.length).toBe(1);
    });
    it('should return (2) organizations searching by organization description', function() {
      ctrl.query = 'description_1';
      $scope.$digest();
      expect(ctrl.filtered.length).toBe(2);
    });
    it('should return (3) organizations searching by organization description', function() {
      ctrl.query = 'description';
      $scope.$digest();
      expect(ctrl.filtered.length).toBe(3);
    });
    it('should return (1) organization searching by tags', function() {
      ctrl.query = 'tag6';
      $scope.$digest();
      expect(ctrl.filtered.length).toBe(1);
    });
    it('should return (2) organizations searching by tags', function() {
      ctrl.query = 'tag2';
      $scope.$digest();
      expect(ctrl.filtered.length).toBe(2);
    });
    it('should return (3) organizations searching by tags', function() {
      ctrl.query = 'tag1';
      $scope.$digest();
      expect(ctrl.filtered.length).toBe(3);
    });
    it('should return (all) organizations when query is empty string', function() {
      ctrl.query = '';
      $scope.$digest();
      expect(ctrl.filtered.length).toBe(3);
    });
    it('should ensure orgs is the same length as filtered', function() {
      ctrl.query = '';
      $scope.$digest();
      expect(ctrl.orgs.length).toBe(ctrl.filtered.length);
    });
    it('should ensure current page is set back to 1 on each search', function() {
      ctrl.query = '';
      $scope.$digest();
      ctrl.currentPage = 2;
      ctrl.query = 'newsearch';
      $scope.$digest();
      expect(ctrl.currentPage).toBe(1);
    });
    it('should return an empty array if input is undefined', function() {
      var filtered = $filter('search')(undefined, 'my_query');
      ctrl.orgs = filtered;
      $scope.$digest();
      expect(ctrl.orgs.length).toBe(0);
    });
  });

  describe('test startFrom filter', function() {
    it('should return an empty array if input is undefined', function() {
      var filtered = $filter('startFrom')(undefined, 1);
      ctrl.orgs = filtered;
      $scope.$digest();
      expect(ctrl.orgs.length).toBe(0);
    });
    it('should start from the (2nd) org', function() {
      var filtered = $filter('startFrom')(ctrl.orgs, 1);
      ctrl.orgs = filtered;
      $scope.$digest();
      expect(ctrl.orgs.length).toBe(2);
    });
  });

  describe('test sorting', function() {
    it('should sort by name (placing new org in front)', function() {
      var filtered = $filter('orderBy')(ctrl.orgs, ctrl.options[0].id);
      ctrl.orgs = filtered;
      $scope.$digest();
      expect(ctrl.orgs[0].name).toBe('aOrg13');
    });
    it('should sort by name (placing new org in front)', function() {
      var filtered = $filter('orderBy')(ctrl.orgs, ctrl.options[1].id);
      ctrl.orgs = filtered;
      $scope.$digest();
      expect(ctrl.orgs[0].description).toBe('adescription_13');
    });
    it('should sort by name (placing new org in front)', function() {
      var filtered = $filter('orderBy')(ctrl.orgs, ctrl.options[2].id);
      ctrl.orgs = filtered;
      $scope.$digest();
      expect(ctrl.orgs[0].contact.name).toBe('acontact_name_13');
    });
  });

  describe('test inactive orgs', function() {
    it('should not display inactive orgs when query is not inactive', function() {
      ctrl.orgs[0].tags.push('inactive');
      $scope.$digest();
      expect(ctrl.filtered.length).toBe(2);
    });
    it('should display inactive orgs when query is inactive', function() {
      ctrl.query = 'inactive';
      ctrl.orgs[0].tags.push('inactive');
      $scope.$digest();
      expect(ctrl.filtered.length).toBe(1);
    });
  });

  describe('test modal', function() {
    it('should open a modal when an organization is selected', function() {
      spyOn($modal, 'open').and.callThrough();
      ctrl.openModal(testOrgs[0], null);
      expect($modal.open).toHaveBeenCalled();
    });
  });
});

