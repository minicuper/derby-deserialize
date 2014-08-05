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
    expect(getView('tmp', html).deserialize()).equal(html);
  });

  it('<div><input/></div>', function() {
    var html = '<div><input/></div>';
    var view = getView('tmp', html);
//    console.log('serialization: ', view.template.serialize());
    expect(view.deserialize()).equal(html);
  });

  it('{{test}}', function() {
    var html = '{{test}}';
    var view = getView('tmp', html);
//    console.log('serialization: ', view.template.serialize());
    expect(view.deserialize()).equal(html);
  });
});

describe('Attributes', function() {


  it('input class="test"', function() {
    var html = '<input class="test"/>';
    expect(getView('tmp', html).deserialize()).equal(html);
  });

  it('input as="test"', function() {
    var html = '<input as="test"/>';
    var view = getView('tmp', html);
//    console.log('serialization: ', view.template.serialize());
    expect(view.deserialize()).equal(html);
  });

  it('input on-click="hello()"', function() {
    var html = '<input on-click="hello()"/>';
    var view = getView('tmp', html);
//    console.log('serialization: ', view.template.serialize());
    expect(view.deserialize()).equal(html);
  });

  it('input on-click="hello(a,b,c)"', function() {
    var html = '<input on-click="hello(a,b,c)"/>';
    var view = getView('tmp', html);
//    console.log('serialization: ', view.template.serialize());
    expect(view.deserialize()).equal(html);
  });

  it('input class="{{test}}"', function() {
    var html = '<input class="{{test}}"/>';
    var view = getView('tmp', html);
//    console.log('serialization: ', view.template.serialize());
    expect(view.deserialize()).equal(html);
  });

  it('input class="hello{{test}}"', function() {
    var html = '<input class="hello{{test}}"/>';
    var view = getView('tmp', html);
//    console.log('serialization: ', view.template.serialize());
    expect(view.deserialize()).equal(html);
  });

});

describe('Expressions', function() {


  it('{{a+b*10000}}', function() {
    var html = '{{a+b*10000}}';
    var view = getView('tmp', html);
//    console.log('serialization: ', view.template.serialize());
    expect(view.deserialize()).equal(html);
  });

  it('{{if a+b*10000}}{{/}}', function() {
    var html = '{{if a+b*10000}}{{/}}';
    var view = getView('tmp', html);
//    console.log('serialization: ', view.template.serialize());
    expect(view.deserialize()).equal(html);
  });

  it('<input class="{{a+b*10000}}"/>', function() {
    var html = '<input class="{{a+b*10000}}"/>';
    var view = getView('tmp', html);
//    console.log('serialization: ', view.template.serialize());
    expect(view.deserialize()).equal(html);
  });

  it('{{a.b}}', function() {
    var html = '{{a.b}}';
    var view = getView('tmp', html);
//    console.log('serialization: ', view.template.serialize());
    expect(view.deserialize()).equal(html);
  });

  it('{{a.b[c]}}', function() {
    var html = '{{a.b[c]}}';
    var view = getView('tmp', html);
//    console.log('serialization: ', view.template.serialize());
    expect(view.deserialize()).equal(html);
  });

  it('{{@content}}', function() {
    var html = '{{@content}}';
    var view = getView('tmp', html);
//    console.log('serialization: ', view.template.serialize());
    expect(view.deserialize()).equal(html);
  });

});

describe('bound/unbound', function() {


  it('{{bound a}}', function() {
    var html = '{{bound a}}';
    var view = getView('tmp', html);
//    console.log('serialization: ', view.template.serialize());
    expect(view.deserialize()).equal(html);
  });

  it('{{unbound a}}', function() {
    var html = '{{unbound a}}';
    var view = getView('tmp', html);
//    console.log('serialization: ', view.template.serialize());
    expect(view.deserialize()).equal(html);
  });

  it('{{unbound}}<br/>{{/}}', function() {
    var html = '{{unbound}}<br/>{{/}}';
    var view = getView('tmp', html);
//    console.log('serialization: ', view.template.serialize());
    expect(view.deserialize()).equal(html);
  });

  it('{{bound}}<br/>{{/}}', function() {
    var html = '{{bound}}<br/>{{/}}';
    var view = getView('tmp', html);
//    console.log('serialization: ', view.template.serialize());
    expect(view.deserialize()).equal(html);
  });

});

describe('if else (unless)', function() {


  it('{{if a}}{{/}}', function() {
    var html = '{{if a}}{{/}}';
    var view = getView('tmp', html);
//    console.log('serialization: ', view.template.serialize());
    expect(view.deserialize()).equal(html);
  });

  it('{{if a}}<input/>{{/}}', function() {
    var html = '{{if a}}<input/>{{/}}';
    var view = getView('tmp', html);
//    console.log('serialization: ', view.template.serialize());
    expect(view.deserialize()).equal(html);
  });

  it('{{if a}}<input/>{{else}}hello{{/}}', function() {
    var html = '{{if a}}<input/>{{else}}hello{{/}}';
    var view = getView('tmp', html);
//    console.log('serialization: ', view.template.serialize());
    expect(view.deserialize()).equal(html);
  });

  it('{{if a}}<input/><br/>{{else}}hello{{/}}', function() {
    var html = '{{if a}}<input/><br/>{{else}}hello{{/}}';
    var view = getView('tmp', html);
//    console.log('serialization: ', view.template.serialize());
    expect(view.deserialize()).equal(html);
  });

  it('{{if a}}<br/>{{else if b}}hello{{/}}', function() {
    var html = '{{if a}}<br/>{{else if b}}hello{{/}}';
    var view = getView('tmp', html);
//    console.log('serialization: ', view.template.serialize());
    expect(view.deserialize()).equal(html);
  });

  it('{{unless a}}<br/>{{else if b}}hello{{/}}', function() {
    var html = '{{unless a}}<br/>{{else if b}}hello{{/}}';
    var view = getView('tmp', html);
//    console.log('serialization: ', view.template.serialize());
    expect(view.deserialize()).equal(html);
  });

});

describe('on / with', function() {


  it('{{with a}}<br/>{{/}}', function() {
    var html = '{{with a}}<br/>{{/}}';
    var view = getView('tmp', html);
//    console.log('serialization: ', view.template.serialize());
    expect(view.deserialize()).equal(html);
  });

  it('{{with a as #b}}<br/>{{/}}', function() {
    var html = '{{with a as #b}}<br/>{{/}}';
    var view = getView('tmp', html);
//    console.log('serialization: ', view.template.serialize());
    expect(view.deserialize()).equal(html);
  });


  it('{{on a}}<br/>{{/}}', function() {
    var html = '{{on a}}<br/>{{/}}';
    var view = getView('tmp', html);
//    console.log('serialization: ', view.template.serialize());
    expect(view.deserialize()).equal(html);
  });


});

describe('each', function() {


  it('{{each abs}}<br/>{{/}}', function() {
    var html = '{{each abs}}<br/>{{/}}';
    var view = getView('tmp', html);
//    console.log('serialization: ', view.template.serialize());
    expect(view.deserialize()).equal(html);
  });

  it('{{each abs as #a}}<br/>{{/}}', function() {
    var html = '{{each abs as #a}}<br/>{{/}}';
    var view = getView('tmp', html);
//    console.log('serialization: ', view.template.serialize());
    expect(view.deserialize()).equal(html);
  });

  it('{{each abs as #a}}<br/>{{else}}<input/>{{/}}', function() {
    var html = '{{each abs as #a}}<br/>{{else}}<input/>{{/}}';
    var view = getView('tmp', html);
//    console.log('serialization: ', view.template.serialize());
    expect(view.deserialize()).equal(html);
  });

});


describe('view', function() {


  it('<view name="tmp"></view>', function() {
    var html = '<view name="tmp"></view>';
    var view = getView('tmp', html);
//    console.log('serialization: ', view.template.serialize());
    expect(view.deserialize()).equal(html);
  });

  it('<view name="{{tmp}}"></view>', function() {
    var html = '<view name="{{tmp}}"></view>';
    var view = getView('tmp', html);
//    console.log('serialization: ', view.template.serialize());
    expect(view.deserialize()).equal(html);
  });

  it('<view name="tmp"><br/></view>', function() {
    var html = '<view name="tmp"><br/></view>';
    var view = getView('tmp', html);
//    console.log('serialization: ', view.template.serialize());
    expect(view.deserialize()).equal(html);
  });

  it('<view name="{{tmp}}"><br/></view>', function() {
    var html = '<view name="{{tmp}}"><br/></view>';
    var view = getView('tmp', html);
//    console.log('serialization: ', view.template.serialize());
    expect(view.deserialize()).equal(html);
  });

  it('<view name="tmp"><br/><input/></view>', function() {
    var html = '<view name="tmp"><br/><input/></view>';
    var view = getView('tmp', html);
//    console.log('serialization: ', view.template.serialize());
    expect(view.deserialize()).equal(html);
  });

  it('<view name="{{tmp}}"><br/><input/></view>', function() {
    var html = '<view name="{{tmp}}"><br/><input/></view>';
    var view = getView('tmp', html);
//    console.log('serialization: ', view.template.serialize());
    expect(view.deserialize()).equal(html);
  });


  it('<view name="tmp" class="hello"></view>', function() {
    var html = '<view name="tmp" class="hello"></view>';
    var view = getView('tmp', html);
//    console.log('serialization: ', view.template.serialize());
    expect(view.deserialize()).equal(html);
  });

  it('<view name="{{tmp}}" class="hello"></view>', function() {
    var html = '<view name="{{tmp}}" class="hello"></view>';
    var view = getView('tmp', html);
//    console.log('serialization: ', view.template.serialize());
    expect(view.deserialize()).equal(html);
  });


  it('<view name="tmp" as="hello"></view>', function() {
    var html = '<view name="tmp" as="hello"></view>';
    var view = getView('tmp', html);
//    console.log('serialization: ', view.template.serialize());
    expect(view.deserialize()).equal(html);
  });

  it('<view name="{{tmp}}" as="hello"></view>', function() {
    var html = '<view name="{{tmp}}" as="hello"></view>';
    var view = getView('tmp', html);
//    console.log('serialization: ', view.template.serialize());
    expect(view.deserialize()).equal(html);
  });


  it('<view name="tmp" on-lick="hello()"></view>', function() {
    var html = '<view name="tmp" on-click="hello()"></view>';
    var view = getView('tmp', html);
//    console.log('serialization: ', view.template.serialize());
    expect(view.deserialize()).equal(html);
  });

  it('<view name="{{tmp}}" on-lick="hello()"></view>', function() {
    var html = '<view name="{{tmp}}" on-click="hello()"></view>';
    var view = getView('tmp', html);
//    console.log('serialization: ', view.template.serialize());
    expect(view.deserialize()).equal(html);
  });


  it('Attributes - label: <view name="tmp"><label></label></view>', function() {
    var html = '<view name="tmp"><label></label></view>';
    var view = getView('tmp', html, {'attributes': 'label'});
//    console.log('serialization: ', view.template.serialize());
    expect(view.deserialize()).equal(html);
  });

  it('Attributes - label: <view name="tmp"><label><br/></label></view>', function() {
    var html = '<view name="tmp"><label><br/></label></view>';
    var view = getView('tmp', html, {'attributes': 'label'});
//    console.log('serialization: ', view.template.serialize());
    expect(view.deserialize()).equal(html);
  });

  it('No Attributes - label: <view name="tmp"><label></label></view>', function() {
    var html = '<view name="tmp"><label></label></view>';
    var view = getView('tmp', html);
//    console.log('serialization: ', view.template.serialize());
    expect(view.deserialize()).equal(html);
  });

//  it('Attributes - label: <view name="dropdown"><label class="mother"></label></view>', function() {
//    var html = '<view name="dropdown"><label class="mother"></label></view>';
//    var views= new templates.Views();
//    view = views.register('dropdown', '{{@label.class}}', {'attributes': 'label'}
//    );
//    view.parse();
//
//    view = views.register('tmp', html);
//    view.parse();
//
//    var ser = view.serialize();
//    var des = view.template.deserialize();
//
//    console.log('serialization: ', ser);
//
//    expect(des).equal(html);
//
//  });

  it('Arrays - option: <view name="dropdown"><option><br/><input/></option></view>', function() {
    var html = '<view name="dropdown"><option><br/><input/></option></view>';
    var views= new templates.Views();
    view = views.register('dropdown', '{{@label.class}}', {'arrays': 'option/options'});
    view.parse();

    view = views.register('tmp', html);
    view.parse();


    var ser = view.serialize();
//    console.log('serialization: ', ser);
    var des = view.deserialize();
    expect(des).equal(html);

  });

  it('Arrays - option: <view name="dropdown"><option class="hello"><br/></option></view>', function() {
    var html = '<view name="dropdown"><option class="hello"><br/></option></view>';
    var views= new templates.Views();
    view = views.register('dropdown', '{{@label.class}}', {'arrays': 'option/options'});
    view.parse();

    view = views.register('tmp', html);
    view.parse();


    var ser = view.template.serialize();
//    console.log('serialization: ', ser);
    var des = view.deserialize();
    expect(des).equal(html);

  });

  it('Arrays - option: <view name="dropdown"><option><br/></option><option><input/></option></view>', function() {
    var html = '<view name="dropdown"><option><br/></option><option><input/></option></view>';
    var views= new templates.Views();
    view = views.register('dropdown', '{{@label.class}}', {'arrays': 'option/options'});
    view.parse();

    view = views.register('tmp', html);
    view.parse();
    var ser = view.template.serialize();
//    console.log('serialization: ', ser);
    var des = view.deserialize();
    expect(des).equal(html);
  });

  it('Arrays - option: <view name="dropdown"><option><br/></option><input/></view>', function() {
    var html = '<view name="dropdown"><option><br/></option><input/></view>';
    var views= new templates.Views();
    view = views.register('dropdown', '{{@label.class}}', {'arrays': 'option/options'});
    view.parse();

    view = views.register('tmp', html);
    view.parse();
    var ser = view.template.serialize();
//    console.log('serialization: ', ser);
    var des = view.deserialize();
    expect(des).equal(html);
  });

//  {'attributes': 'label tip option-content', 'arrays': 'option/options', 'element': 'l-dropdown'}

});

describe('small things', function() {
  it('{{unescaped _.parse}}', function() {
    var html = '{{unescaped _.parse}}';
    var view = getView('tmp', html);
//    console.log('serialization: ', view.template.serialize());
    expect(view.deserialize()).equal(html);
  });

  it('<input class="{{unescaped _.parse}}"/>', function() {
    var html = '<input class="{{unescaped _.parse}}"/>';
    var view = getView('tmp', html);
//    console.log('serialization: ', view.template.serialize());
    expect(view.deserialize()).equal(html);
  });

  it('<!doctype html>', function() {
    var html = '<!doctype html>';
    var view = getView('tmp', html);
//    console.log('serialization: ', view.template.serialize());
    expect(view.deserialize()).equal(html);
  });

  it('<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">', function() {
    var html = '<!doctype HTML public "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">';
    var view = getView('tmp', html);
//    console.log('serialization: ', view.template.serialize());
    expect(view.deserialize()).equal(html);
  });


})

describe('arbitrary', function() {


  it.only('infinite scroll', function() {
    var views= new templates.Views();
    view = views.register('tmp');
    view.template =   views.register('select-date-timezone:index').template = new templates.Template([new templates.Comment('select-date-timezone:index', [new templates.ComponentMarker()]), new templates.Element('div', {'class': new templates.DynamicAttribute(new templates.Template([new templates.Text('select-date-timezone '), new templates.ConditionalBlock([new expressions.PathExpression(['conflicts', 'text'], new expressions.ExpressionMeta('if conflicts.text', 'if'))], [
      [new templates.Text('conflict')]
    ])]))}, [new templates.Element('div', {'class': new templates.Attribute('select-date dark-input')}, [new templates.ViewInstance('icon-calendar', {}), new templates.Element('span', {'class': new templates.Attribute('dates')}, [new templates.DynamicText(new expressions.FnExpression(['formatTime'], [new expressions.PathExpression(['date']), new expressions.PathExpression(['timezone']), new expressions.LiteralExpression('compactDateOrToday')], void 0, new expressions.ExpressionMeta('formatTime(date, timezone, \'compactDateOrToday\')')))], void 0, false), new templates.Element('span', {'class': new templates.Attribute('selected-timezone')}, [new templates.DynamicText(new expressions.FnExpression(['displayTimezoneCompact'], [new expressions.PathExpression(['timezone'])], void 0, new expressions.ExpressionMeta('displayTimezoneCompact(timezone)')))], void 0, false)], [new templates.ElementOn('click', new expressions.FnExpression(['calendarPopup', 'toggle'], [new expressions.PathExpression(['$element'])]))], false), new templates.Element('div', {'class': new templates.DynamicAttribute(new templates.Template([new templates.Text('select-timezone '), new templates.ConditionalBlock([new expressions.PathExpression(['timezone'], new expressions.ExpressionMeta('if timezone', 'if'))], [
      [new templates.Text('selected')]
    ]), new templates.Text(' has-tip')])), 'title': new templates.Attribute('Select timezone')}, [new templates.ViewInstance('icon-globe', {})], [new templates.ElementOn('click', new expressions.FnExpression(['timezonePopup', 'toggle'], [new expressions.PathExpression(['$element']), new expressions.LiteralExpression('right'), new expressions.LiteralExpression(5)]))], false), new templates.Element('div', {'class': new templates.Attribute('select-date-conflict')}, [new templates.ConditionalBlock([new expressions.PathExpression(['conflicts', 'text'], new expressions.ExpressionMeta('if conflicts.text', 'if'))], [
      [new templates.DynamicText(new expressions.PathExpression(['conflicts', 'text'], new expressions.ExpressionMeta('conflicts.text'))), new templates.Text(' not in this timezone.'), new templates.ConditionalBlock([new expressions.PathExpression(['conflicts', 'timezone'], new expressions.ExpressionMeta('if conflicts.timezone', 'if')), new expressions.Expression(new expressions.ExpressionMeta('else', 'else'))], [
        [new templates.Element('a', {'class': new templates.Attribute('link dark'), 'href': new templates.Attribute('#')}, [new templates.Text('Change to '), new templates.DynamicText(new expressions.FnExpression(['displayTimezoneCompact'],
          [
            new expressions.RelativePathExpression([])], void 0, new expressions.ExpressionMeta('displayTimezoneCompact(this)')))], [new templates.ElementOn('click', new expressions.FnExpression(['setTimezone'], [
          new expressions.RelativePathExpression([])])), new templates.ElementOn('click', new expressions.FnExpression(['$preventDefault'], [new expressions.PathExpression(['$event'])]))], false)],
        [new templates.Text(' Change to'), new templates.EachBlock(new expressions.PathExpression(['conflicts', 'timezones'], new expressions.ExpressionMeta('each conflicts.timezones', 'each')), [new templates.Element('a', {'href': new templates.Attribute('#')}, [new templates.DynamicText(new expressions.FnExpression(['displayTimezoneCompact'], [
          new expressions.RelativePathExpression([])], void 0, new expressions.ExpressionMeta('displayTimezoneCompact(this)')))], [new templates.ElementOn('click', new expressions.FnExpression(['setTimezone'], [
          new expressions.RelativePathExpression([])])), new templates.ElementOn('click', new expressions.FnExpression(['$preventDefault'], [new expressions.PathExpression(['$event'])]))], false)])]
      ])]
    ])], void 0, false), new templates.ViewInstance('l-popup', {'class': 'darker', 'content': new templates.ParentWrapper(new templates.Template([new templates.ViewInstance('l-calendar', {'class': 'dark-calendar', 'value': new templates.ParentWrapper(new templates.DynamicText(new expressions.PathExpression(['date'], new expressions.ExpressionMeta('date'))), new expressions.PathExpression(['date'], new expressions.ExpressionMeta('date'))), 'timezone': new templates.ParentWrapper(new templates.DynamicText(new expressions.PathExpression(['timezone'], new expressions.ExpressionMeta('timezone'))), new expressions.PathExpression(['timezone'], new expressions.ExpressionMeta('timezone')))}, [new templates.ComponentOn('select', new expressions.FnExpression(['selectDate'], []))])]))}, [new templates.MarkupAs(['calendarPopup'])]), new templates.ViewInstance('l-popup', {'class': 'darker', 'focus': 'input', 'content': new templates.ParentWrapper(new templates.Template([new templates.ViewInstance('l-picker', {'type': 'input', 'options': new templates.ParentWrapper(new templates.DynamicText(new expressions.PathExpression(['timezoneOptions'], new expressions.ExpressionMeta('timezoneOptions'))), new expressions.PathExpression(['timezoneOptions'], new expressions.ExpressionMeta('timezoneOptions')))}, [new templates.ComponentOn('select', new expressions.FnExpression(['selectTimezone'], []))])]))}, [new templates.MarkupAs(['timezonePopup'])])], void 0, false)]);

    console.log('inf:', view.deserialize());
  });



});



function getView(name, source, options){
  var views= new templates.Views();
  view = views.register(name, source, options);
  view.parse();

  return view;
}


