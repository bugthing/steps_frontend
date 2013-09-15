// Init the EmberJS application...
window.Steps = Ember.Application.create({
  LOG_TRANSITIONS: true
});
Steps.ApplicationAdapter = DS.FixtureAdapter.extend();

