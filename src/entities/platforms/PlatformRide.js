PlatformRide = class PlatformRide {
  
  tiles = []
  moving = false

  constructor(wx, wy, x, y, z, obj) {

    this.tileId = getProp("tileId", obj, 90)
    this.axis = getProp("axis", obj, null)
    this.velocity = getProp("velocity", obj, 50)
    this.distance = getProp("distance", obj, 10)
    
    this.iso = game.add.isoSprite(x, y, z - 25, null, 0, groups.walls)

    this.start = { x, y }
    this.end = { x, y }

    if (this.velocity < 0) {
      this.end[this.axis] = this.start[this.axis] - this.distance * TILE_WIDTH
    } else if (this.velocity > 0) {
      this.end[this.axis] = this.start[this.axis] + this.distance * TILE_WIDTH
    }

    enablePhysics(this.iso)

    this.iso.key = "platform"
    this.iso.body.height = 30
    this.iso.body.widthX = wx
    this.iso.body.widthY = wy

    this.iso.collide = this.collide.bind(this)
    this.iso.update = this.update.bind(this)

    this.tiles = createTiles(this.tileId, wx, wy, x, y, z)
  }

  collide(obj) {
    if (obj.key === "player" && !this.moving) {
      this.moving = true
      this.iso.body.velocity[this.axis] = this.velocity
    }
  }

  update() {
    if (
      (this.velocity > 0 && this.iso.body.position[this.axis] >= this.end[this.axis]) 
      || (this.velocity < 0 && this.iso.body.position[this.axis] <= this.end[this.axis])
    ) {
      this.iso.body.velocity = { x: 0, y: 0 }
    }

    this.tiles.forEach((tile) => {
      tile.isoX = this.iso.body.position.x - tile.offsetXX
      tile.isoY = this.iso.body.position.y - tile.offsetYY
      tile.isoZ = this.iso.body.position.z - 8
    })
  }
}