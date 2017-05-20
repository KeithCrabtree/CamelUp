exports.Player = function(name, clientId) {
  this.name = name;
  this.clientId = clientId;

  this.getName = function() { return this.name; }
  this.getClientId = function() { return this.clientId; }
}
