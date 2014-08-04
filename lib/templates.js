module.exports = function(templates){
  with (templates) {
    View.prototype.deserialize = function () {
      return this.template.deserialize();
    };

    Template.prototype.deserialize = function () {
      var content = this.content || [];

      return deserializeArray(content).join('\n');
    };


    Text.prototype.deserialize = function () {
      return this.data;
    };

    Attribute.prototype.deserialize = function () {
      //TODO ns
//      return serializeObject.instance(this, this.data, this.ns);
      return this.data;
    };

    ElementOn.prototype.deserialize = function () {
      return 'on-'+this.name+'"' + this.expression.deserialize()+ '"';
    };

    ComponentOn.prototype.deserialize = function () {
      return 'on-'+this.name+'"' + this.expression.deserialize()+ '"';
    };

    DynamicAttribute.prototype.deserialize = function () {
      //TODO ns
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

      attributes.concat(hooks);

      if (this.selfClosing || VOID_ELEMENTS[tag]) {
        result = '<'+ tag + sp(attributes) + '/>';
      } else {
        result += '<'+ tag + sp(attributes) + '>';
        result += content.join('\n')+ '';
        result += '</'+ tag +'>';
      }

      return result;
    };

    ViewInstance.prototype.deserialize = function () {
      // TODO attributes, array/arrays
      var result = '';

      var content = this.attributes.content;
      delete this.this.attributes.content;

      if (content) {
        content = content.deserialize();
      } else {
        content = '';
      }
      var attributes = deserializeObject(this.attributes);
      var hooks = deserializeArray(this.hooks);
      attributes.concat(hooks);

//      return serializeObject.instance(this, this.name, this.attributes, this.hooks);
      result += '<view name="'+this.name+'"' + sp(attributes)+'>';
      result += content;
      result += '</view>';
      return result;
    };

    DynamicViewInstance.prototype.deserialize = function () {
//      return serializeObject.instance(this, this.nameExpression, this.attributes, this.hooks);
      return '';
    };

    ParentWrapper.prototype.deserialize = function () {
//      return serializeObject.instance(this, this.template, this.expression);
      return '';
    };

    ComponentMarker.prototype.deserialize = function () {
//      return serializeObject.instance(this);
      return '';
    };

    MarkupAs.prototype.deserialize = function () {
      var segments = this.segments.concat(this.lastSegment);
//      return serializeObject.instance(this, segments);
      return ' as="'+ segments +'" ';
    };

    Doctype.prototype.deserialize = function () {
//      return serializeObject.instance(this, this.name, this.publicId, this.systemId);
      return '';
    };

    DynamicText.prototype.deserialize = function () {
//      return serializeObject.instance(this, this.expression);
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

    Block.prototype.deserialize = function () {
//      return serializeObject.instance(this, this.expression, this.content);
      return '';
    };

    ConditionalBlock.prototype.deserialize = function () {
//      return serializeObject.instance(this, this.expressions, this.contents);
      return '';
    };

    EachBlock.prototype.deserialize = function () {
//      return serializeObject.instance(this, this.expression, this.content, this.elseContent);
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
    result.push(key + '="' + obj[key].deserialize()+'"');
  }

  return result;
}

function sp(arr){
  arr
  if (arr.length == 0) return '';

  return ' ' + arr.join(' ');
}
