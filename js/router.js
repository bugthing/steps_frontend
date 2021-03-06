
Steps.Router.map(function() {
  this.route("about");
  this.resource('charts', function() {
    this.route("new");
    this.resource("chart", {path: "/:chart_id"}, function() {
      this.resource('nodes',   function() { this.route("new"); });
      this.resource('node',    { 'path' : 'nodes/:node_id' });
      this.resource('actions', { 'path' : ':node_id' },  function() { this.route("new"); });
      this.resource('action',  { 'path' : 'actions/:action_id' });
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
    var store   = this.get('store');
    var chartController = this.controllerFor('chart');
    var chartId = params.chart_id;

    return this.get('store').find('chart', chartId).then(function(chart){

      // return promise that is done when found all this charts nodes..
      return store.find('node', {chart: chartId }).then(function(nodes) {

        //// run through each node, adding it to the chart.nodes and creating an RSVP list of promises to get it's actions..
        var promises = []
        nodes.forEach(function(node, index, enumerable) {
          chart.get('nodes').pushObject(node);

        // Actions are done here!
          promises.push( store.find('action', { node: node.get('id') }).then(function(actions) {
            // .. run through each action adding to the node.actions..
            actions.forEach( function(action, index2, enumerable2) {
              node.get('actions').pushObject(action);
            });
          }));
        });
        return Ember.RSVP.all(promises);
      }).then(function() { return chart; } );
    });
  },
  actions: {
    closeModal: function() {
      this.render('nothing', { into: 'application', outlet: 'modal' });
    }
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
  },
  deactivate: function() {
    this.controllerFor('chart').drawChart();
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
  },
  deactivate: function() {
    this.controllerFor('chart').drawChart();
  }
});
