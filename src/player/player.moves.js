function playerMoves() {
  if (player.iso.movement === "drowning" || player.iso.movement === "burning") {
    player.stop()
    player.iso.body.allowGravity = false
  }

  if (player.iso.movement === "dead") {
    if (player.iso.previousMovement !== "dead") {
      player.iso.body.allowGravity = false;
      player.iso.body.velocity = { x:0, y:0, z:50 };
      player.iso.body.acceleration = { x:50, y:0, z:0 };
    }
  }

  if (player.iso.movement === "homing attack") {
    // player.iso.body.position.x += player.homingTargetPosition.moveX;
    // player.iso.body.position.y += player.homingTargetPosition.moveY;
    // player.iso.body.position.z += player.homingTargetPosition.moveZ;

    if (player.onFloor()) {
      player.iso.movement = "normal";
    }
  }

  if (player.iso.movement === "skid") {
    player.iso.movement = "skidding"

    if (player.iso.body.velocity.x > 200 || player.iso.body.velocity.x < -200) {
      player.skidAxis = "x"
      player.iso.body.acceleration.x = player.iso.body.velocity.x * -2
      player.iso.body.acceleration.y = 0
      player.iso.body.velocity.y = 0
    } else if (player.iso.body.velocity.y > 200 || player.iso.body.velocity.y < -200) {
      player.skidAxis = "y"
      player.iso.body.acceleration.y = player.iso.body.velocity.y * -2
      player.iso.body.acceleration.x = 0
      player.iso.body.velocity.x = 0
    }

    game.time.events.add(500, () => {
      player.iso.movement = "normal"

      // Boost out of skid
      if (player.skidAxis === "x") {
        if (player.iso.cursor1 === "right") player.iso.body.velocity.y = -100
        if (player.iso.cursor1 === "left") player.iso.body.velocity.y = 100
      } else if (player.skidAxis === "y") {
        if (player.iso.cursor1 === "up") player.iso.body.velocity.x = -100
        if (player.iso.cursor1 === "down") player.iso.body.velocity.x = 100
      }
    }, this)
  }

  if (player.iso.movement === "skidding") {
    // Slow horizontal speed whilst skidding
    if (player.skidAxis === "x") {
      if (player.iso.body.velocity.y > 0) {
        player.iso.body.acceleration.y = -400
      } else if (player.iso.body.velocity.y < 0) {
        player.iso.body.acceleration.y = 400
      } else {
        player.iso.body.acceleration.y = 0
      }
    }

    if (player.skidAxis === "y") {
      if (player.iso.body.velocity.x > 0) {
        player.iso.body.acceleration.x = -400
      } else if (player.iso.body.velocity.x < 0) {
        player.iso.body.acceleration.x = 400
      } else {
        player.iso.body.acceleration.x = 0
      }
    } 
  }

  if (player.iso.movement === "normal" || player.iso.movement === "roll") {
    // console.log(player.btn1Pressed, player.onFloor())
    // Jump
    if (player.btn1Pressed && player.onFloor()) {
      player.iso.movement = "jump";
      player.iso.body.velocity.z = 250;
      player.btn1Pressed = false;
    }
  }

  if (player.iso.movement === "normal") {
    // Roll
    if (player.btn2Pressed && player.onFloor() && isMovingFasterThan(player.iso.body.velocity, 50)) {
      player.iso.movement = "roll";
      player.btn2Pressed = false;
  
      game.time.events.add(600,()=>{
        if(player.iso.movement == "roll"){
          player.iso.movement = "normal";
        }
      }, this)
    }
  }

  if (player.iso.movement === "jump") {
    // Slam
    if (player.btn2Pressed) {
      player.iso.movement = "slam";
      player.iso.body.velocity = { x:0, y:0, z: -350 };
      player.btn2Pressed = false;
    }

    if (player.btn1Pressed && player.shield && player.shield.type === "Lightning") {
      player.iso.body.velocity.z = 200
      player.iso.movement = "doubleJump"
      Sounds.LightningJump.play()
    }

    if (player.btn1Pressed && player.shield && player.shield.type === "Flame") {
      player.iso.movement = "flameDash"
      player.iso.body.maxVelocity.x = 320;
      player.iso.body.maxVelocity.y = 320;

      setVelocity(player.iso, player.iso.direction, 320)

      new FlameDash()

      Sounds.FireDash.play()

      game.time.events.add(500, () => {
        player.iso.body.maxVelocity.x = MAX_VELOCITY;
        player.iso.body.maxVelocity.y = MAX_VELOCITY;
      }, this)
    }

    // Homing attack
    if (player.btn1Pressed && !player.onFloor() && player.homingTarget) {
      player.iso.movement = "homing attack";
      player.iso.body.acceleration = { x:0, y:0, z:0 };
      player.iso.body.velocity = { x:0, y:0, z:0 };
      player.btn1Pressed = false;

      game.add
        .tween(player.iso.body.position)
        .to(player.homingTarget.body.position, 200, Phaser.Easing.Quintic.In, true)
    }
  }

  // Spring
  if (player.iso.movement === "spring") {
    player.iso.movement = "sprung"
    player.iso.body.velocity.z = 350

    game.time.events.add(600, () => {
      if(player.iso.movement == "sprung") player.iso.movement = "jump"
    }, this)
  }

  // Drop Dash 
  if (player.iso.previousMovement === "slam" && player.iso.movement === "normal" && player.onFloor()) {

    if (player.shield && player.shield.type === "Bubble") {
      // Bubble bounce
      player.iso.body.velocity.z = 300
      player.iso.movement = "jump"
      Sounds.BubbleBounce.play()
    } else {
      // Pound effect
      player.iso.body.velocity.z = 150
      player.iso.movement = "jump"
      new Dust(player.iso.body.position.x + 8, player.iso.body.position.y, player.iso.body.position.z);
      new Dust(player.iso.body.position.x - 8, player.iso.body.position.y, player.iso.body.position.z);
      new Dust(player.iso.body.position.x, player.iso.body.position.y + 8, player.iso.body.position.z);
      new Dust(player.iso.body.position.x, player.iso.body.position.y - 8, player.iso.body.position.z);

      game.camera.shake(0.005, 200);
    }
    // player.iso.movement = "roll"
    
    // if (player.iso.direction === "u") {
    //   player.iso.body.velocity.x = MAX_VELOCITY * -1
    // } else if (player.iso.direction === "d") {
    //   player.iso.body.velocity.x = MAX_VELOCITY
    // } else if (player.iso.direction === "r") {
    //   player.iso.body.velocity.y = MAX_VELOCITY * -1
    // } else if (player.iso.direction === "l") {
    //   player.iso.body.velocity.y = MAX_VELOCITY 
    // }

    // game.time.events.add(600,()=>{
    //   if(player.iso.movement == "roll"){
    //     player.iso.movement = "normal";
    //   }
    // });
  }
}

function playerDismountLadder() {
  player.iso.body.velocity = { x:0, y:0, z:0 };
  player.iso.body.acceleration = { x:0, y:0, z:0 };

  if (player.iso.direction === "r") {
    game.add.tween(player.iso.body.position).to({ 
      y: player.iso.body.position.y - 20,
      z: player.iso.body.position.z + 18,
    }, 300, Phaser.Easing.Linear.None, true)
  }

  if (player.iso.direction === "u") {
    game.add.tween(player.iso.body.position).to({ 
      x: player.iso.body.position.x - 20,
      z: player.iso.body.position.z + 18,
    }, 300, Phaser.Easing.Linear.None, true)
  }

  game.time.events.add(500, () => {
    player.iso.movement = "normal"
    player.iso.activeLadder = null
    player.iso.body.allowGravity = true
  }, this)
}