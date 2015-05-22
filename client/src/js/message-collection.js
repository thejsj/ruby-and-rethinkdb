var MessageCollection = function () {
  this.messages = {};
};

MessageCollection.prototype.append = function (message) {
  this.messages[message.id] = message;
};

MessageCollection.prototype.toArray = function () {
  var array = [];
  for (var id in this.messages) {
    array.push(this.messages[id]);
  }
  var array = array.sort(function (a, b) {
    return +(a.created) >= +(b.created);
  });
  return array;
};

module.exports = MessageCollection;
