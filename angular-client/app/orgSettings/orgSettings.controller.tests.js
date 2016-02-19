'use strict';

describe("OrgSettingsController", function() {
  var $controller;
  var orgSettingsService;
  var $modal;
  var $confirm;

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

  beforeEach(function() {
    module('angular-confirm');
    module('config');
    module('orgSettings');
  });

  beforeEach(module(function($provide) {
    $provide.value('$modal', {
      open: function() {
        return fakeModalInstance;
      }
    });
  }));

  beforeEach(inject(function(_$controller_, _orgSettingsService_, _$modal_, _$confirm_) {
    $controller = _$controller_;
    orgSettingsService = _orgSettingsService_;
    $modal = _$modal_;
    $confirm = _$confirm_;
  }));

  function createController() {
    return $controller('OrgSettingsController', {
      orgSettingsService: orgSettingsService,
      $modal: $modal,
      $confirm: $confirm
    });
  }

  describe('test edit org modal', function() {
     it('should open a modal when an organization is selected', function() {
      var ctrl = createController();
      spyOn($modal, 'open').and.callThrough();
      ctrl.openModifyOrgModal(testOrgs[0], null);
      expect($modal.open).toHaveBeenCalled();
    });
  });
});
