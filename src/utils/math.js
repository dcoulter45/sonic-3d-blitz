function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function hashCode(str) {
  var hash = 0;
  for (var i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return hash;
}

function getDistanceBetween(obj1, obj2) {
  var distanceX = Math.abs(parseInt(obj1.body.position.x - obj2.body.position.x))
  var distanceY = Math.abs(parseInt(obj1.body.position.y - obj2.body.position.y))
  return distanceX + distanceY
}
