'use strict';

describe('OrganizationsService', function() {

  var organizationsService;
  var httpBackend;
  var GET_ORGS_URL;

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
    module('config');
    module('organizations');
  });

  beforeEach(inject(function (_$httpBackend_, _organizationsService_, _config_) {
    organizationsService = _organizationsService_;
    httpBackend = _$httpBackend_;
    GET_ORGS_URL = _config_.domain + "Organizations/";
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
});
