module.exports = function(expressions){
  with (expressions) {
    ExpressionMeta.prototype.deserialize = function () {
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
    Expression.prototype.deserialize = function () {
//      return serializeObject.instance(this, this.meta);
      return this.meta.deserialize();
    };
    LiteralExpression.prototype.deserialize = function () {
//      return serializeObject.instance(this, this.value, this.meta);
      return this.meta.deserialize();
    };
    PathExpression.prototype.deserialize = function () {
//      return serializeObject.instance(this, this.segments, this.meta);
//      var segments = this.segments.join('.');
      if (this.meta){
        return this.meta.deserialize();
      }

      return this.segments.join('.');
    };
    RelativePathExpression.prototype.deserialize = function () {
//      return serializeObject.instance(this, this.segments, this.meta);
      return this.meta.deserialize();
    };
    AliasPathExpression.prototype.deserialize = function () {
//      return serializeObject.instance(this, this.alias, this.segments, this.meta);
      return this.meta.deserialize();
    };
    AttributePathExpression.prototype.deserialize = function () {
//      return serializeObject.instance(this, this.attribute, this.segments, this.meta);
      return this.meta.deserialize();
    };
    BracketsExpression.prototype.deserialize = function () {
//      return serializeObject.instance(this, this.before, this.inside, this.afterSegments, this.meta);
      return this.meta.deserialize();
    };
    FnExpression.prototype.deserialize = function () {
//      return serializeObject.instance(this, this.segments, this.args, this.afterSegments, this.meta);

      if (this.meta) {
        return this.meta.deserialize();
      } else {
        var segments = this.segments.join('.');
        return segments + '('+ deserializeArray(this.args).join(',')+ ')';
      }
    };
    OperatorExpression.prototype.deserialize = function () {
//      return serializeObject.instance(this, this.name, this.args, this.afterSegments, this.meta);
      return this.meta.deserialize();
    };
    SequenceExpression.prototype.deserialize = function () {
//      return serializeObject.instance(this, this.args, this.afterSegments, this.meta);
      return this.meta.deserialize();
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
