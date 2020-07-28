function createTiles(tileId, wx, wy, offsetX, offsetY, z, options = { shadow: true, hollow: false }) {
  var tiles = [];
  var xx = offsetX + wx;
  var yy = offsetY + wy;

  for (var x = offsetX; x < xx; x += TILE_WIDTH) {
    for (var y = offsetY; y < yy; y += TILE_WIDTH) {
      if (options.hollow && x < xx - TILE_WIDTH && y < yy - TILE_WIDTH) {
        // do nothing
      } else {
        var tile = game.add.isoSprite(x, y, z - 30, "tiles", tileId, groups.objects);

        tile.offsetXX = offsetX - x;
        tile.offsetYY = offsetY - y;
        tile.anchor.set(0.5);
        tiles.push(tile);

        // if (options.shadow) {
        //   tile.shadow = game.add.isoSprite(x, y, z, "tiles", 21, groups.objects)
        //   tile.shadow.pivot.set(0.5)
        //   new Shadow(tile.shadow, tile, true, ["platform"])
        // }
      }
    }
  }

  return tiles;
}
