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
      return this.meta.deserialize();
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
      return this.meta.deserialize();
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