Wall = class Wall {

  constructor(wx, wy, x, y, z, obj) {
    this.height = getProp("height", obj, 10)
    this.tileId = getProp("tileId", obj, null)

    if (this.tileId) {
      this.createWallTexture(wx, wy, x, y, z, obj)
    }

    this.createInvisibleWall(wx, wy, x, y, z, obj)
  }

  createWallTexture(wx, wy, x, y, z, obj) {
    var xCount = wx / TILE_WIDTH
    var yCount = wy / TILE_WIDTH

    for (var xx = 0; xx < xCount; xx++) {
      for (var yy = 0; yy < yCount; yy++) {
        var xxx = (xx * TILE_WIDTH) + x
        var yyy = (yy * TILE_WIDTH) + y

        var wall = game.add.isoSprite(xxx, yyy, 0, "walls", obj.properties.tileId, groups.objects)       
        wall.anchor.set(0.5)
        wall.pivot.y = 75
      }
    }
  }

  createInvisibleWall(wx, wy, x, y, z, obj) {
    var wall = game.add.isoSprite(x, y, 0, null, 0, groups.walls);

    game.physics.isoArcade.enable(wall);

    wall.key = "wall";
    wall.anchor.set(0.5);
    wall.body.widthY = wy;
    wall.body.widthX = wx;
    wall.body.height = this.height * TILE_HEIGHT;

    wall.body.allowGravity = false
    wall.body.immovable = true
  }
}