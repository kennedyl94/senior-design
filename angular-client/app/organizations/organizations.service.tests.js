'use strict';

describe('OrganizationsService', function() {

  var organizationsService;
  var httpBackend;
  var GET_ORGS_URL = 'http://orgmatcher.msoe.edu/api/Organizations/';

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

  var options = [
    {id: "name", name: "Name"},
    {id: "description", name: "Description"},
    {id: "contact.name", name: "Contact"}
  ];

  beforeEach(function() {
    module('organizations');
  });

  beforeEach(inject(function (_$httpBackend_, _organizationsService_) {
    organizationsService = _organizationsService_;
    httpBackend = _$httpBackend_;
  }));

  afterEach(function() {
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });

  describe('Get Organizations by Name (Default)', function() {
    it('should call to get all organizations by name', function() {
      httpBackend.expectGET(GET_ORGS_URL + "name").respond(fakeOrgs);
      httpBackend.flush();
    });
  });

  describe('Sort Organizations', function() {

    it('should be defined', function() {
      httpBackend.expectGET(GET_ORGS_URL + "name").respond(fakeOrgs);
      httpBackend.flush();
      expect(organizationsService).toBeDefined();
    });

    it('should sort organizations by name', function() {
      var sortedOrgs = {};
      httpBackend.expectGET(GET_ORGS_URL + "name").respond(fakeOrgs);
      httpBackend.expectGET(GET_ORGS_URL + "name").respond(fakeOrgs);
      organizationsService.sortOrgs(options[0]).then(function(result) {
        sortedOrgs = result;
      });
      httpBackend.flush();
      expect(sortedOrgs).toEqual(fakeOrgs);
    });

    it('should sort organizations by description', function() {
      var sortedOrgs = {};
      httpBackend.expectGET(GET_ORGS_URL + "name").respond(fakeOrgs);
      httpBackend.expectGET(GET_ORGS_URL + "description").respond(fakeOrgs);
      organizationsService.sortOrgs(options[1]).then(function(result) {
        sortedOrgs = result;
      });
      httpBackend.flush();
      expect(sortedOrgs).toEqual(fakeOrgs);
    });
    it('should sort organizations by contact', function() {
      var sortedOrgs = {};
      httpBackend.expectGET(GET_ORGS_URL + "name").respond(fakeOrgs);
      httpBackend.expectGET(GET_ORGS_URL + "contact.name").respond(fakeOrgs);
      organizationsService.sortOrgs(options[2]).then(function(result) {
        sortedOrgs = result;
      });
      httpBackend.flush();
      expect(sortedOrgs).toEqual(fakeOrgs);
    });
  });
});
