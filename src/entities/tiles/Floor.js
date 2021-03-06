Floor = class Floor {
  constructor(wx, wy, x, y, z, obj) {
    this.iso = game.add.isoSprite(x, y, z - 85, null, 0, groups.walls);

    game.physics.isoArcade.enable(this.iso);

    this.iso.key = "floor";
    this.iso.anchor.set(0.5);
    this.iso.body.widthY = wy;
    this.iso.body.widthX = wx;
    this.iso.body.height = TILE_HEIGHT * 3;

    this.iso.body.immovable = true;
    this.iso.body.allowGravity = false;
    this.iso.body.collideWorldBounds = false;

    this.iso.overlap = this.overlap.bind(this)
  }

  overlap(obj) {
    if (obj.key === "player") {
      game.physics.isoArcade.collide(player.iso, this.iso)
    }
  }
}