'use strict';

describe('OrganizationsService', function() {

  var $routeProvider;
  var $http;
  var $q;
  var orgsService;
  var deffered;

  var fakeOrgs = [
    {
      _id: "1",
      name: "Org1",
      tags: [
        "tag1", "tag2", "tag3"
      ],
      description: 'description_1',
      contact: {
        name: 'contact_name_1',
        email: 'contact_email_1',
        phone: 'contact_phone_1'
      }
    },
    {
      _id: "2",
      name: "Org2",
      tags: [
        "tag1", "tag2", "tag3"
      ],
      description: 'description_2',
      contact: {
        name: 'contact_name_2',
        email: 'contact_email_2',
        phone: 'contact_phone_2'
      }
    }
  ];

  beforeEach(function() {
    module('ngRoute');
    module('organizations');
  });

  beforeEach(module(function ($provide) {
    $provide.value('orgsService', {
      getAllOrgs: function() {
        var orgs = $q.defer();
        orgs.resolve([]);
        return orgs.promise;
      }
    })
  }));

  beforeEach(inject(function (_$http_, _$q_) {
    $http = _$http_;
    $q = _$q_;

    deffered = _$q_.defer();
  }));

  beforeEach(inject(function (_orgsService_) {
    orgsService = _orgsService_;
  }));

  describe('Get Orgs', function() {
    it('should call to get all organizations', function() {
      var deferred = $q.defer();
      deferred.resolve(fakeOrgs);

      spyOn(orgsService, 'getAllOrgs').and.returnValue(fakeOrgs);
      expect(orgsService.getAllOrgs).toHaveBeenCalled();
      expect(orgsService.getAllOrgs()).toEqual(fakeOrgs);
    });
  });



});
