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
      if (!this.meta){
        return this.value;
      }

      try {
        return this.meta.deserialize(view);
      }catch (e){
        console.log('error:', this, view.name);
      }

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
      if (!this.meta){
        if (this.segments.length != 0){
          throw new Error('Should handle segments - RelativePathExpression!');
        }

        return '';

      }

      try {
        return this.meta.deserialize(view);
      }catch (e){
        console.log('error888:', this, view.name);
      }
    };
    AliasPathExpression.prototype.deserialize = function (view) {
//      return serializeObject.instance(this, this.alias, this.segments, this.meta);
      var segments = this.segments || [];

      if (!this.meta) {
        if (segments.length == 0) {
          return this.alias;
        }

        return this.alias + '.' + segments.join('.');
      }

      try {
        return this.meta.deserialize(view);
      }catch (e){
        console.log('error:', this, view.name);
      }

    };
    AttributePathExpression.prototype.deserialize = function (view) {
//      return serializeObject.instance(this, this.attribute, this.segments, this.meta);

      if (!this.meta) {
        return '@'+this.attribute;
        if (this.segments.length != 0){
          throw new Error('Should handle segments!');
        }
      }

      try {
        return this.meta.deserialize(view);
      }catch (e){
        console.log('error44:', this, view.name);
      }
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

      if (!this.meta) {
        if(this.args.length !==2 && '+-'.indexOf(this.name) == -1){
          throw new Error('Please handle new OperatorExpression!');
        }
        return this.args[0].deserialize(view)+ this.name + this.args[1].deserialize(view)
      }

      try {
        return this.meta.deserialize(view);
      }catch (e){
        console.log('error33:', this, view.name);
      }
    };
    SequenceExpression.prototype.deserialize = function (view) {
//      return serializeObject.instance(this, this.args, this.afterSegments, this.meta);

      if (!this.meta) {
        return deserializeArray(this.args).join(',')
      }
      try {
        return this.meta.deserialize(view);
      }catch (e){
        console.log('error222:', this, view.name);
      }

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
