
Steps.Router.map(function() {
  this.route("about");
  this.resource('charts', function() {
    this.route("new");
    this.resource("chart", {path: "/:chart_id"}, function() {
      this.resource('nodes', function() {
        this.route("new");
        this.resource('node', { path: '/:node_id' }, function() {
          this.resource('actions', function() {
            this.route("new");
            this.resource('action', { path: '/:action_id' }, function() {
            });
          });
        });
      });
    });
  });
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
  }
});

Steps.NodesIndexRoute = Ember.Route.extend({
  model: function(params) {
    console.log("GO!:");
    return this.get('store').find('node');
  }
});

Steps.NodeRoute = Ember.Route.extend({
  model: function(params) {
    return this.get('store').find('node', params.node_id);
  }
});

Steps.ActionsIndexRoute = Ember.Route.extend({
  model: function() {
    return this.get('store').find('action');
  }
});

Steps.ActionRoute = Ember.Route.extend({
  model: function(params) {
    return this.get('store').find('action', params.action_id);
  }
});
