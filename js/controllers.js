
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
