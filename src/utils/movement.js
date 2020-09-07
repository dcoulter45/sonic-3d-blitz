function moveToXYZ(iso, position, time, callback) {
  // var speed = this.distanceToXYZ(displayObject.body, x, y ,z) / (maxTime / 1000);
  var x = position.x || iso.body.x
  var y = position.y || iso.body.y
  var z = position.z || iso.body.z

  game.physics.isoArcade.moveToXYZ(iso, x, y, z, 1, time)
  game.time.events.add(time, () => {
    iso.body.velocity.x = 0
    iso.body.velocity.y = 0
    iso.body.velocity.z = 0
    
    iso.isoX = x
    iso.isoY = y
    iso.isoZ = z

    if (callback) callback()
  }, this)
}

function isMoving(iso) {
  return (
    iso.body.velocity.x > 0 ||
    iso.body.velocity.x < 0 ||
    iso.body.velocity.y > 0 ||
    iso.body.velocity.y < 0
  )
}

function isMovingFasterThan(velocity, speed) {
  if (!velocity) {
    return false
  }
  
  return (
    velocity.x > speed ||
    velocity.x < speed * -1 ||
    velocity.y > speed ||
    velocity.y < speed * -1
  )
}

function setVelocity(iso, direction, velocity) {
  if (direction == "left" || direction === "l" || direction === "y") {
    iso.body.velocity.y = velocity;
  } else if (direction == "right" || direction === "r") {
    iso.body.velocity.y = velocity * -1;
  } else if(direction == "down" || direction === "d" || direction === "x"){
    iso.body.velocity.x = velocity;
  } else if(direction == "up" || direction === "u"){
    iso.body.velocity.x = velocity * -1;
  } else if (direction === "z") {
    iso.body.velocity.z = velocity
  }
}