var endZones = []

SpikeWall = class SpikeWall {
  walls = []
  moving = false

  constructor(wx, wy, x, y, z, obj) {
    this.axis = wx > wy ? "x" : "y"
    this.maxVelocity = getProp("maxVelocity", obj, 225)

    for(var i = 0; i < 4; i++) {
      this.createWall(x, y, z, i)
    }

    this.dectectionZone = game.add.isoSprite(x, y, z + 5, null)

    enablePhysics(this.dectectionZone)
    groups.overlap.push(this.dectectionZone)

    this.dectectionZone.body.widthX = wx
    this.dectectionZone.body.widthY = wy
    this.dectectionZone.body.height = 90

    this.dectectionZone.collide = (obj) => this.activate(obj)
  }

  createWall(x, y, z, i) {
    var yy = this.axis === "x" ? y + (i * TILE_WIDTH) : y
    var xx = this.axis === "y" ? x + (i * TILE_WIDTH) : x

    var frame = this.axis === "x" ? 0 : 1
    var wall = game.add.isoSprite(xx, yy, z + 28, "spikeWall", frame, groups.objects)

    enablePhysics(wall)
    groups.collide.push(wall)

    wall.key = "spikeWall"

    if (this.axis === "x") {
      wall.body.widthY = 44
      wall.body.widthX = 55
    }
    else {
      wall.body.widthY = 55
      wall.body.widthX = 44
    }

    wall.body.height = 90
    wall.body.maxVelocity = {
      x: this.maxVelocity,
      y: this.maxVelocity,
    }

    wall.pivot.y = 2
    wall.pivot.x = this.axis === "x" ? -3 : 2

    wall.update = () => this.update(wall)
    wall.collide = (obj) => this.collide(obj)
  }

  update(wall) {
    if (this.moving) {
      wall.body.acceleration[this.axis] = 120

      game.physics.isoArcade.overlap(wall, groups.overlap, function(obj1, obj2) {
        if (obj2.key === "rock") obj2.collide(obj1)
      })

      game.physics.isoArcade.overlap(wall, endZones, () => {
        this.moving = false
      })
    }
    else {
      wall.body.velocity[this.axis] = 0
      wall.body.acceleration[this.axis] = 0
    }
  }

  collide(obj) {
    if (obj.key === "player") {
      player.die()
    }
  }

  activate(obj) {
    if (obj.key === "player" && !this.moving) {
      this.moving = true
    }
  }
}

SpikeWallEndZone = class SpikeWallEndZone {
  constructor(wx, wy, x, y, z, obj) {
    this.iso = game.add.isoSprite(x, y, z, null)

    enablePhysics(this.iso)
    endZones.push(this.iso)

    this.iso.body.widthX = wx
    this.iso.body.widthY = wy
    this.iso.body.height = 30
  }
}