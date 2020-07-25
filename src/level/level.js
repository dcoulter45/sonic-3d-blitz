
function loadLevel() {
  var levelIndex = parseInt(game.save.data.level) || 0
  var levelName = levels[levelIndex].name + "-Act1"

  level = game.cache.getJSON(levelName)
  level.rings = 0

  playLevelTrack(levels[levelIndex])
  
  level.tileLayers = []

  game.camera.bounds = null

  if (levelName.includes("Polar")) {
    new Snow()
  }
  
  new Background(levels[levelIndex].name)

  level.layers.forEach((layer) => delegateLayer(layer))
  
  // groups.tiles.cacheAsBitmap = true

  renderObjectsInView()
  renderTiles()
}

function delegateLayer(layer) {
  if (layer.type === "group") {
    layer.layers.forEach((layer) => delegateLayer(layer))
  }

  if (layer.type === "tilelayer") {
    level.tileLayers.push(layer)
  }

  if (layer.type === "objectgroup") {
    renderObjects(layer)
  }
}

