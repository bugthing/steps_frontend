
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
  }
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

