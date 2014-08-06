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



      var result = '';

      result += '<'+view.name+':';

//      if (view.name == 'l-calendar:index') {
//        console.log('l-calendar', view.options);
//      }

      view.options = view.options || {};

      var element = view.options.element;
      var attributes = view.options.attributes;
      var arrays = view.options.arrays;

      if (element) {
        result += ' element="'+element+'"';
      }
      if (attributes) {
        result += ' attributes="'+attributes+'"';
      }
      if (arrays) {
        result += ' arrays="'+arrays+'"';
      }
      result += '>';

      console.log();
      console.log(result);

      console.log();

      var html = view.deserialize();

      console.log(beautify(html, {indent_size: 2, indent_level: 1}));

      console.log();
      console.log('<!------------------------------------------------------------------------------>');
    });

  });

});