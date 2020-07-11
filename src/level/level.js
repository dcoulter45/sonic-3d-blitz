const TILE_WIDTH = 44
const TILE_HEIGHT = 30

function loadLevel() {
  var levelIndex = parseInt(game.save.data.level) || 0
  var levelName = levels[levelIndex].name + "-Act1"

  level = game.cache.getJSON(levelName)
  level.rings = 0

  playLevelTrack(levels[levelIndex])
  
  var tileLayers = []
  var levelWidth = level.width * TILE_WIDTH * 10
  var levelHeight = level.height * TILE_WIDTH * 10
  // game.world.setBounds(0, 0, levelWidth, levelHeight)
  game.camera.bounds = null

  if (levelName.includes("Polar")) {
    new Snow()
  }
  
  new Background(levels[levelIndex].name)

  level.layers.forEach((layer) => delegateLayer(layer, tileLayers))
  
  // groups.tiles.cacheAsBitmap = true

  renderObjectsInView()
  renderTiles(tileLayers)
}

function delegateLayer(layer, tileLayers) {
  if (layer.type === "group") {
    layer.layers.forEach((layer) => delegateLayer(layer, tileLayers))
  }
  if (layer.type === "tilelayer") {
    // renderTiles(layer)
    // if (layer.name.includes("Background")) {
    //   renderBackgroundTiles(layer)
    // } else {
      tileLayers.push(layer)
    //}
  }

  if (layer.type === "objectgroup") {
    renderObjects(layer)
  }
}

