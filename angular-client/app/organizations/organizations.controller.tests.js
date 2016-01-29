'use strict';

describe('OrganizationsController', function() {
  var $controller;
  var organizationsService;
  var $modal;
  var $sce;

  var testImages = [
    {url: 'content/images/msoe1.jpg', name: 'Picture 1'},
    {url: 'content/images/msoe2.jpg', name: 'Picture 2'},
    {url: 'content/images/msoe3.jpg', name: 'Picture 3'},
    {url: 'content/images/msoe4.jpg', name: 'Picture 4'},
    {url: 'content/images/msoe5.jpg', name: 'Picture 5'},
    {url: 'content/images/msoe6.jpg', name: 'Picture 6'},
    {url: 'content/images/msoe7.jpg', name: 'Picture 7'}
  ];

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
        'tag1', 'tag2', 'tag3'
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
        'inactive', 'tag4'
      ],
      description: 'description_3',
      contact: {
        name: 'contact_name_3',
        email: 'contact_email_2',
        phone: 'contact_phone_3'
      }
    }
  ];

  var fakeModalInstance = {
    result: {
      then: function (backCallback) {
        //Store the callbacks for later when the user clicks on the Back button of the dialog
        this.backCallback = backCallback;
      }
    },
    back: function (type) {
      //The user clicked back on the modal dialog, call the stored cancel callback
      this.result.backCallback(type);
    }
  };

  beforeEach(function() {
    module('config');
    module('organizations');
  });

  beforeEach(module(function  ($provide) {
    $provide.value('$modal', {
      open: function() {
        return fakeModalInstance;
      }
    });
  }));

  beforeEach(inject(function(_$controller_, _organizationsService_, _$modal_, _$rootScope_, _$sce_) {
    $controller = _$controller_;
    organizationsService = _organizationsService_;
    $modal = _$modal_;
    $sce = _$sce_;
  }));

  function createController() {
    return $controller('OrganizationsController', {
      organizationsService: organizationsService,
      $modal: $modal,
      $sce: $sce
    });
  }

  describe('Single Organization', function() {
    it('should open a modal when an organization is selected', function() {
      spyOn($modal, 'open').and.callThrough();
      var ctrl = createController();
      ctrl.openModal(testOrgs[0], testImages);
      expect($modal.open).toHaveBeenCalled();
    });
  });

  describe('Search', function() {
    it('should return true search for organization name', function() {
      var ctrl = createController();
      ctrl.query = 'Org1';
      var result = ctrl.search(testOrgs[0]);
      expect(result).toBe(true);
    });
    it('should return false search for organization name', function() {
      var ctrl = createController();
      ctrl.query = 'Org3';
      var result1 = ctrl.search(testOrgs[0]);
      var result2 = ctrl.search(testOrgs[2]);
      expect(result1).toBe(false);
      expect(result2).toBe(false);
    });
    it('should return true search for organization description', function() {
      var ctrl = createController();
      ctrl.query = 'description_1';
      var result = ctrl.search(testOrgs[0]);
      expect(result).toBe(true);
    });
    it('should return false search for organization description', function() {
      var ctrl = createController();
      ctrl.query = 'description_3';
      var result1 = ctrl.search(testOrgs[0]);
      var result2 = ctrl.search(testOrgs[2]);
      expect(result1).toBe(false);
      expect(result2).toBe(false);
    });
    it('should return true search for organization tag', function() {
      var ctrl = createController();
      ctrl.query = 'tag1';
      var result = ctrl.search(testOrgs[0]);
      expect(result).toBe(true);
    });
    it('should return false search for organization tag', function() {
      var ctrl = createController();
      ctrl.query = 'tag4';
      var result1 = ctrl.search(testOrgs[0]);
      var result2 = ctrl.search(testOrgs[2]);
      expect(result1).toBe(false);
      expect(result2).toBe(false);
    });
    it('should return true search for inactive org', function() {
      var ctrl = createController();
      ctrl.query = 'inactive';
      var result = ctrl.search(testOrgs[2]);
      expect(result).toBe(true);
    });
    it('should return false search for inactive org', function() {
      var ctrl = createController();
      ctrl.query = 'inactive';
      var result = ctrl.search(testOrgs[0]);
      expect(result).toBe(false);
    });
  });
});

