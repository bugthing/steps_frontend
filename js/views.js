
Steps.ChartNodeView = Ember.View.extend({
  templateName: 'chart_node',
  classNameBindings: ['chartNodeClass'],
  chartNodeClass: function() {
    return 'chart-node btn chart-node-' + this.get('content.id');
  }.property()
  , didInsertElement: function() {

    // TODO: get id to be dynamic (content.id)
    //, elementIdBinding: 'content.id'
    // .. is works for now..
    this.$().attr('id', this.get('content.id'));

    // TODO: make chart link up better than this!
    //  Add to parentView list of edge objects..
    var edgeList = this.get('parentView.renderedNodes');
    edgeList.push(Steps.Edge.create({ nodeId: this.get('content.id') }));
    // .. run through list of all edges, redrawing..
    var prevId;
    for (var i = 0; i < edgeList.length; i++) {
      var edge = edgeList[i];
      thisId = edge.nodeId;
      if ( $('#' + prevId).length > 0 && $('#' + thisId).length > 0) {
        var e0 = jsPlumb.addEndpoint(prevId),
            e1 = jsPlumb.addEndpoint(thisId);
        jsPlumb.connect({ source:e0, target:e1 });
      }
      prevId = thisId;
    };
  }
});

Steps.ChartNodesView = Ember.CollectionView.extend({
  classNames: ['chart-nodes'],
  itemViewClass: Steps.ChartNodeView.extend(),
  renderedNodes: []
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
      view.controller.send('closeModal')
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
