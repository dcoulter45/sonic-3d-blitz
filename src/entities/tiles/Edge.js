Edge = class Edge {
  constructor(wx, wy, x, y, z, obj) {
    var xCount = wx / TILE_WIDTH
    var yCount = wy / TILE_WIDTH
    var tileId = getProp("tileId", obj, 0)

    for (var xx = 0; xx < xCount; xx++) {
      for (var yy = 0; yy < yCount; yy++) {
        var xxx = (xx * TILE_WIDTH) + x
        var yyy = (yy * TILE_WIDTH) + y

        var wall = game.add.isoSprite(xxx, yyy, -135, "walls", tileId, groups.tiles)       
        wall.anchor.set(0.5)
      }
    }
  }
}
