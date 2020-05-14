function playerRun() {
  if(player.iso.cursorDown === true){

    if(player.iso.cursor1 == 'down'){
      player.iso.body.acceleration.x = (player.iso.body.velocity.x >= 0) ? 200 : 400;
      if(player.iso.cursor2 == 'left') player.iso.body.velocity.y = player.iso.body.velocity.x * 0.75;
      else if(player.iso.cursor2 == 'right') player.iso.body.velocity.y = player.iso.body.velocity.x * -0.75;
      else player.iso.body.velocity.y = 0;
    }
    else if(player.iso.cursor1 == 'up'){
      player.iso.body.acceleration.x = (player.iso.body.velocity.x <= 0) ? -200 : -400;
      if(player.iso.cursor2 == 'left') player.iso.body.velocity.y = player.iso.body.velocity.x * -0.75;
      else if(player.iso.cursor2 == 'right') player.iso.body.velocity.y = player.iso.body.velocity.x * 0.75;
      else player.iso.body.velocity.y = 0;
    }
    else if(player.iso.cursor1 == 'left'){
      player.iso.body.acceleration.y = (player.iso.body.velocity.y >= 0) ? 200 : 400;
      if(player.iso.cursor2 == 'up') player.iso.body.velocity.x = player.iso.body.velocity.y * -0.75;
      else if(player.iso.cursor2 == 'down') player.iso.body.velocity.x = player.iso.body.velocity.y * 0.75;
      else player.iso.body.velocity.x = 0;
    }
    else if(player.iso.cursor1 == 'right'){
      player.iso.body.acceleration.y = (player.iso.body.velocity.y <= 0) ? -200 : -400;
      if(player.iso.cursor2 == 'up') player.iso.body.velocity.x = player.iso.body.velocity.y * 0.75;
      else if(player.iso.cursor2 == 'down') player.iso.body.velocity.x = player.iso.body.velocity.y * -0.75;
      else player.iso.body.velocity.x = 0;
    }
  }
  else{

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
  }
}

function playerDeceleration() {
  if (player.iso.cursorDown === false) {
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