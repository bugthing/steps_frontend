
Steps.ChartsNewController =  Ember.ArrayController.extend({
  actions: {
    createChart: function () {

      // Get the title set by the "New Title" text field
      var title = this.get('newTitle');
      if (!title.trim()) { return; }

      // Create the new Chart model
      var chart = this.store.createRecord('chart', {
        title: title
      });

      // Clear the "New Chart" text field
      this.set('newTitle', '');

      // Save the new model
      chart.save();

      // route to charts
      this.transitionToRoute('charts');

    }
  }
});

Steps.ChartController =  Ember.ObjectController.extend({
  isEditing: false,
  actions: {
    editChart: function () {
      this.set('isEditing', true);
    },
    acceptChanges: function () {
      this.set('isEditing', false);
      this.get('model').save();
    }
  },
  shouldRedraw: function() { return false; }.property(),
  drawChart: function(){
    console.log('controller drawChart:' + this.get('model.nodes.length'));
    //var store   = this.get('model.store'),
    //    chartId = this.get('model.id');

    //// return promise that is done when found all this charts nodes..
    //thing = store.find('node', {chart: chartId }).then(function(nodes) {

    //  // run through each node, adding it to the chart.nodes and creating an RSVP list of promises to get it's actions..
    //  var promises = []
    //  nodes.forEach(function(node, index, enumerable) {
    //    chart.get('nodes').pushObject(node);

    //    promises.push( store.find('action', { node: node.get('id') }).then(function(actions) {
    //      // .. run through each action adding to the node.actions..
    //      actions.forEach( function(action, index2, enumerable2) {
    //        node.get('actions').pushObject(action);
    //      });
    //    }));
    //  });
    //  return Ember.RSVP.all(promises); 
    //})
    this.set('shouldRedraw', true); // rely on view to true the back to false when drawn
  }.observes('model')
});

Steps.NodesNewController =  Ember.ArrayController.extend({
  needs: "chart",
  chart: Ember.computed.alias("controllers.chart"),
  actions: {
    createNode: function () {

      // Get the title set by the "New Title" text field
      var title = this.get('newTitle');
      if (!title.trim()) { return; }

      // Create the new Node model
      var node = this.store.createRecord('node', {
        title: title
      });

      // add it to the chart..
      var chart = this.get("chart.model");
      chart.get("nodes").pushObject(node);

      // Clear the "New Node" text field
      this.set('newTitle', '');

      // Save the new model
      node.save();

      // route to nodes
      this.transitionToRoute('nodes');

    }
  }
});

Steps.NodeController =  Ember.ObjectController.extend({
  isEditing: false,
  actions: {
    editNode: function () {
      this.set('isEditing', true);
    },
    acceptChanges: function () {
      this.set('isEditing', false);
      this.get('model').save();
    },
    closeModal: function () {
      this.transitionToRoute('chart');
    }
  }
});


Steps.ActionsNewController =  Ember.ArrayController.extend({
  needs: "node",
  node: Ember.computed.alias("controllers.node"),
  actions: {
    createAction: function () {

      // Get the title set by the "New Title" text field
      var title = this.get('newTitle');
      if (!title.trim()) { return; }

      // Create the new Action model
      var action = this.store.createRecord('action', {
        title: title
      });
      // add it to the node..
      var node = this.get("node.model");
      node.get("actions").pushObject(action);

      // Clear the "New Action" text field
      this.set('newTitle', '');

      // Save the new model
      action.save();

      // route to actions
      this.transitionToRoute('actions');

    }
  }
});

Steps.ActionController =  Ember.ObjectController.extend({
  isEditing: false,
  actions: {
    editAction: function () {
      this.set('isEditing', true);
    },
    acceptChanges: function () {
      this.set('isEditing', false);
      this.get('model').save();
    }
  }
});

