var PLAYER_ACCELERATION = 200
var PLAYER_ACCELERATION_N = -200

var PLAYER_BREAK_SPEED = 400
var PLAYER_BREAK_SPEED_N = -400

function playerRun() {
  if (player.iso.cursorDown === true) {

    if (player.iso.cursor1 == 'down') {
      if (player.iso.body.velocity.y > 200 || player.iso.body.velocity.y < -200) {
        player.iso.movement = "skid"
      } else {
        player.iso.body.acceleration.x = player.iso.body.velocity.x > 0 ? PLAYER_ACCELERATION : PLAYER_BREAK_SPEED
        if(player.iso.cursor2 == 'left') player.iso.body.velocity.y = player.iso.body.velocity.x * 0.75;
        else if(player.iso.cursor2 == 'right') player.iso.body.velocity.y = player.iso.body.velocity.x * -0.75;
        else player.iso.body.velocity.y = 0;
      }
    }
    else if (player.iso.cursor1 == 'up') {
      if (player.iso.body.velocity.y > 200 || player.iso.body.velocity.y < -200) {
        player.iso.movement = "skid"
      } else {
        player.iso.body.acceleration.x = player.iso.body.velocity.x < 0 ? PLAYER_ACCELERATION_N : PLAYER_BREAK_SPEED_N 
        if(player.iso.cursor2 == 'left') player.iso.body.velocity.y = player.iso.body.velocity.x * -0.75;
        else if(player.iso.cursor2 == 'right') player.iso.body.velocity.y = player.iso.body.velocity.x * 0.75;
        else player.iso.body.velocity.y = 0;
      }
    }
    else if (player.iso.cursor1 == 'left') {
      if (player.iso.body.velocity.x > 200 || player.iso.body.velocity.x < -200) {
        player.iso.movement = "skid"
      } else {
        player.iso.body.acceleration.y = player.iso.body.velocity.y > 0 ? PLAYER_ACCELERATION : PLAYER_BREAK_SPEED
        if(player.iso.cursor2 == 'up') player.iso.body.velocity.x = player.iso.body.velocity.y * -0.75;
        else if(player.iso.cursor2 == 'down') player.iso.body.velocity.x = player.iso.body.velocity.y * 0.75;
        else player.iso.body.velocity.x = 0;
      }
    }
    else if (player.iso.cursor1 == 'right') {
      if (player.iso.body.velocity.x > 200 || player.iso.body.velocity.x < -200) {
        player.iso.movement = "skid"
      } else {
        player.iso.body.acceleration.y = player.iso.body.velocity.y < 0 ? PLAYER_ACCELERATION_N : PLAYER_BREAK_SPEED_N
        if(player.iso.cursor2 == 'up') player.iso.body.velocity.x = player.iso.body.velocity.y * 0.75;
        else if(player.iso.cursor2 == 'down') player.iso.body.velocity.x = player.iso.body.velocity.y * -0.75;
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