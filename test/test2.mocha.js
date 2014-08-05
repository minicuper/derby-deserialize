var expect = require('expect.js');
var des = require('../index.js');
var serializedViews = require('./_views.js');

var derbyTemplates = require('derby-templates');
require('derby-parsing')
var expressions = derbyTemplates.expressions;
var templates = derbyTemplates.templates;

var beautify = require('js-beautify').html;


describe('Views', function() {

  it('input', function () {
    var views = des.loadViews(serializedViews);

    Object.keys(views.nameMap).forEach(function(viewName){
      var view = views.find(viewName);


      console.log(view.name);
      console.log();
      var html = view.deserialize();

      console.log(beautify(html, {indent_size: 2}));

      console.log('------------------------------------------------------------------------------');
    });

  });

});