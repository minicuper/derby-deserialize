module.exports = function(expressions){
  with (expressions) {
    ExpressionMeta.prototype.deserialize = function (view) {
//      return serializeObject.instance(
//        this
//        , this.source
//        , this.blockType
//        , this.isEnd
//        , this.as
//        , this.keyAs
//        , this.unescaped
//        , this.bindType
//        , this.valueType
//      );
      return this.source;
    };
    Expression.prototype.deserialize = function (view) {
//      return serializeObject.instance(this, this.meta);
      return this.meta.deserialize(view);
    };
    LiteralExpression.prototype.deserialize = function (view) {
//      return serializeObject.instance(this, this.value, this.meta);
      return this.meta.deserialize(view);
    };
    PathExpression.prototype.deserialize = function (view) {
//      return serializeObject.instance(this, this.segments, this.meta);
//      var segments = this.segments.join('.');
      if (this.meta){
        return this.meta.deserialize(view);
      }

      return this.segments.join('.');
    };
    RelativePathExpression.prototype.deserialize = function (view) {
//      return serializeObject.instance(this, this.segments, this.meta);
      return this.meta.deserialize(view);
    };
    AliasPathExpression.prototype.deserialize = function (view) {
//      return serializeObject.instance(this, this.alias, this.segments, this.meta);
      return this.meta.deserialize(view);
    };
    AttributePathExpression.prototype.deserialize = function (view) {
//      return serializeObject.instance(this, this.attribute, this.segments, this.meta);
      return this.meta.deserialize(view);
    };
    BracketsExpression.prototype.deserialize = function (view) {
//      return serializeObject.instance(this, this.before, this.inside, this.afterSegments, this.meta);
      return this.meta.deserialize(view);
    };
    FnExpression.prototype.deserialize = function (view) {
//      return serializeObject.instance(this, this.segments, this.args, this.afterSegments, this.meta);

      if (this.meta) {
        return this.meta.deserialize(view);
      } else {
        var segments = this.segments.join('.');
        return segments + '('+ deserializeArray(this.args, view).join(',')+ ')';
      }
    };
    OperatorExpression.prototype.deserialize = function (view) {
//      return serializeObject.instance(this, this.name, this.args, this.afterSegments, this.meta);
      return this.meta.deserialize(view);
    };
    SequenceExpression.prototype.deserialize = function (view) {
//      return serializeObject.instance(this, this.args, this.afterSegments, this.meta);
      return this.meta.deserialize(view);
    };
  }
}

function deserializeArray(arr, view){
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
