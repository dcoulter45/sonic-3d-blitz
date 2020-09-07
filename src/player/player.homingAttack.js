class HomingTrail {
  constructor(x,y,z,direction) {
    this.iso = game.add.isoSprite(x, y, z, 'sonic', 0, groups.objects);

    this.iso.animations.add('default', [80],10,true);
    this.iso.animations.play('default');
    this.iso.alpha = 0.6;

    this.iso.anchor.set(0.5);

    game.add.tween(this.iso).to({ alpha: 0 }, 300, "Linear", true);

    game.time.events.add(300,()=>{
      this.iso.destroy();
    }, this)
  }
}

function detectHomingTarget() {
  if (
    !player.onFloor() 
    && (player.iso.movement === "jump" || player.iso.movement === "sprung")
  ) {
    player.homingTarget = null;

    // Find targets in range
    groups.targets.forEach((object) => {
      if (object.visible) {
        var objectDistance = getDistanceBetween(object, player.iso)
        var isAboveObject = object.body.position.z <= player.iso.body.position.z

        if (objectDistance < 150 && isAboveObject) {
          if (!player.homingTarget) {
            player.homingTarget = object;
          } 
          else {
            var currentTargetDistance = getDistanceBetween(player.homingTarget, player.iso)
            
            if (objectDistance < currentTargetDistance) {
              player.homingTarget = object;
            }
          }
        }
      }
    });

    if (player.homingTarget) {
      player.crosshair.iso.visible = true;
      player.crosshair.iso.isoX = player.homingTarget.body.position.x;
      player.crosshair.iso.isoY = player.homingTarget.body.position.y;
      player.crosshair.iso.isoZ = player.homingTarget.body.position.z;
    } else {
      player.crosshair.iso.visible = false;
    }
  } else {
    player.crosshair.iso.visible = false;
  }
}
