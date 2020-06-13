function createTiles(tileId, wx, wy, offsetX, offsetY, z) {
  var tiles = []
  var xx = offsetX + wx
  var yy = offsetY + wy

  for (var x = offsetX; x < xx; x += TILE_WIDTH) {
    for (var y = offsetY; y < yy; y += TILE_WIDTH ) {
      var tile = game.add.isoSprite(x, y, z - 30, "tiles", tileId, groups.objects)

      tile.offsetXX = offsetX - x
      tile.offsetYY = offsetY - y
      tile.anchor.set(0.5)
      tiles.push(tile)

      tile.shadow = game.add.isoSprite(x, y, z, "tiles", 49, groups.objects)
      tile.shadow.pivot.set(0.5)
      new Shadow(tile.shadow, tile, true, ["platform"])
    }
  }

  return tiles
}
