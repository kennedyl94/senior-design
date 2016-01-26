'use strict';

describe('tagSearchService', function() {
  var $http;
  var tagSearchService;
  var URL;

  var testTagTexts = ["tag1", "tag2", "tag3", "tag4", "tag5"];
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
        "tag1", "tag4", "tag5"
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
    module('tagSearch');
  });

  beforeEach(inject(function (_$httpBackend_, _tagSearchService_, _config_) {
    tagSearchService = _tagSearchService_;
    $http = _$httpBackend_;
    URL = _config_.domain + "tagSearch";
  }));

  afterEach(function() {
    $http.verifyNoOutstandingExpectation();
    $http.verifyNoOutstandingRequest();
  });

  describe('Get tags', function() {
    it('should call to get all tags', function() {
      $http.expectGET(URL).respond(testTagTexts);
      $http.flush();
    });
  });

  describe("Search", function() {
    it("should return Org1", function() {
      var res = {data: {organization: []}};
      res.data.organization.push(testOrgs[0]);

      var testTags = [];
      testTagTexts.forEach(function(tagText) {
        testTags.push({text: tagText, checked: false});
      });
      testTags[1].checked = true;
      $http.expectPOST(URL).respond(res);

      var tempOrgs = [];
      tagSearchService.searchTags(testTags, function(resList) {
        console.log(resList.data.organization[0]);
        resList.data.organization.forEach(function(result) {
          tempOrgs.push(result);
        });
      });

      expect(tempOrgs[0].name).toEqual("Org1");
      expect(tempOrgs[0]).toEqual(testOrgs[0]);
    });
    it("should return Org2", function() {
      var res = {data: {organization: []}};
      res.data.organization.push(testOrgs[1]);

      var testTags = [];
      testTagTexts.forEach(function(tagText) {
        testTags.push({text: tagText, checked: false});
      });
      testTags[3].checked = true;
      $http.expectPOST(URL).respond(res);

      var tempOrgs = [];
      tagSearchService.searchTags(testTags, function(resList) {
        resList.forEach(function(result) {
          tempOrgs.push(result.organization);
        });
      });

      expect(tempOrgs[0].name).toEqual("Org2");
      expect(tempOrgs[0]).toEqual(testOrgs[1]);
    });
    it("should return both orgs", function() {
      var res = {data: {organization: []}};
      res.data.organization.push(testOrgs[0]);
      res.data.organization.push(testOrgs[1]);

      var testTags = [];
      testTagTexts.forEach(function(tagText) {
        testTags.push({text: tagText, checked: false});
      });
      testTags[0].checked = true;
      $http.expectPOST(URL).respond(res);

      var tempOrgs = [];
      tagSearchService.searchTags(testTags, function(resList) {
        resList.forEach(function(result) {
          tempOrgs.push(result.organization);
        });
      });

      expect(tempOrgs[0].name).toEqual("Org1");
      expect(tempOrgs[1].name).toEqual("Org2");
      expect(tempOrgs[0]).toEqual(testOrgs[0]);
      expect(tempOrgs[1]).toEqual(testOrgs[1]);
    });
    it("should return nothing", function() {
      var res = {data: {organization: []}};

      var testTags = [];
      testTagTexts.forEach(function(tagText) {
        testTags.push({text: tagText, checked: false});
      });
      $http.expectPOST(URL).respond(res);

      var tempOrgs = [];
      tagSearchService.searchTags(testTags, function(resList) {
        resList.forEach(function(result) {
          tempOrgs.push(result.organization);
        });
      });

      expect(tempOrgs).toEqual([]);
    });
  });
});
