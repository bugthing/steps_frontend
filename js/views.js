
Steps.ChartView = Ember.View.extend({
});

Steps.ChartNodeView = Ember.View.extend({
  template: Ember.Handlebars.compile('<div>{{view.content.title}}</div>'),
  classNameBindings: ['chartNodeClass'],
  chartNodeClass: function() {
    return 'chart-node btn chart-node-' + this.get('content.id');
  }.property()
  // TODO: get this to be dynamic and uniq
  //, elementId: 'chartNodeId'
});

Steps.ChartNodesView = Ember.CollectionView.extend({
  classNames: ['chart-nodes'],
  itemViewClass: Steps.ChartNodeView.extend()
})

Steps.ChartActionView = Ember.View.extend({
  action: Ember.required(), // set via binding in chart template
  classNameBindings: ['chartActionClass'],
  chartActionClass: function() {
    return 'chart-action btn';
  }.property('action')
});

Steps.EditChartView = Ember.TextField.extend({
  didInsertElement: function () {
    this.$().focus();
  }
});
Ember.Handlebars.helper('edit-chart', Steps.EditChartView);


