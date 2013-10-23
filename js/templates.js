//
// Ajax's templates from seprate URLs
// Precompiles using HandleBars
// Stores in EmberJS template cache
//

MadeOfpaper = {
  require_template: function(templateName) {
    var templateUrl = './js/templates/' + templateName + '.handlebars';
    console.log('template loading:' + templateName); 
    $.ajax({
      url: templateUrl,
      cache: false,
      async: false,
      dataType: 'html',
      success: function (source) {
        var input = Ember.Handlebars.precompile(source);
        //alert('template loaded:' + templateName); 
        Ember.TEMPLATES[templateName] = Ember.Handlebars.template(input);
      },
      error: function(jqXHR, textStatus, errorThrown) { 
        console.log('template load fail:' + templateUrl); 
        console.log('                  :' + errorThrown); 
      },
    });
  },
  load_templates: function() {
    this.require_template('index');
    this.require_template('about');
    this.require_template('charts/index');
    this.require_template('charts/new');
    this.require_template('chart');
    this.require_template('nodes/index');
    this.require_template('nodes/new');
    this.require_template('node');
    this.require_template('actions/index');
    this.require_template('action');
  }
};
MadeOfpaper.load_templates();
