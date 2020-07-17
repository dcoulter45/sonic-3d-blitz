Wall = class Wall {

  constructor(wx, wy, x, y, z, obj) {
    this.height = getProp("height", obj, 10)

    this.iso = game.add.isoSprite(x, y, 0, null, 0, groups.walls);

    enablePhysics(this.iso)

    this.iso.key = "wall";

    this.iso.body.widthY = wy;
    this.iso.body.widthX = wx;
    this.iso.body.height = this.height * TILE_HEIGHT;

    this.iso.overlap = this.overlap.bind(this)
  }

  overlap(obj) {
    if (obj.key === "player") {
      game.physics.isoArcade.collide(player.iso, this.iso)
    }
  }
}