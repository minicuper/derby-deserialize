var expect = require('expect.js');
var des = require('../index.js');
var serializedViews = require('./_views.js');

var derbyTemplates = require('derby-templates');


describe('Views', function() {

  it('registers and finds a view', function() {
    var views = des.loadViews(serializedViews);

    var view = views.find('l-card:fields:default4:edit');

    console.log('view: ', view.deserialize());
  });


});



