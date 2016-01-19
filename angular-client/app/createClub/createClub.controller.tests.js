'use strict';

describe("CreateClubController", function() {
  var $controller;
  var createClubService;

  var fakeClub = {
    name: "Fake",
    description: "Fake",
    tags: "tag1,tag2,tag3",
    contact: {
      name: "Ryan",
      email: "fake@fake.fake",
      phone: "(123) 456-7890"
    }
  };

  beforeEach(function() {
    module('createClub');
  });

  beforeEach(inject(function (_$controller_, _createClubService_) {
    $controller = _$controller_;
    createClubService = _createClubService_;
  }));

  function createController() {
    return $controller('CreateClubController', {
      createClubService: createClubService
    });
  }
/* Can't make test until able to test control vs service
  describe('Post new org', function() {
    it('should call to post fake org', function() {
      var ctrl = createController();
      ctrl.club = fakeClub;
      ctrl.submit(null);
    });
  });*/
});
