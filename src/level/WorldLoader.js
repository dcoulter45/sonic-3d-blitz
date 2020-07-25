WorldLoader = class WorldLoader {

  state = "idle"

  constructor(wx, wy, x, y, z, obj) {

    this.offsetX = (x / TILE_WIDTH) + getProp("offsetX", obj, 0)
    this.offsetY = (y / TILE_WIDTH) + getProp("offsetY", obj, 0)

    this.iso = game.add.isoSprite(x, y, z, null)

    enablePhysics(this.iso)
    groups.overlap.push(this.iso)

    this.iso.body.widthX = wx
    this.iso.body.widthY = wy
    this.iso.body.height = TILE_HEIGHT * 10

    this.iso.collide = this.collide.bind(this)
  }

  collide(obj) {
    if (obj.key === "player" && this.state === "idle") {
      this.state = "loading"
      
      var level =  JSON.parse(JSON.stringify(game.cache.getJSON("DeathEgg-Boss")))

      level.layers.forEach((layer) => this.delegateLayer(layer))
    }
  }

  delegateLayer(layer) {
    if (layer.type === "group") {
      layer.layers.forEach((layer) => this.delegateLayer(layer))
    }
  
    if (layer.type === "tilelayer") {
      layer.x = this.offsetX
      layer.y = this.offsetY

      level.tileLayers.push(layer)
    }
    if (layer.type === "objectgroup") {
      layer.objects.forEach((object) => {
        object.x += (this.offsetX * 40)
        object.y += (this.offsetY * 40)
      })

      renderObjects(layer)
    }
  }
}