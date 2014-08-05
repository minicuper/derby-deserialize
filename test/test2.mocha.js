var expect = require('expect.js');
var des = require('../index.js');
var serializedViews = require('./_views.js');

var derbyTemplates = require('derby-templates');
require('derby-parsing')
var expressions = derbyTemplates.expressions;
var templates = derbyTemplates.templates;


describe('Views', function() {

  it('input', function () {
    var views = des.loadViews(serializedViews);

    Object.keys(views.nameMap).forEach(function(viewName){
      var view = views.find(viewName);


      console.log(view.name);
      var html = view.deserialize();

      console.log('html:', html);
    });

  });

});