function createCursors() {
  player.space = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
  player.a = game.input.keyboard.addKey(Phaser.Keyboard.A);
  player.s = game.input.keyboard.addKey(Phaser.Keyboard.S);
  player.cursors = game.input.keyboard.createCursorKeys();

  game.input.keyboard.addKeyCapture([
    Phaser.Keyboard.LEFT,
    Phaser.Keyboard.RIGHT,
    Phaser.Keyboard.UP,
    Phaser.Keyboard.DOWN,
    Phaser.Keyboard.SPACEBAR
  ]);

  player.space.onDown.add(jumpPress);
  player.space.onUp.add(jumpRelease);
  player.a.onDown.add(jumpPress);
  player.a.onUp.add(jumpRelease);
  player.s.onDown.add(slamPress);
  player.s.onUp.add(slamRelease);
}

function jumpPress() {
  player.btn1Pressed = true
}

function jumpRelease() {
  player.btn1Pressed = false
}

function slamPress() {
  player.btn2Pressed = true
}

function slamRelease() {
  player.btn2Pressed = false
}

function detectCursors() {
  
  //  Cursor Check
  // ----------------
  if(player.iso.cursor1 == ""){

    if (player.cursors.down.isDown){
      player.iso.cursor1 = "down";
      player.iso.direction = 'd';
      player.iso.cursorDown = true;
    } else if (player.cursors.up.isDown){
      player.iso.cursor1 = "up";
      player.iso.direction = 'u';
      player.iso.cursorDown = true;
    }
    else if (player.cursors.left.isDown){
      player.iso.cursor1 = "left";
      player.iso.direction = 'l';
      player.iso.cursorDown = true;
    }
    else if (player.cursors.right.isDown){
      player.iso.cursor1 = "right";
      player.iso.direction = 'r';
      player.iso.cursorDown = true;
    }
    else{
      player.iso.cursorDown = false;
    }
  }
  else{

    if(player.cursors[player.iso.cursor1].isUp){

      player.iso.cursor1 = "";
      player.iso.cursor2 = "";
    }

    // Track second cursor at full speed
    // ---------------------------------
    if(
      player.iso.body.velocity.x >= 50 || player.iso.body.velocity.x <= -50 ||
      player.iso.body.velocity.y >= 50 || player.iso.body.velocity.y <= -50
    ){
      if (player.cursors.down.isDown && player.iso.cursor1 != 'down'){
        player.iso.cursor2 = "down";
        player.iso.direction2 ="d";
      }
      else if (player.cursors.up.isDown && player.iso.cursor1 != 'up'){
        player.iso.cursor2 = "up";
        player.iso.direction2 ="u";
      }
      else if (player.cursors.left.isDown && player.iso.cursor1 != 'left'){
        player.iso.cursor2 = "left";
        player.iso.direction2 ="l";
      }
      else if (player.cursors.right.isDown && player.iso.cursor1 != 'right'){
        player.iso.cursor2 = "right";
        player.iso.direction2 ="r";
      }
      else{
        player.iso.cursor2 = "";
        player.iso.direction2 ="";
      }
    }
    else{
      player.iso.cursor2 = "";
      player.iso.direction2 ="";
    }
  }
}