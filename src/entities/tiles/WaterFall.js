WaterFall = class WaterFall {
  constructor(wx, wy, x, y, z, obj) {

    if (wy > wx) {
      this.renderY(wx, wy, x, y, z)
    } else {
      this.renderX(wx, wy, x, y, z)
    }
  }

  renderY(wx, wy, x, y, z) {
    var tiles = wy / TILE_WIDTH

    for (var i = 0; i < tiles; i++) {
      var yy = y + (i * TILE_WIDTH) + 2
      this.renderTile(x - 19, yy, z - 116, "y")
    }
  }

  renderX(wx, wy, x, y, z) {
    var tiles = wx / TILE_WIDTH

    for (var i = 0; i < tiles; i++) {
      var xx = x + (i * TILE_WIDTH) + 2
      this.renderTile(xx, y - 19, z - 116, "x")
    }
  }

  renderTile(x, y, z, direction) {
    var frames = direction === "y" ? [5, 4, 3, 2, 1, 0] : [10, 9, 8, 7, 6]
    var waterFall = game.add.isoSprite(x, y, z, "waterfall", frames[0], groups.objects)

    waterFall.animations.add('default', frames, 4, true);
    waterFall.animations.play('default');
    waterFall.anchor.set(0.5)
  }
}