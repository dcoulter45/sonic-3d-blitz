const WORLD_THRESHOLD = 240

class PlayerCamera {
  constructor(x, y, z) {
    this.iso = game.add.isoSprite(x, y, z, null, 0)

    this.iso.anchor.set(0.5);

    game.physics.isoArcade.enable(this.iso);
    game.camera.follow(this.iso)

    this.iso.body.allowGravity = false;
    this.iso.body.widthX = 18
    this.iso.body.widthY = 18

    this.iso.update = this.update.bind(this)
  }

  update() {
    var Y_UPPER_THRESHOLD = (level.height * TILE_WIDTH) - WORLD_THRESHOLD
    var X_UPPER_THRESHOLD = (level.width * TILE_WIDTH) - WORLD_THRESHOLD

    if (player.iso.body.position.x < X_UPPER_THRESHOLD) {
      this.iso.body.position.x = player.iso.body.position.x
    }

    if (player.iso.body.position.y < Y_UPPER_THRESHOLD) {
      this.iso.body.position.y = player.iso.body.position.y
    }
    
    this.iso.body.position.z = player.iso.body.position.z
  }
}