


Steps.EditChartView = Ember.TextField.extend({
  didInsertElement: function () {
    this.$().focus();
  }
});
Ember.Handlebars.helper('edit-chart', Steps.EditChartView);


