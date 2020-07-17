const TILE_WIDTH = 44
const TILE_HEIGHT = 30
const RENDER_DISTANCE = 40 * TILE_WIDTH
var activeChunks = []

function renderTiles(layers) {

  // Remove active chunks when too far
  activeChunks.forEach((chunk, index) => {
    var chunkX = chunk.x * TILE_WIDTH
    var chunkY = chunk.y * TILE_WIDTH
    var distance = game.physics.isoArcade.distanceToXY(player.iso.body, chunkX, chunkY)

    if (distance >= RENDER_DISTANCE) {
      chunk.tiles.forEach((tile) => tile.destroy())
      chunk.tiles = []
      chunk.active = false
      activeChunks.splice(index, 1)
    }
  })

  // Search layers for chunks to render
  layers.forEach((layer) => {
    var zz = layer.offsety ? layer.offsety * -1 : 0

    layer.chunks.forEach((chunk) => {
      var chunkX = chunk.x * TILE_WIDTH
      var chunkY = chunk.y * TILE_WIDTH
      var distance = game.physics.isoArcade.distanceToXY(player.iso.body, chunkX, chunkY)

      // Render chunk if inactive and within render distance
      if (distance < RENDER_DISTANCE && !chunk.active) {
        chunk.active = true
        chunk.tiles = []
        activeChunks.push(chunk)
        var index = 0

        for (var y = 0; y < chunk.height; y++) {
          for(var x = 0; x < chunk.width; x++) {
            var tileIndex = chunk.data[index] - 1
            var xx = (x + chunk.x) * TILE_WIDTH
            var yy = (y + chunk.y) * TILE_WIDTH

            renderTile(xx, yy, zz, tileIndex, chunk, layer)

            index ++
          }
        }
      }
    })
  })

  groups.tiles.sort("depth")

  game.time.events.add(Phaser.Timer.SECOND * 3, () => renderTiles(layers));
}

function renderTile(x, y, z, tileIndex, chunk, layer) {
  if (tileIndex >= 0) {
    var group = layer.name.includes("Background") ? groups.tiles : groups.objects

    // Water tiles
    if (tileIndex >= 162) {
      var tile = new Water(x, y, z, tileIndex, group);

      chunk.tiles.push(tile.iso)
    } 
    // Static Tiles
    else {
      var tile = game.add.isoSprite(
        x, y, z, 
        "tiles", 
        tileIndex, 
        group
      )
      tile.anchor.set(0.5)

      chunk.tiles.push(tile)
    }
  }
}
