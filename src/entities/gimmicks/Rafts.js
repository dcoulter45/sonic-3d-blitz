Rafts = class Rafts {
  constructor(wx, wy, x, y, z, obj) {
    this.axis = wy < wx ? "x" : "y"
    this.endPoint = this.axis === "x" ?  x + wx : y + wy
    this.delay = getProp("delay", obj, 0)

    game.time.events.add(this.delay, () => {
      this.createRaft(x, y, z)
    }, this)
  }

  createRaft(x, y, z) {
    var tileId = this.axis === "x" ? 0 : 1
    var raft = game.add.isoSprite(x, y, z - 28, null, 0, groups.walls)
    
    enablePhysics(raft)

    raft.body.widthX = this.axis === "y" ? 60 : 100
    raft.body.widthY = this.axis === "y" ? 100 : 60
    raft.body.height = 30
    raft.body.velocity[this.axis] = 50

    var sprite = game.add.isoSprite(x, y, z - 48, "raft", tileId, groups.objects)
    sprite.pivot.x = 18
    sprite.pivot.y = 8
    sprite.anchor.set(0.5)

    raft.update = () => {
      sprite.isoX = raft.isoX
      sprite.isoY = raft.isoY
      
      if (raft.body.position[this.axis] > this.endPoint) {
        raft.destroy()  
        sprite.destroy()
      }
    }

    game.time.events.add(3000, () => {
      this.createRaft(x, y, z)
    }, this)
  }
}