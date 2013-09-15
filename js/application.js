

// Init the EmberJS application...
window.Steps = Ember.Application.create({
  LOG_TRANSITIONS: true
});

// define what to use to get data into models...

// Test Fixtures:
Steps.ApplicationAdapter = DS.FixtureAdapter.extend();

//// REST:
//Steps.ApplicationAdapter = DS.RESTAdapter.extend({
//  namespace: 'steps' // I hacked in support for this (not why i had to)
//});

