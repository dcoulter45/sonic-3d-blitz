RumbleFloor = class RumbleFloor {
  tiles = []
  triggerDistance = 300
  triggerDelay = 1000

  constructor(wx, wy, x, y, z, obj) {
    this.tileId = getProp("tileId", obj, 5)

    this.x = x
    this.y = y
    this.z = z
    this.iso = { body: { position: { x: x + 44, y: y + 44, z} } }
    
    this.addTile(x, y, z)
    this.addTile(x + 44, y, z)
    this.addTile(x, y + 44, z)
    this.addTile(x + 44, y + 44, z)

    this.checkPlayerPosition()
  }

  checkPlayerPosition() {
    var distance = getDistanceBetween(player.iso, this.iso)

    if (distance < this.triggerDistance) {
      this.start()
    } else {
      game.time.events.add(200, this.checkPlayerPosition, this)
    }
  }

  addTile(x, y, z) {
    var tile = game.add.isoSprite(x, y, z - 30, "tiles", this.tileId, groups.objects)
    tile.anchor.set(0.5)
    this.tiles.push(tile)
  }

  start() {
    // Create wiggle tween for tiles
    this.tiles.forEach((tile) => this.wiggle(tile))

    // Create lava plume
    game.time.events.add(this.triggerDelay, () => {
      new LavaPlume(null, null, this.x + 22, this.y + 22, this.z, {
        properties: [{name: "instantPlume", value: true}]
      })
    })
  }
  
  wiggle(tile) {
    var wiggleRoom = 5
    var delay = randomInteger(0, 500)

    game.time.events.add(delay, () => {
      tile.isoZ += wiggleRoom

      tile.wiggleTween = game.add.tween(tile).to({ isoZ: tile.isoZ + wiggleRoom}, 1000, function (k) {
        return wiggle(k, 1, 2);
      }, true, 0, -1);
    })
  
    game.time.events.add(this.triggerDelay, () => this.errupt(tile))
  }

  errupt(tile) {
    tile.wiggleTween.stop()
    
    var tween = game.add.tween(tile).to({isoZ: 200}, 500, "Linear", true)
    tween.onComplete.add(() => tile.destroy())
  }
}