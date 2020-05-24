var PLAYER_ACCELERATION = 200
var PLAYER_ACCELERATION_N = -200

var PLAYER_BREAK_SPEED = 400
var PLAYER_BREAK_SPEED_N = -400

var CLIMB_SPEED = 100
var CLIMB_SPEED_N = -100

function playerRun() {
  if (player.iso.cursorDown === true) {

    if (player.iso.cursor1 == "down") {
      if ((player.iso.body.velocity.y > 200 || player.iso.body.velocity.y < -200) && player.onFloor()) {
        player.iso.movement = "skid"
      } else {
        player.iso.body.acceleration.x = player.iso.body.velocity.x > 0 ? PLAYER_ACCELERATION : PLAYER_BREAK_SPEED
        if(player.iso.cursor2 == "left") player.iso.body.velocity.y = player.iso.body.velocity.x * 0.75;
        else if(player.iso.cursor2 == "right") player.iso.body.velocity.y = player.iso.body.velocity.x * -0.75;
        else player.iso.body.velocity.y = 0;
      }
    }
    else if (player.iso.cursor1 == "up") {
      if ((player.iso.body.velocity.y > 200 || player.iso.body.velocity.y < -200) && player.onFloor()) {
        player.iso.movement = "skid"
      } else {
        player.iso.body.acceleration.x = player.iso.body.velocity.x < 0 ? PLAYER_ACCELERATION_N : PLAYER_BREAK_SPEED_N 
        if(player.iso.cursor2 == "left") player.iso.body.velocity.y = player.iso.body.velocity.x * -0.75;
        else if(player.iso.cursor2 == "right") player.iso.body.velocity.y = player.iso.body.velocity.x * 0.75;
        else player.iso.body.velocity.y = 0;
      }
    }
    else if (player.iso.cursor1 == "left") {
      if ((player.iso.body.velocity.x > 200 || player.iso.body.velocity.x < -200) && player.onFloor()) {
        player.iso.movement = "skid"
      } else {
        player.iso.body.acceleration.y = player.iso.body.velocity.y > 0 ? PLAYER_ACCELERATION : PLAYER_BREAK_SPEED
        if(player.iso.cursor2 == "up") player.iso.body.velocity.x = player.iso.body.velocity.y * -0.75;
        else if(player.iso.cursor2 == "down") player.iso.body.velocity.x = player.iso.body.velocity.y * 0.75;
        else player.iso.body.velocity.x = 0;
      }
    }
    else if (player.iso.cursor1 == "right") {
      if ((player.iso.body.velocity.x > 200 || player.iso.body.velocity.x < -200) && player.onFloor()) {
        player.iso.movement = "skid"
      } else {
        player.iso.body.acceleration.y = player.iso.body.velocity.y < 0 ? PLAYER_ACCELERATION_N : PLAYER_BREAK_SPEED_N
        if(player.iso.cursor2 == "up") player.iso.body.velocity.x = player.iso.body.velocity.y * 0.75;
        else if(player.iso.cursor2 == "down") player.iso.body.velocity.x = player.iso.body.velocity.y * -0.75;
        else player.iso.body.velocity.x = 0;
      }
    }
  }
}

function playerDeceleration() {
  if (player.iso.cursorDown === false) {
    // Player Deceleration
    if(player.iso.body.velocity.x > 0){
      player.iso.body.acceleration.x = -300;
    }
    if(player.iso.body.velocity.x < 0){
      player.iso.body.acceleration.x = 300;
    }
    if(player.iso.body.velocity.y > 0){
      player.iso.body.acceleration.y = -300;
    }
    if(player.iso.body.velocity.y < 0){
      player.iso.body.acceleration.y = 300;
    }

    // Stop player at velocity 50
    if (player.iso.body.velocity.x < 50 && player.iso.body.velocity.x > -50) {
      player.iso.body.velocity.x = 0;
      player.iso.body.acceleration.x = 0;
    }

    if (player.iso.body.velocity.y < 50 && player.iso.body.velocity.y > -50) {
      player.iso.body.velocity.y = 0;
      player.iso.body.acceleration.y = 0;
    }
  }
}



function playerClimb() {
  player.iso.body.allowGravity = false
  player.iso.body.acceleration = { x: 0, y: 0, z: 0 }
  player.iso.body.velocity = { x: 0, y: 0, z: 0 }

  if (player.iso.direction === "r") {
    // Jump off ladder
    if (player.btn1Pressed) {
      player.isoY =- 2
      player.iso.body.allowGravity = true
      player.iso.movement = "jump"
    }
    else if (player.cursors.left.isDown && player.onFloor()) {
      player.isoY =- 2
      player.iso.body.allowGravity = true
      player.iso.movement = "normal"
    } 
    else if (player.cursors.right.isDown) {
        player.iso.body.velocity.z = CLIMB_SPEED
    }
    else if (player.cursors.left.isDown) {
      player.iso.body.velocity.z = CLIMB_SPEED_N
    } 
    else if (player.cursors.up.isDown && !isBeyondAxis("xx", player.iso, player.iso.activeLadder)) {
      player.iso.body.velocity.x = CLIMB_SPEED_N
    } 
    else if (player.cursors.down.isDown && !isBeyondAxis("xy", player.iso, player.iso.activeLadder)) {
      player.iso.body.velocity.x = CLIMB_SPEED
    }
  }

  if (player.iso.direction === "u") {
    if (player.btn1Pressed) {
      player.isoX += 2
      player.iso.body.allowGravity = true
      player.iso.movement = "jump"
    }
    else if (player.cursors.down.isDown && player.onFloor()) {
      player.isoX =- 2
      player.iso.body.allowGravity = true
      player.iso.movement = "normal"
    } 
    else if (player.cursors.up.isDown) {
      player.iso.body.velocity.z = CLIMB_SPEED
    }
    else if (player.cursors.down.isDown) {
      player.iso.body.velocity.z = CLIMB_SPEED_N
    } 
    else if (player.cursors.right.isDown && !isBeyondAxis("yy", player.iso, player.iso.activeLadder)) {
      player.iso.body.velocity.y = CLIMB_SPEED_N
    } 
    else if (player.cursors.left.isDown && !isBeyondAxis("yx", player.iso, player.iso.activeLadder)) {
      player.iso.body.velocity.y = CLIMB_SPEED
    }
  }
}