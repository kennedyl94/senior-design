'use strict';

describe('OrganizationsDirective', function() {
  var $compile;
  var $rootScope;
  var scope;
  var elem;
  var isolatedScope;

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
      name: 'Org3',
      tags: [
        'tag1', 'tag5', 'tag6'
      ],
      description: 'description_3',
      contact: {
        name: 'contact_name_3',
        email: 'contact_email_3',
        phone: 'contact_phone_3'
      }
    }
  ];


  beforeEach(function() {
    module('templates'); // We must load our cached templates first
    module('ngOrganizations');
    inject(function(_$compile_, _$rootScope_) {
      $compile = _$compile_;
      $rootScope = _$rootScope_;
      scope = $rootScope.$new();

      elem = angular.element('<ng-organizations orgs="orgs" total-items="totalItems" items-per-page="itemsPerPage"></ng-organizations>');
      scope.orgs = testOrgs;
      scope.totalItems = testOrgs.length;
      scope.itemsPerPage = 2;
      $compile(elem)(scope);
      scope.$apply();
    });
  });

  describe("pagination", function() {
    it('should display the first page with 2 orgs', function() {
      var divs = elem.find('.org-display-div');
      expect(divs.length).toBe(2);
    });

    it('should display the second page with 1 org', function() {
      scope.currentPage = 2;
      scope.$apply();
      var divs = elem.find('.org-display-div');
      expect(divs.length).toBe(1);
    });
  });

  describe("search", function() {
    it('should display only 1 organization', function() {
      scope.query = "idk";
      scope.$apply();
      var divs = elem.find('.org-display-div');
      expect(divs.length).toBe(1);
    });
  });
});

