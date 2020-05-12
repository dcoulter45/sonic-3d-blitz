class PlayerShadow {

  constructor(x, y, z) {
    this.iso = game.add.isoSprite(x, y, z, "playerShadow", 0, groups.objects);

    game.physics.isoArcade.enable(this.iso);

    this.iso.anchor.set(0.5);
		this.iso.pivot.y = -5;

		this.iso.body.widthX = 18;
    this.iso.body.widthY = 18;
    this.iso.body.collideWorldBounds = false;
		this.iso.body.allowGravity = false;
  }

  isAboveObj(obj, player) {
    return (
      this.iso.body.position.x < obj.isoX + obj.body.widthX &&
      this.iso.body.position.x-2 > obj.isoX - 22 &&
      this.iso.body.position.y < obj.isoY + obj.body.widthY &&
      this.iso.body.position.y-2 > obj.isoY - 22 &&
      player.body.position.z > obj.isoZ
    )
  }

  update(player) {
    var zz = 0;
    this.iso.body.position.x = player.body.position.x;
    this.iso.body.position.y = player.body.position.y;

    groups.water.forEach((obj) => {
      if (this.isAboveObj(obj, player) && obj.isoZ + 4 > zz) {
        zz = obj.isoZ + 4;
      }
    });

    collidables.forEach((obj) => {
      if (this.isAboveObj(obj, player) && obj.isoZ + 4 > zz) {
        zz = obj.isoZ + 27;
      }
    })

    groups.walls.forEach((obj) => {
      if (this.isAboveObj(obj, player)) {
        if (obj.key == 'slope') {
          if (obj.direction == 'down') {
            var x = (obj.isoX - player.body.position.x);
            var z = Math.floor(obj.isoZ + 37 + Math.min(0,(x / 44) * 31));
          }
          if (obj.direction == 'up') {
            var x = (obj.isoX - (player.body.position.x+20)) * -1;
            var z = Math.floor(obj.isoZ + 10 + Math.min(28,(x / 44) * 31));
          }
          if (obj.direction == 'left') {
            var x = (obj.isoY - player.body.position.y);
            var z = Math.floor(obj.isoZ + 37 + Math.min(0,(x / 44) * 31));
          }
          if (obj.direction == 'right') {
            var x = (obj.isoY - (player.body.position.y+20)) * -1;
            var z = Math.floor(obj.isoZ + 10 + Math.min(28,(x / 44) * 31));
          }

          if (z > zz) {
            zz = z;
          }
        }
        else if (obj.key == 'wall' && obj.isoZ + 31 > zz) {
          zz = obj.isoZ + 31;
        }
      }
    })

    if (zz <= player.body.position.z) {
      this.iso.body.position.z = zz;
    }
    else {
      this.iso.body.position.z = player.body.position.z;
    }
  }
}