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
    });
  }
}

function detectHomingTarget() {
  if(!player.onFloor() && player.iso.movement !== 'homing attack' && player.iso.movement !== 'dead'){
    var targets = [];
    player.homingTarget = null;

    // Find targets in range
    groups.objects.forEach((object) => {

      if(object.targetable && object.visible){

        var distance = {
          x: Math.abs(parseInt(object.body.position.x - player.iso.body.position.x)),
          y: Math.abs(parseInt(object.body.position.y - player.iso.body.position.y)),
          z: parseInt(object.body.position.z - player.iso.body.position.z)
        }

        if(distance.x + distance.y < 100 && distance.z < -10){
          targets.push({
            object: object,
            distance: distance
          })
        }
      }
    });

    // Find closet target
    targets.forEach((obj) => {
      if (!player.homingTarget) {
        player.homingTarget = obj.object;
      } 
      else {
        var distanceX = Math.abs(parseInt(player.homingTarget.body.position.x - player.iso.body.position.x))
        var distanceY = Math.abs(parseInt(player.homingTarget.body.position.y - player.iso.body.position.y))
        var currentTargetDistance = distanceX + distanceY;
        
        if (obj.distance.x + obj.distance.y < currentTargetDistance) {
          player.homingTarget = obj.object;
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
