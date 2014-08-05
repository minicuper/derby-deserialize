var expect = require('expect.js');
var des = require('../index.js');
var serializedViews = require('./_views.js');

var derbyTemplates = require('derby-templates');
require('derby-parsing')
var expressions = derbyTemplates.expressions;
var templates = derbyTemplates.templates;

//    var views = des.loadViews(serializedViews);

describe('Tags', function() {

  it('input', function() {
    var html = '<input/>';
    expect(getTemplate('tmp', html).deserialize()).equal(html);
  });

  it('<div><input/></div>', function() {
    var html = '<div><input/></div>';
    var template = getTemplate('tmp', html);
//    console.log('serialization: ', template.serialize());
    expect(template.deserialize()).equal(html);
  });

  it('{{test}}', function() {
    var html = '{{test}}';
    var template = getTemplate('tmp', html);
//    console.log('serialization: ', template.serialize());
    expect(template.deserialize()).equal(html);
  });
});

describe('Attributes', function() {


  it('input class="test"', function() {
    var html = '<input class="test"/>';
    expect(getTemplate('tmp', html).deserialize()).equal(html);
  });

  it('input as="test"', function() {
    var html = '<input as="test"/>';
    var template = getTemplate('tmp', html);
//    console.log('serialization: ', template.serialize());
    expect(template.deserialize()).equal(html);
  });

  it('input on-click="hello()"', function() {
    var html = '<input on-click="hello()"/>';
    var template = getTemplate('tmp', html);
//    console.log('serialization: ', template.serialize());
    expect(template.deserialize()).equal(html);
  });

  it('input on-click="hello(a,b,c)"', function() {
    var html = '<input on-click="hello(a,b,c)"/>';
    var template = getTemplate('tmp', html);
//    console.log('serialization: ', template.serialize());
    expect(template.deserialize()).equal(html);
  });

  it('input class="{{test}}"', function() {
    var html = '<input class="{{test}}"/>';
    var template = getTemplate('tmp', html);
//    console.log('serialization: ', template.serialize());
    expect(template.deserialize()).equal(html);
  });

});

describe('Expressions', function() {


  it('{{a+b*10000}}', function() {
    var html = '{{a+b*10000}}';
    var template = getTemplate('tmp', html);
//    console.log('serialization: ', template.serialize());
    expect(template.deserialize()).equal(html);
  });

  it('{{if a+b*10000}}{{/}}', function() {
    var html = '{{if a+b*10000}}{{/}}';
    var template = getTemplate('tmp', html);
//    console.log('serialization: ', template.serialize());
    expect(template.deserialize()).equal(html);
  });

  it('<input class="{{a+b*10000}}"/>', function() {
    var html = '<input class="{{a+b*10000}}"/>';
    var template = getTemplate('tmp', html);
//    console.log('serialization: ', template.serialize());
    expect(template.deserialize()).equal(html);
  });

  it('{{a.b}}', function() {
    var html = '{{a.b}}';
    var template = getTemplate('tmp', html);
//    console.log('serialization: ', template.serialize());
    expect(template.deserialize()).equal(html);
  });

  it('{{a.b[c]}}', function() {
    var html = '{{a.b[c]}}';
    var template = getTemplate('tmp', html);
//    console.log('serialization: ', template.serialize());
    expect(template.deserialize()).equal(html);
  });

  it('{{@content}}', function() {
    var html = '{{@content}}';
    var template = getTemplate('tmp', html);
//    console.log('serialization: ', template.serialize());
    expect(template.deserialize()).equal(html);
  });

});

describe('bound/unbound', function() {


  it('{{bound a}}', function() {
    var html = '{{bound a}}';
    var template = getTemplate('tmp', html);
//    console.log('serialization: ', template.serialize());
    expect(template.deserialize()).equal(html);
  });

  it('{{unbound a}}', function() {
    var html = '{{unbound a}}';
    var template = getTemplate('tmp', html);
//    console.log('serialization: ', template.serialize());
    expect(template.deserialize()).equal(html);
  });

  it('{{unbound}}<br/>{{/}}', function() {
    var html = '{{unbound}}<br/>{{/}}';
    var template = getTemplate('tmp', html);
//    console.log('serialization: ', template.serialize());
    expect(template.deserialize()).equal(html);
  });

  it('{{bound}}<br/>{{/}}', function() {
    var html = '{{bound}}<br/>{{/}}';
    var template = getTemplate('tmp', html);
//    console.log('serialization: ', template.serialize());
    expect(template.deserialize()).equal(html);
  });

});

describe('if else (unless)', function() {


  it('{{if a}}{{/}}', function() {
    var html = '{{if a}}{{/}}';
    var template = getTemplate('tmp', html);
//    console.log('serialization: ', template.serialize());
    expect(template.deserialize()).equal(html);
  });

  it('{{if a}}<input/>{{/}}', function() {
    var html = '{{if a}}<input/>{{/}}';
    var template = getTemplate('tmp', html);
//    console.log('serialization: ', template.serialize());
    expect(template.deserialize()).equal(html);
  });

  it('{{if a}}<input/>{{else}}hello{{/}}', function() {
    var html = '{{if a}}<input/>{{else}}hello{{/}}';
    var template = getTemplate('tmp', html);
//    console.log('serialization: ', template.serialize());
    expect(template.deserialize()).equal(html);
  });

  it('{{if a}}<input/><br/>{{else}}hello{{/}}', function() {
    var html = '{{if a}}<input/><br/>{{else}}hello{{/}}';
    var template = getTemplate('tmp', html);
//    console.log('serialization: ', template.serialize());
    expect(template.deserialize()).equal(html);
  });

  it('{{if a}}<br/>{{else if b}}hello{{/}}', function() {
    var html = '{{if a}}<br/>{{else if b}}hello{{/}}';
    var template = getTemplate('tmp', html);
//    console.log('serialization: ', template.serialize());
    expect(template.deserialize()).equal(html);
  });

  it('{{unless a}}<br/>{{else if b}}hello{{/}}', function() {
    var html = '{{unless a}}<br/>{{else if b}}hello{{/}}';
    var template = getTemplate('tmp', html);
//    console.log('serialization: ', template.serialize());
    expect(template.deserialize()).equal(html);
  });

});

describe('on / with', function() {


  it('{{with a}}<br/>{{/}}', function() {
    var html = '{{with a}}<br/>{{/}}';
    var template = getTemplate('tmp', html);
//    console.log('serialization: ', template.serialize());
    expect(template.deserialize()).equal(html);
  });

  it('{{with a as #b}}<br/>{{/}}', function() {
    var html = '{{with a as #b}}<br/>{{/}}';
    var template = getTemplate('tmp', html);
//    console.log('serialization: ', template.serialize());
    expect(template.deserialize()).equal(html);
  });


  it('{{on a}}<br/>{{/}}', function() {
    var html = '{{on a}}<br/>{{/}}';
    var template = getTemplate('tmp', html);
//    console.log('serialization: ', template.serialize());
    expect(template.deserialize()).equal(html);
  });


});

describe('each', function() {


  it('{{each abs}}<br/>{{/}}', function() {
    var html = '{{each abs}}<br/>{{/}}';
    var template = getTemplate('tmp', html);
//    console.log('serialization: ', template.serialize());
    expect(template.deserialize()).equal(html);
  });

  it('{{each abs as #a}}<br/>{{/}}', function() {
    var html = '{{each abs as #a}}<br/>{{/}}';
    var template = getTemplate('tmp', html);
//    console.log('serialization: ', template.serialize());
    expect(template.deserialize()).equal(html);
  });

  it('{{each abs as #a}}<br/>{{else}}<input/>{{/}}', function() {
    var html = '{{each abs as #a}}<br/>{{else}}<input/>{{/}}';
    var template = getTemplate('tmp', html);
//    console.log('serialization: ', template.serialize());
    expect(template.deserialize()).equal(html);
  });

});


describe('view', function() {


  it('<view name="tmp"></view>', function() {
    var html = '<view name="tmp"></view>';
    var template = getTemplate('tmp', html);
//    console.log('serialization: ', template.serialize());
    expect(template.deserialize()).equal(html);
  });


  it('<view name="tmp"><br/></view>', function() {
    var html = '<view name="tmp"><br/></view>';
    var template = getTemplate('tmp', html);
//    console.log('serialization: ', template.serialize());
    expect(template.deserialize()).equal(html);
  });

  it('<view name="tmp"><br/><input/></view>', function() {
    var html = '<view name="tmp"><br/><input/></view>';
    var template = getTemplate('tmp', html);
//    console.log('serialization: ', template.serialize());
    expect(template.deserialize()).equal(html);
  });

  it('<view name="tmp" class="hello"></view>', function() {
    var html = '<view name="tmp" class="hello"></view>';
    var template = getTemplate('tmp', html);
//    console.log('serialization: ', template.serialize());
    expect(template.deserialize()).equal(html);
  });

  it('<view name="tmp" as="hello"></view>', function() {
    var html = '<view name="tmp" as="hello"></view>';
    var template = getTemplate('tmp', html);
//    console.log('serialization: ', template.serialize());
    expect(template.deserialize()).equal(html);
  });

  it('<view name="tmp" on-lick="hello()"></view>', function() {
    var html = '<view name="tmp" on-click="hello()"></view>';
    var template = getTemplate('tmp', html);
//    console.log('serialization: ', template.serialize());
    expect(template.deserialize()).equal(html);
  });

  it('Attributes - label: <view name="tmp"><label></label></view>', function() {
    var html = '<view name="tmp"><label></label></view>';
    var template = getTemplate('tmp', html, {'attributes': 'label'});
    console.log('serialization: ', template.serialize());
    expect(template.deserialize()).equal(html);
  });

  it('Attributes - label: <view name="tmp"><label><br/></label></view>', function() {
    var html = '<view name="tmp"><label><br/></label></view>';
    var template = getTemplate('tmp', html, {'attributes': 'label'});
//    console.log('serialization: ', template.serialize());
    expect(template.deserialize()).equal(html);
  });

  it('No Attributes - label: <view name="tmp"><label></label></view>', function() {
    var html = '<view name="tmp"><label></label></view>';
    var template = getTemplate('tmp', html);
//    console.log('serialization: ', template.serialize());
    expect(template.deserialize()).equal(html);
  });

//  it('Attributes - label: <view name="tmp"><label class="hello"></label></view>', function() {
//    var html = '<view name="tmp"><label class="hello"></label></view>';
//    var template = getTemplate('tmp', html, {'attributes': 'label'});
//    console.log('serialization: ', template.serialize());
//    expect(template.deserialize()).equal(html);
//  });


//  {'attributes': 'label tip option-content', 'arrays': 'option/options', 'element': 'l-dropdown'}

});

//describe('arbitrary', function() {
//
//
//  it('infinite scroll', function() {
//    var views= new templates.Views();
//    view = views.register('tmp');
//    view.template = new templates.Template([new templates.Comment('infinite-scroll:index', [new templates.ComponentMarker()]), new templates.Element('div', {'class': new templates.Attribute('infinite-scroll')}, [new templates.DynamicText(new expressions.AttributePathExpression('content', [], new expressions.ExpressionMeta('@content')))], [new templates.ElementOn('scroll', new expressions.FnExpression(['scroll'], [])), new templates.MarkupAs(['element'])], false)]);
//
//    console.log('inf:', view.template.deserialize());
//  });
//
//
//});



function getTemplate(name, source, options){
  var views= new templates.Views();
  view = views.register(name, source, options);
  view.parse();

  return view.template;
}


