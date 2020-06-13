const TILE_WIDTH = 44
const TILE_HEIGHT = 30

function loadLevel() {
  level = game.cache.getJSON(stateParams.activeLevel)
  level.rings = 0

  playLevelTrack(level)
  
  var tileLayers = []
  var levelWidth = level.width * TILE_WIDTH * 10
  var levelHeight = level.height * TILE_WIDTH * 10
  // game.world.setBounds(0, 0, levelWidth, levelHeight)
  game.camera.bounds = null

  if (stateParams.activeLevel.includes("Polar")) {
    new Snow()
  }

  new Background(level)

  level.layers.forEach((layer) => delegateLayer(layer, tileLayers))

  groups.tiles.sort("depth")
  groups.tiles.cacheAsBitmap = true

  renderObjectsInView()
  renderTiles(tileLayers)
}

function delegateLayer(layer, tileLayers) {
  if (layer.type === "group") {
    layer.layers.forEach((layer) => delegateLayer(layer, tileLayers))
  }
  if (layer.type === "tilelayer") {
    // renderTiles(layer)
    if (layer.name.includes("Background")) {
      renderBackgroundTiles(layer)
    } else {
      tileLayers.push(layer)
    }
  }

  if (layer.type === "objectgroup") {
    renderObjects(layer)
  }
}

