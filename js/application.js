

// Init the EmberJS application...
window.Steps = Ember.Application.create({
  LOG_TRANSITIONS: true
});

// define what to use to get data into models...

// Test Fixtures:
//Steps.ApplicationAdapter = DS.FixtureAdapter.extend();

//// REST:
Steps.ApplicationAdapter = DS.RESTAdapter.extend({
  namespace: 'steps' // database name to use for mongo api
});

