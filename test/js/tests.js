// *******************************************************************************
// * Common test setup
// *******************************************************************************
Steps.rootElement = '#qunit-fixture';
Steps.setupForTesting();
Steps.injectTestHelpers();
module("Integration Tests", {
  setup: function() {
    Steps.reset();
  }
});

// Tests ***************************************************************************

test("root has a header", function(){
  visit("/").then(function() {
    equal(find('h1').length, 1, "The first page should have a title");
  });
});
