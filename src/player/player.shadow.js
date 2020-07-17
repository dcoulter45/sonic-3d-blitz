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

  isAboveObj(obj) {
    return (
      this.iso.body.position.x < obj.isoX + obj.body.widthX &&
      this.iso.body.position.x-2 > obj.isoX - 22 &&
      this.iso.body.position.y < obj.isoY + obj.body.widthY &&
      this.iso.body.position.y-2 > obj.isoY - 22 &&
      player.iso.body.position.z > obj.isoZ
    )
  }

  update() {
    var zz = -300;
    this.iso.body.position.x = player.iso.body.position.x;
    this.iso.body.position.y = player.iso.body.position.y;

    // groups.collide.forEach((obj) => {
    //   if (this.isAboveObj(obj, player.iso) && obj.isoZ + 4 > zz) {
    //     zz = obj.isoZ + 27;
    //   }
    // })

    groups.walls.forEach((obj) => {
      if (this.isAboveObj(obj, player.iso)) {
        if (obj.key == 'slope') {
          var z = getSlopePos(player.iso, obj)

          if (z > zz) {
            zz = z;
          }
        }
        else if (obj.isoZ + obj.body.height > zz) {
          zz = obj.isoZ + obj.body.height
        }
      }
    })

    if (zz <= player.iso.body.position.z) {
      this.iso.body.position.z = zz;
    }
    else {
      this.iso.body.position.z = player.iso.body.position.z;
    }
  }
}