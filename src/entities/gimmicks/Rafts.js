Rafts = class Rafts {
  constructor(wx, wy, x, y, z, obj) {
    this.axis = wy < wx ? "x" : "y"
    this.endPoint = this.axis === "x" ?  x + wx : y + wy
    this.delay = getProp("delay", obj, 0)

    game.time.events.add(this.delay, () => {
      this.createRaft(x, y, z)
    })
  }

  createRaft(x, y, z) {
    var tileId = this.axis === "x" ? 0 : 1
    var raft = game.add.isoSprite(x, y, z - 50, "raft", tileId, groups.objects)

    raft.anchor.set(0.5)

    game.physics.isoArcade.enable(raft)

    raft.body.allowGravity = false
    raft.body.immovable = true

    raft.body.widthX = this.axis === "y" ? 60 : 100
    raft.body.widthY = this.axis === "y" ? 100 : 60
    raft.pivot.x = this.axis === "y" ? 20 : - 20
    raft.body.velocity[this.axis] = 50

    groups.collide.push(raft)

    raft.update = () => {
      if (raft.body.position[this.axis] > this.endPoint) {
        raft.destroy()
      }
    }

    game.time.events.add(3000, () => {
      this.createRaft(x, y, z)
    })
  }
}