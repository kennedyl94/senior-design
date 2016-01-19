'use strict';

describe("ModifyClubController", function() {
  var $controller;
  var $rootScope;
  var $location;
  var httpBackend;
  var modifyClubService;
  var UPDATE_ORG_URL;

  var orgToUpdate =
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
  };

  beforeEach(function() {
    module('config');
    module('modifyClub');
  });

  beforeEach(inject(function(_$controller_, _$rootScope_, _$location_, _$httpBackend_, _modifyClubService_, _config_) {
    $controller = _$controller_;
    $rootScope = _$rootScope_;
    $location = _$location_;
    httpBackend = _$httpBackend_;
    modifyClubService = _modifyClubService_;
    UPDATE_ORG_URL = _config_.domain + "Organizations/modify/";
  }));

  afterEach(function() {
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });

  function createController() {
    return $controller('ModifyClubController', {
      modifyClubService: modifyClubService
    });
  }

  describe("Modify Organization", function() {
    it("should change state after successful modification", function() {
      var ctrl = createController();
      ctrl.org = orgToUpdate;
      httpBackend.expectPUT(UPDATE_ORG_URL + orgToUpdate._id).respond(orgToUpdate);
      ctrl.saveModifiedOrg();
      httpBackend.flush();
    });
  });
});

