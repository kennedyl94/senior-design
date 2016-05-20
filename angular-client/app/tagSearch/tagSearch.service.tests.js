'use strict';

describe('tagSearchService', function() {
  var httpBackend;
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

  beforeEach(inject(function(_$httpBackend_, _tagSearchService_, _config_) {
    tagSearchService = _tagSearchService_;
    httpBackend = _$httpBackend_;
    URL = _config_.domain + "tagSearch";
  }));

  afterEach(function() {
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });

  describe('Get tags', function() {
    it('should be defined', function() {
      httpBackend.expectGET(URL).respond(testTagTexts);
      httpBackend.flush();
      expect(tagSearchService).toBeDefined();
    });
  });

  describe("Search", function() {
    it("should return Org1", function() {
      var testTags = [];
      testTagTexts.forEach(function(tagText) {
        testTags.push({text: tagText, checked: false});
      });
      testTags[1].checked = true;

      httpBackend.expectGET(URL).respond(testTagTexts);
      httpBackend.expectPOST(URL, {tags: testTags}).respond([testOrgs[0]]);

      var tempOrgs = [];
      tagSearchService.searchTags(testTags, function(res) {
        res.forEach(function(result) {
          tempOrgs.push(result);
        });
      });
      httpBackend.flush();
      expect(tempOrgs[0].name).toEqual("Org1");
      expect(tempOrgs[0]).toEqual(testOrgs[0]);
    });
    it("should return Org2", function() {
      var testTags = [];
      testTagTexts.forEach(function(tagText) {
        testTags.push({text: tagText, checked: false});
      });
      testTags[3].checked = true;
      httpBackend.expectGET(URL).respond(testTagTexts);
      httpBackend.expectPOST(URL, {tags: testTags}).respond([testOrgs[1]]);

      var tempOrgs = [];
      tagSearchService.searchTags(testTags, function(res) {
        res.forEach(function(result) {
          tempOrgs.push(result);
        });
      });
      httpBackend.flush();
      expect(tempOrgs[0].name).toEqual("Org2");
      expect(tempOrgs[0]).toEqual(testOrgs[1]);
    });
    it("should return both orgs", function() {
      var testTags = [];
      testTagTexts.forEach(function(tagText) {
        testTags.push({text: tagText, checked: false});
      });
      testTags[0].checked = true;
      httpBackend.expectGET(URL).respond(testTagTexts);
      httpBackend.expectPOST(URL, {tags: testTags}).respond(testOrgs);

      var tempOrgs = [];
      tagSearchService.searchTags(testTags, function(res) {
        res.forEach(function(result) {
          tempOrgs.push(result);
        });
      });
      httpBackend.flush();
      expect(tempOrgs[0].name).toEqual("Org1");
      expect(tempOrgs[1].name).toEqual("Org2");
      expect(tempOrgs[0]).toEqual(testOrgs[0]);
      expect(tempOrgs[1]).toEqual(testOrgs[1]);
    });
    it("should return nothing", function() {
      var testTags = [];
      testTagTexts.forEach(function(tagText) {
        testTags.push({text: tagText, checked: false});
      });
      httpBackend.expectGET(URL).respond(testTagTexts);
      httpBackend.expectPOST(URL, {tags: testTags}).respond([]);

      var tempOrgs = [];
      tagSearchService.searchTags(testTags, function(res) {
        res.forEach(function(result) {
          tempOrgs.push(result);
        });
      });
      httpBackend.flush();
      expect(tempOrgs).toEqual([]);
    });
  });
});
