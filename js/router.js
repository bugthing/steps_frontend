
Steps.Router.map(function() {
  this.route("about");
  this.resource('charts',  function() { this.route("new"); });
  this.resource('chart',   { 'path' : 'charts/:chart_id' });
  this.resource('nodes',   function() { this.route("new"); });
  this.resource('node',    { 'path' : 'nodes/:node_id' });
  this.resource('actions', { 'path' : ':node_id' },  function() { this.route("new"); });
  this.resource('action',  { 'path' : 'actions/:action_id' });
});

Steps.IndexRoute = Ember.Route.extend({
  setupController: function(controller) {
    console.log("GO!");
  }
});

Steps.ChartsIndexRoute = Ember.Route.extend({
  model: function() {
    return this.get('store').find('chart');
  }
});

Steps.ChartRoute = Ember.Route.extend({
  model: function(params) {
    return this.get('store').find('chart', params.chart_id);
  },
  afterModel: function(chart, transition) {
    // TODO - make this work!
    // as per following url, perhaps you can load other related model parts here:
    //   http://discuss.emberjs.com/t/whats-the-best-way-to-decorate-an-existing-model-in-ember-js-with-additional-data-from-an-external-api/3239/2
    return this.get('store').find('node', { chart: chart.id } )
  }
});

Steps.NodesIndexRoute = Ember.Route.extend({
  model: function(params) {
    var chart = this.modelFor("chart");
    return this.get('store').find('node', { chart: chart.id } );
  }
});

Steps.NodeRoute = Ember.Route.extend({
  model: function(params) {
    return this.get('store').find('node', params.node_id);
  }
});

Steps.ActionsIndexRoute = Ember.Route.extend({
  model: function() {
    var node = this.modelFor("node");
    return this.get('store').find('action', { node: node.id });
  }
});

Steps.ActionRoute = Ember.Route.extend({
  model: function(params) {
    return this.get('store').find('action', params.action_id);
  }
});
