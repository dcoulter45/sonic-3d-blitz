Raft = class Raft {
  
  constructor(wx, wy, x, y, z, obj) {
    this.axis = wy > wx ? "x" : "y"
    this.direction = getProp("direction", obj, "down")
    this.distance = getProp("distance", obj, 4)

    this.endX = y + (this.distance * TILE_WIDTH)
    this.endY = x + (this.distance * TILE_WIDTH)

    this.iso = game.add.isoSprite(x, y, z - 40, "raft", 1, groups.objects)
    this.iso.anchor.set(0.5)

    game.physics.isoArcade.enable(this.iso)

    this.iso.body.allowGravity = false
    this.iso.body.immovable = true
    this.iso.moving = false

    this.iso.body.widthX = this.axis === "x" ? 60 : 100
    this.iso.body.widthY = this.axis === "x" ? 100 : 60
    this.iso.pivot.x = this.axis === "x" ? 20 : - 20

    this.iso.body.maxVelocity.x = 50
    this.iso.body.maxVelocity.y = 50

    groups.collide.push(this.iso)

    this.iso.collide = (obj) => {
      if (this.iso.moving === false) {
        this.startMoving()
      }
    }

    this.iso.update = this.update.bind(this)

    groups.collide.push(this.iso)
  }

  update() {
    if (this.axis === "x" && this.iso.body.position.x >= this.endX) {
      this.iso.body.velocity.x = 0
      this.iso.body.acceleration.x = 0
    } 
    else if (this.axis === "y" && this.iso.body.position.y >= this.endY) {
      this.iso.body.velocity.y = 0
      this.iso.body.acceleration.y = 0
    }
  }

  startMoving() {
    this.iso.moving = true

    if (this.axis === "x") {
      this.iso.body.acceleration.x = 50
    } else {
      this.iso.body.acceleration.y = 50
    }
  }
}