

Steps.ChartsNewController =  Ember.ArrayController.extend({
  actions: {
    createChart: function () {

      // Get the todo title set by the "New Todo" text field
      var title = this.get('newTitle');
      if (!title.trim()) { return; }

      // Create the new Todo model
      var todo = this.store.createRecord('chart', {
        title: title
      });

      // Clear the "New Chary" text field
      this.set('newTitle', '');

      // Save the new model
      todo.save();
    }
  }
});


