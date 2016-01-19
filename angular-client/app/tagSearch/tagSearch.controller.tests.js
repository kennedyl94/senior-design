'use strict';

describe("TagSearchController", function() {
  var $controller;
  var tagSearchService;
  var $modal;

  var testTagTexts = ["tag1", "tag2", "tag3", "tag4", "tag5"];

  var testImages = [
    {url: "content/images/msoe1.jpg", name: "Picture 1"},
    {url: "content/images/msoe2.jpg", name: "Picture 2"},
    {url: "content/images/msoe3.jpg", name: "Picture 3"},
    {url: "content/images/msoe4.jpg", name: "Picture 4"},
    {url: "content/images/msoe5.jpg", name: "Picture 5"},
    {url: "content/images/msoe6.jpg", name: "Picture 6"},
    {url: "content/images/msoe7.jpg", name: "Picture 7"}
  ];

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

  var fakeModalInstance = {
    result: {
      then: function(backCallback) {
        //Store the callbacks for later when the user clicks on the Back button of the dialog
        this.backCallback = backCallback;
      }
    },
    back: function(type) {
      //The user clicked back on the modal dialog, call the stored cancel callback
      this.result.backCallback(type);
    }
  };

  var ctrl;

  beforeEach(function() {
    module('tagSearch');
    ctrl = createController();
    ctrl.tags = [];
    testTagTexts.forEach(function(tagText) {
      ctrl.tags.push({text: tagText, checked: false});
    });
  });

  beforeEach(module(function($provide) {
    $provide.value('$modal', {
      open: function() {
        return fakeModalInstance;
      }
    });
  }));

  beforeEach(inject(function(_$controller_, _tagSearchService_, _$modal_) {
    $controller = _$controller_;
    tagSearchService = _tagSearchService_;
    $modal = _$modal_;
  }));

  function createController() {
    return $controller('TagSearchController', {
      tagSearchService: tagSearchService,
      $modal: $modal
    });
  }

  describe("Single Organization", function() {
    it("should open a modal when an organization is selected", function() {
      spyOn($modal, 'open').and.callThrough();
      ctrl.openModal(testOrgs[0], testImages);
      expect($modal.open).toHaveBeenCalled();
    });
  });
/* Can't make test until able to test control vs service
  describe("Search", function() {
    it("should return Org1", function() {
      ctrl.tags[1].checked = true;
      var res = {};
      res.data.organization = [];
      res.data.organization.push(testOrgs[0]);
      $http.expectPOST(URL).respond(res);
      ctrl.search();
      expect(ctrl.orgList[0].name).toBe("Org1");
    });
    it("should return Org2", function() {
      ctrl.tags[3].checked = true;
      var res = {};
      res.data.organization = [];
      res.data.organization.push(testOrgs[1]);
      $http.expectPOST(URL).respond(res);
      ctrl.search();
      expect(ctrl.orgList[0].name).toBe("Org2");
    });
    it("should return both orgs", function() {
      ctrl.tags[0].checked = true;
      var res = {};
      res.data.organization = [];
      res.data.organization.push(testOrgs[0]);
      res.data.organization.push(testOrgs[1]);
      $http.expectPOST(URL).respond(res);
      ctrl.search();
      expect(ctrl.orgList[0].name).toBe("Org1");
      expect(ctrl.orgList[1].name).toBe("Org2");
    });
    it("should return nothing", function() {
      var res = {};
      res.data.organization = [];
      $http.expectPOST(URL).respond(res);
      ctrl.search();
      expect(ctrl.orgList).toBe([]);
    });
  });*/
});
