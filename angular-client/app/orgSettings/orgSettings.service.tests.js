'use strict';

describe('OrganizationsSettingsService', function() {

  var orgSettingsService;
  var httpBackend;
  var GET_ORGS_URL;
  var DELETE_ORG_URL;
  var MODIFY_ORG_URL;
  var ACTIVATION_ORG_URL;

  var testOrgs = [
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
    module('config');
    module('orgSettings');
  });

  beforeEach(inject(function (_$httpBackend_, _orgSettingsService_, _config_) {
    orgSettingsService = _orgSettingsService_;
    httpBackend = _$httpBackend_;
    GET_ORGS_URL = _config_.domain + "Organizations/";
    DELETE_ORG_URL = _config_.domain + "Organizations/delete/";
    MODIFY_ORG_URL = _config_.domain + "Organizations/modify/";
    ACTIVATION_ORG_URL = _config_.domain + "Organizations/activation/";
  }));

  afterEach(function() {
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });

  describe('test service calls', function() {
    it('should call to delete an organization', function() {
      httpBackend.expectGET(GET_ORGS_URL + "name").respond(testOrgs);
      httpBackend.expectDELETE(DELETE_ORG_URL + testOrgs[0]._id).respond();
      orgSettingsService.deleteOrg(testOrgs[0]);
      httpBackend.flush();
    });
    it('should call to modify an organization', function() {
      httpBackend.expectGET(GET_ORGS_URL + "name").respond(testOrgs);
      httpBackend.expectPUT(MODIFY_ORG_URL + testOrgs[0]._id).respond();
      orgSettingsService.saveModifiedOrg(testOrgs[0]);
      httpBackend.flush();
    });
    it('should call to change inactivity of an organization', function() {
      httpBackend.expectGET(GET_ORGS_URL + "name").respond(testOrgs);
      httpBackend.expectPUT(ACTIVATION_ORG_URL + testOrgs[0]._id).respond();
      orgSettingsService.activation(testOrgs[0], true);
      httpBackend.flush();
    });
  });
});
