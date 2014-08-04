var derbyTemplates = require('derby-templates');
var expressions = derbyTemplates.expressions;
var templates = derbyTemplates.templates;

require('./lib/expressions')(expressions);
require('./lib/templates')(templates);

exports.loadViews = function(serializedViews){

  var views = new templates.Views();

  serializedViews(derbyTemplates, views);

  return views;
};

