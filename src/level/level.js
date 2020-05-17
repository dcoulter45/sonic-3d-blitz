const TILE_WIDTH = 44
const TILE_HEIGHT = 44

function loadLevel() {
  var level = game.cache.getJSON(activeLevel)

  playLevelTrack(level)

  var levelWidth = level.width * TILE_WIDTH * 2
  var levelHeight = level.height * TILE_WIDTH * 2
  game.world.setBounds(0, 0, levelWidth, levelHeight)

  var background = game.add.sprite(0, 0, "blueSky", 0, groups.tiles)
  background.fixedToCamera = true

  level.layers.forEach((layer) => {
    if (layer.type === "tilelayer") {
      renderTiles(layer)
    }

    if (layer.type === "objectgroup") {
      renderObjects(layer)
    }
  })

  // groups.walls.cacheAsBitmap = true;
}

function renderTiles(layer) {
  var index = 0;
  var zz = layer.offsety ? layer.offsety*-1 : 0

  for(var y = 0; y < layer.height; y++) {
    for(var x = 0; x < layer.width; x++) {
      var tileIndex = layer.data[index] - 1
      var xx = x * TILE_WIDTH
      var yy = y * TILE_WIDTH

      // Water tiles
      if (tileIndex >= 40 && tileIndex <= 46) {
        var tile = new Water(xx, yy, zz, tileIndex);
      } 
      // Static Tiles
      else if (tileIndex >= 0) {
        var tile = game.add.isoSprite(xx, yy, zz, "tiles", tileIndex, groups.objects)
        tile.anchor.set(0.5)
      }

      index++
    }
  }
}

function renderObjects(layer) {
  var z = layer.offsety ? layer.offsety*-1 : 0

  layer.objects.forEach((obj) => {
    if (obj.name) {
      // Fix iso vs tiled rendering issue
      var x = (obj.x / 40) * 44;
      var y = (obj.y / 40) * 44;
      var wx = (obj.width / 40) * 44;
      var wy = (obj.height / 40) * 44;
  
      new window[obj.name](wx, wy, x, y, z, obj);
    }
  });
}