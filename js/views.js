
Steps.ChartView = Ember.View.extend({
  drawChart: function() {
    if ( this.get('controller.shouldRedraw') ) {
      this.joinNodes();
      this.set('controller.shouldRedraw', false)
    }
  }.observes('controller.shouldRedraw')
  , joinNodes: function() {
    console.log('view joinNodes');
    var nodes = this.get('controller.model.nodes');
    var prevId;
    nodes.forEach(function(node, index, enumerable) {
      var thisId = node.id;
      if ( $('#' + prevId).length > 0 && $('#' + thisId).length > 0) {
        console.log('joining:' +prevId + ' and ' + thisId);
        var e0 = jsPlumb.addEndpoint(prevId),
            e1 = jsPlumb.addEndpoint(thisId);
        jsPlumb.connect({ source:e0, target:e1 });
      }
      prevId = thisId;
    });
  }
});


Steps.ChartNodeView = Ember.View.extend({
  templateName: 'chart_node',
  classNameBindings: ['chartNodeClass'],
  chartNodeClass: function() {
    return 'chart-node btn chart-node-' + this.get('content.id');
  }.property()
  , didInsertElement: function() {
    // TODO: get id to be dynamic (content.id), using this maybe?!:
    //, elementIdBinding: 'content.id'
    // .. is works for now..
    this.$().attr('id', this.get('content.id'));
  }
});

Steps.ChartNodesView = Ember.CollectionView.extend({
  classNames: ['chart-nodes'],
  itemViewClass: Steps.ChartNodeView.extend(),
  renderedNodes: [] // used by 
})

Steps.ChartActionView = Ember.View.extend({
  templateName: 'chart_action',
  classNameBindings: ['chartActionClass'],
  chartActionClass: function() {
    return 'chart-action btn';
  }.property('action')
});

Steps.ChartActionsView = Ember.CollectionView.extend({
  classNames: ['chart-actions'],
  itemViewClass: Steps.ChartActionView.extend(),
  renderedActions: []
})

Steps.EditChartView = Ember.TextField.extend({
  didInsertElement: function () {
    this.$().focus();
  }
});
Ember.Handlebars.helper('edit-chart', Steps.EditChartView);

Steps.NothingView = Ember.View.extend({
  template: Ember.Handlebars.compile('')
});

// modal views..
Steps.ModalView = Ember.Mixin.create({
  layoutName: 'modal_layout',
  didInsertElement: function() {
    this.$('.modal').modal('show')
    view = this
    this.$('.modal').on("hidden.bs.modal", function(ev) {
      view.controller.send('closeModal') // important! - removes the rendered view.
      return
    });
  },
  actions: {
    closeModal: function() {
      this.$('.modal').modal('hide');
    }
  }
});

Steps.ChartNodeEditView = Ember.View.extend(Steps.ModalView, { });
Steps.NodeView = Ember.View.extend(Steps.ModalView, { });
Steps.ActionView = Ember.View.extend(Steps.ModalView, { });
