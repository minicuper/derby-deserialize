module.exports = function(templates){
  with (templates) {
    View.prototype.deserialize = function () {
      return this.template.deserialize();
    };

    Template.prototype.deserialize = function () {
      var content = this.content || [];

      return deserializeArray(content).join('');
    };


    Text.prototype.deserialize = function () {
      return this.data;
    };

    Attribute.prototype.deserialize = function () {
//      return serializeObject.instance(this, this.data, this.ns);
      return this.data;
    };

    ElementOn.prototype.deserialize = function () {
      return 'on-'+this.name+'="' + this.expression.deserialize()+ '"';
    };

    ComponentOn.prototype.deserialize = function () {
      return 'on-'+this.name+'="' + this.expression.deserialize()+ '"';
    };

    DynamicAttribute.prototype.deserialize = function () {
//      return serializeObject.instance(this, this.expression, this.ns);
      return '{{'+ this.expression.deserialize() + '}}';
    };


    Element.prototype.deserialize = function () {
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
      var attributes = deserializeObject(this.attributes);
      var content = deserializeArray(this.content);
      var hooks = deserializeArray(this.hooks);


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

    Block.prototype.deserialize = function () {
//      return serializeObject.instance(this, this.expression, this.content);
      return '{{'+this.expression.deserialize()+'}}' + deserializeArray(this.content).join('')+'{{/}}';
    };

    ConditionalBlock.prototype.deserialize = function () {
//      return serializeObject.instance(this, this.expressions, this.contents);
      var result = '';

      var expressions = this.expressions || [];
      var contents = this.contents || [];

      for(var i = 0; i< expressions.length; i++){
        result += '{{' + expressions[i].deserialize()+'}}';
        result +=  deserializeArray(contents[i]).join('')
      }
      return result+'{{/}}';
    };

    EachBlock.prototype.deserialize = function () {
//      return serializeObject.instance(this, this.expression, this.content, this.elseContent);
      var elseContent = '';

      if (this.elseContent && Array.isArray(this.elseContent) && this.elseContent.length != 0) {
        elseContent = '{{else}}' + deserializeArray(this.elseContent).join('')
      }

      return '{{'+this.expression.deserialize()+'}}' + deserializeArray(this.content).join('')+ elseContent +'{{/}}';
    };

    DynamicText.prototype.deserialize = function () {
//      return serializeObject.instance(this, this.expression);
      return '{{'+this.expression.deserialize()+'}}';
    };

    MarkupAs.prototype.deserialize = function () {
      var segments = this.segments.concat(this.lastSegment);
//      return serializeObject.instance(this, segments);
      return 'as="'+ segments +'"';
    };


    ViewInstance.prototype.deserialize = function () {
//      return serializeObject.instance(this, this.name, this.attributes, this.hooks);

      // TODO attributes, array/arrays
      var result = '';

      var attr = this.attributes || {};

      var parents = {};
//      var content;

      for(var key in attr) {
        if (attr[key].type == 'ParentWrapper'){
//          if (key == 'content') {
//            content = attr[key];
//          } else {
            parents[key] = attr[key];
//          }

          delete attr[key];
        }
      }

//      if (content) {
//        content = content.deserialize();
//      } else {
//        content = '';
//      }

      var parentsStr = '';

      for(var key in parents) {
        if (key == 'content') {
          parentsStr += parents[key].deserialize()
        } else {
          parentsStr += '<'+key+'>'+parents[key].deserialize()+'</'+key+'>';
        }
      }

      var attributes = deserializeObject(attr);
      var hooks = deserializeArray(this.hooks);

      attributes = attributes.concat(hooks);

      result += '<view name="'+this.name+'"' + sp(attributes)+'>';
      result += parentsStr;
      result += '</view>';
      return result;
    };

    DynamicViewInstance.prototype.deserialize = function () {
//      return serializeObject.instance(this, this.nameExpression, this.attributes, this.hooks);
      return '';
    };

    ParentWrapper.prototype.deserialize = function () {
//      return serializeObject.instance(this, this.template, this.expression);
      return this.template.deserialize();
    };

    ComponentMarker.prototype.deserialize = function () {
//      return serializeObject.instance(this);
      return '';
    };

    Doctype.prototype.deserialize = function () {
//      return serializeObject.instance(this, this.name, this.publicId, this.systemId);
      return '';
    };

    Comment.prototype.deserialize = function () {
//      return serializeObject.instance(this, this.data, this.hooks);
//      return '<!--' + this.data + sp(deserializeArray(this.hooks))+'-->';
      return '';
    };

    DynamicComment.prototype.deserialize = function () {
//      return serializeObject.instance(this, this.expression, this.hooks);
      return '';
    };

    Html.prototype.deserialize = function () {
//      return serializeObject.instance(this, this.data);
      return '';
    };

    DynamicHtml.prototype.deserialize = function () {
//      return serializeObject.instance(this, this.expression);
      return '';
    };
  }
}

function deserializeArray(arr){
  arr = arr || [];

  var result = arr.map(function(item){
    return item.deserialize()
  });

  return result;
}

function deserializeObject(obj){

  if (obj === true) console.trace();
  var result = [];

  obj = obj || {};
  for (var key in obj) {
    var value = obj[key];

    if (typeof value == 'string') {
      result.push(key + '="' + value+'"');
    } else {
      result.push(key + '="' + value.deserialize()+'"');
    }

  }

  return result;
}

function sp(arr){
  arr
  if (arr.length == 0) return '';

  return ' ' + arr.join(' ');
}
