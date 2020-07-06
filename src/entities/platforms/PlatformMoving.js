PlatformMoving = class PlatformMoving extends RenderInView {
  
  tiles = []

  constructor(wx, wy, x, y, z, obj) {
    super(wx, wy, x, y, z, obj)

    this.tileId = getProp("tileId", obj, 90)
    this.axis = getProp("axis", obj, null)
    this.distance = getProp("distance", obj, 2)
    this.velocity = getProp("velocity", obj, 50)

    this.start = { x, y, z: z - 30 }
    this.end = { x, y, z: z - 30 }

    this.moveTo = "start"

    if (this.velocity < 0) {
      this.start[this.axis] = this.start[this.axis] - this.distance * TILE_WIDTH
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

    this.tiles = createTiles(this.tileId, wx, wy, x, y, z)
  }

  hide() {
    this.tiles.forEach((tile) => {
      tile.destroy()
      tile.shadow.destroy()
    })
    this.iso.destroy()
  }

  move() {
    if (this.moveTo === "end") {
      this.moveTo = "start"

      if (this.iso) {
        this.iso.body.velocity[this.axis] = this.velocity
      }
    }
    else if (this.moveTo === "start") {
      this.moveTo = "end"
      
      if (this.iso) {
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
    //   this.velocity = 0
    // }

    // if (this.inverted &&
    //   ((v > 0 && px >= this.start[this.axis]) || (v < 0 && px <= this.end[this.axis]))
    // ) {
    //   this.velocity = 0
    // }

    if (
      this.iso.body.position[this.axis] < this.start[this.axis]
      || this.iso.body.position[this.axis] > this.end[this.axis]
    ) { 
      this.iso.body.velocity[this.axis] = 0 //this.iso.body.velocity[this.axis] * -1
    } 

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