
// CHARTAGE
Steps.Chart = DS.Model.extend({
  title: DS.attr('string')
});
Steps.Node = DS.Model.extend({
  title: DS.attr('string')
});
Steps.Action = DS.Model.extend({
  title: DS.attr('string')
});
Steps.Tool = DS.Model.extend({
  title: DS.attr('string')
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
  { id: 1, title: 'Chart One'   },
  { id: 2, title: 'Chart Two'   },
  { id: 3, title: 'Chart Three' }
];
Steps.Node.FIXTURES = [
  { id: 1, title: 'Node One'   },
  { id: 2, title: 'Node Two'   },
  { id: 3, title: 'Node Three' },
  { id: 4, title: 'Node Four'  },
  { id: 5, title: 'Node Five'  },
  { id: 6, title: 'Node Six'   },
  { id: 7, title: 'Node Seven' },
  { id: 8, title: 'Node Eight' },
  { id: 9, title: 'Node Nine'  }
];
Steps.Action.FIXTURES = [
  { id: 1, title: 'Action One'   },
  { id: 2, title: 'Action Two'   }
];
