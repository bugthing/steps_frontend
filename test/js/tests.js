// *******************************************************************************
// * Common test setup
// *******************************************************************************
// * Helpers:
Ember.Test.registerHelper('dblclick', function(app, selector, context) {
  var $el = findWithAssert(selector, context);
  Ember.run(function() {
    $el.dblclick();
  });
  return wait();
});
Ember.Test.registerHelper('focusOut', function(app, selector, context) {
  var $el = findWithAssert(selector, context);
  Ember.run(function() {
    $el.focusout();
  });
  return wait();
});
// * Setuo:
Steps.rootElement = '#qunit-fixture';
Steps.setupForTesting();
Steps.injectTestHelpers();
module("Integration Tests", {
  setup: function() {
    Steps.ApplicationAdapter = DS.FixtureAdapter.extend(); // Apply test fixtures.
    Steps.reset();
  }
});


// Tests ***************************************************************************

test("root has a header", function(){
  visit("/").then(function() {
    equal(find('h1').length, 1, "The first page should have a heading");
  });
});

test("list charts -> select chart -> double click title to edit -> update on focus out", function(){
  visit("/charts").then(function() {
    equal(find('a:contains("Chart One")').length, 1, "There should be a link to Chart One");
    return click('a:contains("Chart One")');
  }).then(function() {
    equal(find('a:contains("Nodes")').length, 1, "There should be a link to nodes");
    equal(find('label:contains("Chart One")').length, 1, "It displays the title of the chart");
    return dblclick('label:contains("Chart One")')
  }).then(function() {
    equal(find('input[value="Chart One"]').length, 1, "It shows an input for the chart title");
    return fillIn('input', "Updated Chart One");
  }).then(function() {
    return focusOut('input');
  }).then(function() {
    equal(find('label:contains("Updated Chart One")').length, 1, "It displays the updated title of the chart");
  })
});

test("new chart -> enter title -> see new chart in list", function(){
  visit("/charts/new").then(function() {
    equal(find('input').length, 1, "There should be an input box");
    return fillIn('input', "My New Chart");
  }).then(function() {
    return focusOut('input');
  }).then(function() {
    equal(find('a:contains("My New Chart")').length, 1, "It displays the title of the new chart");
  })
});

test("view chart -> list nodes -> new node -> fill in title -> see new node in list", function(){
  visit("/charts/1").then(function() {
    equal(find('a:contains("Nodes")').length, 1, "There should be a link to Nodes list");
    return click('a:contains("Nodes")');
  }).then(function() {
    return click('a:contains("New Node")');
  }).then(function() {
    return fillIn('input', "My New Node");
  }).then(function() {
    return focusOut('input');
  }).then(function() {
    equal(find('a:contains("My New Node")').length, 1, "It displays the title of the new node");
  })

});

