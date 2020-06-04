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
  if (direction == "left" || direction === "y") {
    iso.body.velocity.y = velocity;
  } else if (direction == "right") {
    iso.body.velocity.y = velocity * -1;
  } else if(direction == "down" || direction === "x"){
    iso.body.velocity.x = velocity;
  } else if(direction == "up"){
    iso.body.velocity.x = velocity * -1;
  } else if (direction === "z") {
    iso.body.velocity.z = velocity
  }
}