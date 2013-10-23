
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
    var chart = this.modelFor("chart");
    // currently failing attempt to query server.. like so:
    //return this.get('store').find('node', { chart: chart.id } );
    // .. sets up filter instead:
    this.get('store').find('node');
    return this.get('store').filter('node', function(record){ 
      return record.get('chart') == chart
    });
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
    this.get('store').find('action');
    return this.get('store').filter('action', function(record){ 
      return record.get('node') == node
    });
  }
});

Steps.ActionRoute = Ember.Route.extend({
  model: function(params) {
    return this.get('store').find('action', params.action_id);
  }
});
