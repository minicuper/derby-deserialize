module.exports = function(templates){
  with (templates) {
    View.prototype.deserialize = function () {
      return this.template.deserialize(this);
    };

    Template.prototype.deserialize = function (view) {
      var content = this.content || [];

      return deserializeArray(content, view).join('');
    };


    Text.prototype.deserialize = function (view) {
      return this.data;
    };

    Attribute.prototype.deserialize = function (view) {
//      return serializeObject.instance(this, this.data, this.ns);
      return this.data;
    };

    ElementOn.prototype.deserialize = function (view) {
      return 'on-'+this.name+'="' + this.expression.deserialize(view)+ '"';
    };

    ComponentOn.prototype.deserialize = function (view) {
      return 'on-'+this.name+'="' + this.expression.deserialize(view)+ '"';
    };

    DynamicAttribute.prototype.deserialize = function (view) {
//      return serializeObject.instance(this, this.expression, this.ns);
//      console.log('this.ns', this.ns);

      if (this.expression.type == 'Template') {
        return this.expression.deserialize(view);
      }
      return '{{'+this.expression.deserialize(view)+'}}';
    };


    Element.prototype.deserialize = function (view) {
//      return serializeObject.instance(
//        this
//        , this.tagName
//        , this.attributes
//        , this.content
//        , this.hooks
//        , this.selfClosing
//        , this.notClosed
//        , this.ns
//      );
      var result = '';
      var tag = this.tagName;
      var attributes = deserializeObject(this.attributes, view);
      var content = deserializeArray(this.content, view);
      var hooks = deserializeArray(this.hooks, view);


      attributes = attributes.concat(hooks);

//      console.log('hooks', attributes, hooks);

      if (this.selfClosing || VOID_ELEMENTS[tag]) {
        result = '<'+ tag + sp(attributes) + '/>';
      } else {
        result += '<'+ tag + sp(attributes) + '>';
        result += content.join('\n')+ '';
        result += '</'+ tag +'>';
      }

      return result;
    };

    Block.prototype.deserialize = function (view) {
//      return serializeObject.instance(this, this.expression, this.content);
      return '{{'+this.expression.deserialize(view)+'}}' + deserializeArray(this.content, view).join('')+'{{/}}';
    };

    ConditionalBlock.prototype.deserialize = function (view) {
//      return serializeObject.instance(this, this.expressions, this.contents);
      var result = '';

      var expressions = this.expressions || [];
      var contents = this.contents || [];

      for(var i = 0; i< expressions.length; i++){
        result += '{{' + expressions[i].deserialize(view)+'}}';
        result +=  deserializeArray(contents[i], view).join('')
      }
      return result+'{{/}}';
    };

    EachBlock.prototype.deserialize = function (view) {
//      return serializeObject.instance(this, this.expression, this.content, this.elseContent);
      var elseContent = '';

      if (this.elseContent && Array.isArray(this.elseContent) && this.elseContent.length != 0) {
        elseContent = '{{else}}' + deserializeArray(this.elseContent, view).join('')
      }

      return '{{'+this.expression.deserialize(view)+'}}' + deserializeArray(this.content, view).join('')+ elseContent +'{{/}}';
    };

    DynamicText.prototype.deserialize = function (view) {
//      return serializeObject.instance(this, this.expression);
      return '{{'+this.expression.deserialize(view)+'}}';
    };

    MarkupAs.prototype.deserialize = function (view) {
      var segments = this.segments.concat(this.lastSegment);
//      return serializeObject.instance(this, segments);
      return 'as="'+ segments +'"';
    };


    ViewInstance.prototype.deserialize = function (view) {
      var self = this;
//      return serializeObject.instance(this, this.name, this.attributes, this.hooks);

      // TODO attributes, array/arrays
      var result = '';

      var attr = this.attributes || {};
      var name = this.name;

      if (typeof name !== 'string'){

        if (this.nameExpression.type == 'Template') {
          name = this.nameExpression.deserialize(view);
        } else {
          name = '{{' + this.nameExpression.deserialize(view) + '}}';
        }


      }

      var parents = {};

      for(var key in attr) {
        if (attr[key].type == 'ParentWrapper' || Array.isArray(attr[key])){
          parents[key] = attr[key];
          delete attr[key];
        }
      }

      var parentsStr = '';

      for(var key in parents) {
        if (key == 'content') {
          parentsStr += parents[key].deserialize(view)
        } else {
          if (Array.isArray(parents[key])){
            parents[key].forEach(function(item){
//              console.log('self', self);
              var arrName = getArrayName(view, self.name, key);
              var arrContent = '';

              if (item.content){
                arrContent = item.content.deserialize(view);
                delete item.content;
              }

              var arrAttr = deserializeObject(item, view);

              parentsStr += '<'+arrName+ sp(arrAttr)+ '>'+arrContent+'</'+arrName+'>';
            })
          }else {
            parentsStr += '<'+key+'>'+parents[key].deserialize(view)+'</'+key+'>';
          }

        }
      }

      var attributes = deserializeObject(attr, view);
      var hooks = deserializeArray(this.hooks, view);

      attributes = attributes.concat(hooks);

      result += '<view name="'+name+'"' + sp(attributes)+'>';
      result += parentsStr;
      result += '</view>';
      return result;
    };

    DynamicViewInstance.prototype.deserialize = ViewInstance.prototype.deserialize;

    ParentWrapper.prototype.deserialize = function (view) {
//      return serializeObject.instance(this, this.template, this.expression);
      return this.template.deserialize(view);
    };

    ComponentMarker.prototype.deserialize = function (view) {
//      return serializeObject.instance(this);
      return '';
    };

    Doctype.prototype.deserialize = function (view) {
//      return serializeObject.instance(this, this.name, this.publicId, this.systemId);

      if (this.systemId) {
        return '<!doctype '+this.name+' public "' + this.publicId + '" "'+ this.systemId +'">';
      }

      if (this.publicId) {
        return '<!doctype '+this.name+' public "' + this.publicId +'">';
      }

      return '<!doctype '+this.name+'>';
    };

    Comment.prototype.deserialize = function (view) {
//      return serializeObject.instance(this, this.data, this.hooks);
//      return '<!--' + this.data + sp(deserializeArray(this.hooks))+'-->';
      return '';
    };

    DynamicComment.prototype.deserialize = function (view) {
//      return serializeObject.instance(this, this.expression, this.hooks);
      return '';
    };

    Html.prototype.deserialize = function (view) {
//      return serializeObject.instance(this, this.data);
      return '';
    };

    DynamicHtml.prototype.deserialize = function (view) {
//      return serializeObject.instance(this, this.expression);
      return '{{'+this.expression.deserialize(view)+'}}';
    };
  }
}

function deserializeArray(arr, view){
  if (!view) throw new Error('There is no view!');
  arr = arr || [];

  var result = arr.map(function(item){
    return item.deserialize(view)
  });

  return result;
}

function deserializeObject(obj, view){

  if (obj === true) console.trace();
  var result = [];

  obj = obj || {};
  for (var key in obj) {
    var value = obj[key];

    if (typeof value == 'string') {
      result.push(key + '="' + value+'"');
    } else if (typeof value == 'boolean'){
      result.push(key + '="' + String(value)+'"');
    } else if (typeof value == 'number'){
      result.push(key + '="' + String(value)+'"');
    } else if (value === null){
      result.push(key + '="' + String(value)+'"');
    } else {
      result.push(key + '="' + value.deserialize(view)+'"');
    }

  }

  return result;
}

function sp(arr){
  arr
  if (arr.length == 0) return '';

  return ' ' + arr.join(' ');
}


function getArrayName(view, name, arrayNames){
//  console.log('ddd', view.views, name, arrayNames);
  var view = view.views.find(name);

  try {
    var arraysMap = view.arraysMap || {};
  } catch (e){
    console.log('arguments: ', arguments);
  }

  for(var key in arraysMap) {
    var val = arraysMap[key];

    if (val == arrayNames) {
      return key;
    }
  }

  throw new Error('Can not find array name: '+ arrayNames + 'in view: '+ name);
}