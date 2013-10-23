
// CHARTAGE
Steps.Chart = DS.Model.extend({
  title: DS.attr('string'),
  nodes: DS.hasMany('node')
});
Steps.Node = DS.Model.extend({
  title: DS.attr('string'),
  chart: DS.belongsTo('chart'),
  actions: DS.hasMany('action')
});
Steps.Action = DS.Model.extend({
  title: DS.attr('string'),
  node: DS.belongsTo('node'),
  tool: DS.belongsTo('tool')
});
Steps.Tool = DS.Model.extend({
  title: DS.attr('string'),
  actions: DS.hasMany('action')
});


// TOOLS
Steps.ToolText = DS.Model.extend({
  title: DS.attr('string')
});
Steps.ToolInput = DS.Model.extend({
  title: DS.attr('string')
});
Steps.ToolNextButton = DS.Model.extend({
  title: DS.attr('string')
});


// FIXTUES
Steps.Chart.FIXTURES = [
  { id: "c1", title: 'Chart One'   },
  { id: "c2", title: 'Chart Two'   },
  { id: "c3", title: 'Chart Three' }
];
Steps.Node.FIXTURES = [
  { id: "n1", title: 'Node One'   , chart: 'c1' },
  { id: "n2", title: 'Node Two'   , chart: 'c1' },
  { id: "n3", title: 'Node Three' , chart: 'c1' },
  { id: "n4", title: 'Node Four'  , chart: 'c2' },
  { id: "n5", title: 'Node Five'  , chart: 'c2' },
  { id: "n6", title: 'Node Six'   , chart: 'c2' },
  { id: "n7", title: 'Node Seven' , chart: 'c3' },
  { id: "n8", title: 'Node Eight' , chart: 'c3' },
  { id: "n9", title: 'Node Nine'  , chart: 'c3' }
];
Steps.Action.FIXTURES = [
  { id: "a1", title: 'Action One' , node: 'n1' },
  { id: "a2", title: 'Action Two' , node: 'n1' }
];
