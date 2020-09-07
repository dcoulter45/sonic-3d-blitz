Crusher = class Crusher extends RenderInView {
  
  tiles = []
  state = "rising" // rising - crushing

  constructor(wx, wy, x, y, z, obj) {
    super(wx, wy, x, y, z, obj)

    this.delay = getProp("delay", obj, 0)
    
    game.time.events.add(this.delay, () => {
      game.time.events.loop(3000, this.rise, this);
    }, this)
  }

  render() {
    var { wx, wy, x, y, z } = this.props

    this.iso = game.add.isoSprite(x, y, z, null, 0, groups.objects)

    enablePhysics(this.iso)
    groups.collide.push(this.iso)
    groups.overlap.push(this.iso)

    this.iso.body.widthX = wx
    this.iso.body.widthY = wy
    this.iso.body.height = 90

    this.iso.collide = this.collide.bind(this)
    this.iso.update = this.update.bind(this)

    this.createTiles(wx, wy, x, y, z)

    this.riseTween = game.add
      .tween(this.iso.body.position)
      .to({z: z + 90}, 2500, "Linear", false)

    this.riseTween.onComplete.add(this.crush, this)

    this.crushTween = game.add
      .tween(this.iso.body.position)
      .to({z: z}, 200, "Linear", false)
  }

  hide() {
    removeFromGroup(groups.overlap, this.iso)
    removeFromGroup(groups.collide, this.iso)
    this.iso.destroy()
  
    this.tiles.forEach((tile) => {
      tile.destroy()
    })
  }

  rise() {
    if (this.visible) {
      this.state = "rising"
      this.riseTween.start()
    }
  }

  crush() {
    if (this.visible) {
      this.state = "crushing"
      this.crushTween.start()
    }
  }

  createTiles(wx, wy, offsetX, offsetY, offsetZ) {
    var xx = offsetX + wx
    var yy = offsetY + wy
    var zz = offsetZ + 90

    for (var x = offsetX; x < xx; x += TILE_WIDTH) {
      for (var y = offsetY; y < yy; y += TILE_WIDTH ) {
        for (var z = offsetZ; z < zz; z += TILE_HEIGHT) {
          var tile = game.add.isoSprite(x, y, z, "tiles", 55, groups.objects)

          tile.offsetZZ = offsetZ - z
          tile.anchor.set(0.5)
          this.tiles.push(tile)
        }
      }
    }
  }

  update() {
    this.tiles.forEach((tile) => {
      tile.isoZ = this.iso.body.position.z - tile.offsetZZ
    })
  }

  collide(obj) {
    if (
      obj.key === "player"
      && this.state === "crushing"
      && player.onFloor()
      && player.iso.body.position.y < this.iso.body.position.y + this.iso.body.widthY
      && player.iso.body.position.y > this.iso.body.position.y
      && player.iso.body.position.x < this.iso.body.position.x + this.iso.body.widthX
      && player.iso.body.position.x > this.iso.body.position.x
    ) {
      player.die("squashed")
    }
  }
}