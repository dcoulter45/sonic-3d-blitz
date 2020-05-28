function isWithin(obj1, obj2, tolerance = 0) {
  var touching = false

  var xx_1 = obj1.body.position.x
  var xy_1 = obj1.body.position.x + obj1.body.widthX
  var yy_1 = obj1.body.position.y 
  var yx_1 = obj1.body.position.y + obj1.body.widthY

  var xx_2 = obj2.body.position.x + tolerance
  var xy_2 = obj2.body.position.x + obj2.body.widthX - tolerance
  var yy_2 = obj2.body.position.y + tolerance
  var yx_2 = obj2.body.position.y + obj2.body.widthY - tolerance

  if (
    xx_1 > xx_2 
    && xy_1 < xy_2
    && yy_1 > yy_2
    && yx_1 < yx_2
  ) {
    touching = true
  }

  return touching
}

function isBeyondAxis(axis, obj1, obj2) {
  var beyond = false 

  if (axis === "xx") {
    var xx_1 = obj1.body.position.x
    var xx_2 = obj2.body.position.x

    beyond = xx_1 < xx_2
  } 
  else if (axis === "xy") {
    var xy_1 = obj1.body.position.x + obj1.body.widthX
    var xy_2 = obj2.body.position.x + obj2.body.widthX

    beyond = xy_1 > xy_2
  }
  else if (axis === "yy") {
    var yy_1 = obj1.body.position.y 
    var yy_2 = obj2.body.position.y

    beyond = yy_1 < yy_2
  } 
  else if (axis === "yx") {
    var yx_1 = obj1.body.position.y + obj1.body.widthY
    var yx_2 = obj2.body.position.y + obj2.body.widthY

    beyond = yx_1 > yx_2
  }

  return beyond
}

function isWithinAxis(axis, obj1, obj2) {
  var touching = false

  if (axis === "x") {
    var xx_1 = obj1.body.position.x
    var xy_1 = obj1.body.position.x + obj1.body.widthX

    var xx_2 = obj2.body.position.x
    var xy_2 = obj2.body.position.x + obj2.body.widthX
    
    if (xx_1 > xx_2 && xy_1 < xy_2) {
      touching = true
    }
  }
  else if (axis === "y") {
    var yy_1 = obj1.body.position.y 
    var yx_1 = obj1.body.position.y + obj1.body.widthY

    var yy_2 = obj2.body.position.y
    var yx_2 = obj2.body.position.y + obj2.body.widthY
    
    if (yy_1 > yy_2 && yx_1 < yx_2) {
      touching = true
    }
  }

  return touching
}

function getSlopePos(obj, slope) {
  var objXX = obj.body.position.x + obj.body.widthX
  var objYY = obj.body.position.y + obj.body.widthY

  if (slope.direction == "down") {
    var xx = slope.body.position.x - obj.body.position.x
    var zz = slope.body.position.z + slope.body.height + ((xx / slope.body.widthX) * slope.body.height)
  }
  else if (slope.direction == "up") {
    var xx = slope.body.position.x - objXX
    var zz = slope.body.position.z - ((xx / slope.body.widthX) * slope.body.height)
  }
  else if (slope.direction == "left") {
    var yy = slope.body.position.y - obj.body.position.y
    var zz = slope.body.position.z + slope.body.height + ((yy / slope.body.widthY) * slope.body.height)
  }
  else if (slope.direction == "right") {
    var yy = slope.body.position.y - objYY
    var zz = slope.body.position.z - ((yy / slope.body.widthY) * slope.body.height)
  }

  return Math.min(zz, slope.body.position.z + slope.body.height)
}