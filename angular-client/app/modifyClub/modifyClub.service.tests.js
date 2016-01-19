'use strict';

describe('ModifyClubService', function() {

  var modifyClubService;
  var httpBackend;
  var UPDATE_ORG_URL;

  var myUpdatedOrg =
  {
    _id: "1",
    name: "test",
    tags: [
      "tag1", "tag2", "tag3", "tag4"
    ],
    description: 'description_1_updated',
    contact: {
      name: 'contact_name_1_updated',
      email: 'contact_email_1_updated',
      phone: 'contact_phone_1_updated'
    }
  };


  beforeEach(function() {
    module('config');
    module('modifyClub');
  });

  beforeEach(inject(function (_$httpBackend_, _modifyClubService_, _config_) {
    modifyClubService = _modifyClubService_;
    httpBackend = _$httpBackend_;
    UPDATE_ORG_URL = _config_.domain + "Organizations/modify/";
  }));

  afterEach(function() {
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });

  describe('Modify Organization', function() {

    it('should modify an organization', function() {

      var updatedOrg = {};
      httpBackend.expectPUT(UPDATE_ORG_URL + myUpdatedOrg._id).respond(myUpdatedOrg);
      modifyClubService.saveModifiedOrg(myUpdatedOrg).then(function(result) {
        updatedOrg = result;
      });
      httpBackend.flush();
      expect(updatedOrg.name).toEqual('test');
      expect(updatedOrg.tags.length).toEqual(4);
      expect(updatedOrg.description).toEqual('description_1_updated');
      expect(updatedOrg.contact.name).toEqual('contact_name_1_updated');
      expect(updatedOrg.contact.email).toEqual('contact_email_1_updated');
      expect(updatedOrg.contact.phone).toEqual('contact_phone_1_updated');

    });
  });
});
