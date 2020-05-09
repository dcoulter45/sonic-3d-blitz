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