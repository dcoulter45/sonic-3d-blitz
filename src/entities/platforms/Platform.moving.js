PlatformMoving = class PlatformMoving extends RenderInView {
  
  tiles = []

  constructor(wx, wy, x, y, z, obj) {
    super(wx, wy, x, y, z, obj)

    this.tileId = getProp("tileId", obj, 90)
    this.axis = getProp("axis", obj, null)
    this.distance = getProp("distance", obj, 2)
    this.velocity = getProp("velocity", obj, 50)
    this.moveTo = "end"

    this.start = { x, y, z: z - 30 }
    this.end = { x, y, z: z - 30 }

    if (this.velocity < 0) {
      this.end[this.axis] = this.start[this.axis] - this.distance * TILE_WIDTH
    } else if (this.velocity > 0) {
      this.end[this.axis] = this.start[this.axis] + this.distance * TILE_WIDTH
    }

    this.move()
  }

  render() {
    var { wx, wy, x, y, z, obj } = this.props

    this.iso = game.add.isoSprite(x, y, z - 25, null, 0, groups.walls)

    enablePhysics(this.iso)

    this.iso.key = "platform"
    this.iso.body.height = 30
    this.iso.body.widthX = wx
    this.iso.body.widthY = wy

    this.iso.update = this.update.bind(this)

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

        tile.shadow = game.add.isoSprite(x, y, z, "tiles", 49, groups.objects)
        tile.shadow.pivot.set(0.5)
        new Shadow(tile.shadow, tile)
      }
    }
  }

  hide() {
    this.tiles.forEach((tile) => {
      tile.destroy()
      tile.shadow.destroy()
    })
    this.iso.destroy()
  }

  move() {
    if (this.iso) {
      if (this.moveTo === "end") {
        this.moveTo = "start"
        this.iso.body.velocity[this.axis] = this.velocity
      }
      else if (this.moveTo === "start") {
        this.moveTo = "end"
        this.iso.body.velocity[this.axis] = this.velocity * -1
      }
    }

    game.time.events.add(2000, () => this.move())
  }

  update() {
    // After reaching a certain, swap direction
    // var v = this.iso.body.velocity[this.axis]
    // var px = this.iso.body.position[this.axis]

    // if (!this.inverted &&
    //   ((v > 0 && px >= this.end[this.axis]) || (v < 0 && px <= this.start[this.axis]))
    // ) {
    //   this.velocity = this.velocity * -1
    // }

    // if (this.inverted &&
    //   ((v > 0 && px >= this.start[this.axis]) || (v < 0 && px <= this.end[this.axis]))
    // ) {
    //   this.velocity = this.velocity * -1
    // }

    this.tiles.forEach((tile) => {
      tile.isoX = this.iso.body.position.x - tile.offsetXX
      tile.isoY = this.iso.body.position.y - tile.offsetYY
      tile.isoZ = this.iso.body.position.z - 8
    })
    
    // Set velocity
    // setVelocity(this.iso, this.axis, this.velocity)
    
    // this.shadow.isoX = this.iso.body.position.x
    // this.shadow.isoY = this.iso.body.position.y
  }
}