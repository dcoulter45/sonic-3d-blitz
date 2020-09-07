PlatformWobble = class PlatformWobble {

  tiles = []
  active = false

  constructor(wx, wy, x, y, z, obj) {

    this.iso = game.add.isoSprite(x, y, z - 25, null, 0, groups.walls)
    this.delay = getProp("delay", obj, 500)
    this.tileId = getProp("tileId", obj, 193)

    enablePhysics(this.iso)

    this.iso.collide = this.collide.bind(this)

    this.iso.key = "platform"
    this.iso.body.height = 30
    this.iso.body.widthX = wx
    this.iso.body.widthY = wy

    this.createTiles(wx, wy, x, y, z)
  }
  
  
  createTiles(wx, wy, offsetX, offsetY, z) {
    var xx = offsetX + wx
    var yy = offsetY + wy

    for (var x = offsetX; x < xx; x += TILE_WIDTH) {
      for (var y = offsetY; y < yy; y += TILE_WIDTH ) {
        var tile = game.add.isoSprite(x, y, z - 30, "tiles", this.tileId, groups.objects)

        tile.offsetXX = offsetX - x
        tile.offsetYY = offsetY - y
        tile.anchor.set(0.5)
        this.tiles.push(tile)
      }
    }
  }

  collide(obj) {
    if (obj.key === "player" && !this.active) {
      this.active = true

      this.tiles.forEach((tile) => {
        game.add.tween(tile).to({ isoX: tile.isoX + 5}, 500, function (k) {
          return wiggle(k, 1, 2);
        }, true);
      })

      game.time.events.add(this.delay, () => {
        this.iso.destroy()

        this.tiles.forEach((tile) => {
          game.add.tween(tile).to({ isoZ: -30 }, 500, Phaser.Easing.Linear.None, true);
          game.time.events.add(500, () => tile.destroy())
        })
      }, this)
    }
  }
}