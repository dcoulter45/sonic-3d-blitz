DrawerFloor = class DrawerFloor extends RenderInView {

  levels = []
  spikes = []
  detectionZone = null
  mask = null
  moving = false

  constructor(wx, wy, x, y, z, obj) {
    super(wx, wy, x, y, z, obj)

    this.axis = getProp("axis", obj, "x")
    this.tileId = getProp("tileId", obj, 42)
    this.height = getProp("height", obj, 2)
  }
  
  render() {
    var { wx, wy, x, y, z, } = this.props

    this.createMask()

    this.detectionZone = game.add.isoSprite(x, y, z, null, 0, groups.objects)
    
    enablePhysics(this.detectionZone)
    groups.overlap.push(this.detectionZone)

    this.detectionZone.body.widthX = wx
    this.detectionZone.body.widthY = wy
    this.detectionZone.body.height = TILE_HEIGHT * 3

    this.detectionZone.collide = this.trigger.bind(this)
    this.detectionZone.update = this.update.bind(this)

    for (var i = 1; i <= this.height; i++) {
      var zz = z + (i * TILE_HEIGHT)
      var tiles = createTiles(this.tileId, wx, wy, x - wx, y, zz)
      var spikes = []
      var wall = game.add.isoSprite(x - wx, y, zz - 25, null, 0, groups.walls)
      
      enablePhysics(wall)
      
      wall.body.widthX = wx
      wall.body.widthY = wy
      wall.body.height = TILE_HEIGHT

      tiles.forEach((tile) => {
        tile.mask = this.mask
      })

      if (this.axis === "x") {
        var count = wx / TILE_WIDTH
        
        for (var ii = 0; ii < count; ii++) {
          var yy = y + (TILE_WIDTH * ii) + 6
          var spike = game.add.isoSprite(x, yy, zz - 25, "spikesFlat", 5, groups.objects)

          enablePhysics(spike)
          groups.overlap.push(spike)

          spike.harmful = true
          spike.pivot.y = 8
          spike.pivot.x = 10
          spikes.push(spike)
        }
      }

      this.levels.push({
        tiles,
        spikes,
        wall
      })
    }
  }

  hide() {
    this.detectionZone.destroy()
    removeFromGroup(groups.overlap, this.detectionZone)

    this.levels.forEach((level) => {
      level.tiles.forEach((tile) => {
        tile.destroy()
      })

      this.spikes.forEach((spike) => {
        removeFromGroup(groups.overlap, spike)
        spike.destroy()
      })

      level.wall.destroy()
    })
  }

  createMask() {
    var { wx, wy, x, y, z } = this.props

    wx = wx + 1
    wy = wy + 1

    var mask = game.add.graphics(0, -6);

    var point1 = game.iso.project({ x, y, z: z + (TILE_HEIGHT * this.height) })
    var point2 = game.iso.project({ x, y: y + wy, z: z + (TILE_HEIGHT * this.height) })
    var point3 = game.iso.project({ x, y: y + wy, z: z - 2})
    var point4 = game.iso.project({ x: x + wx, y: y + wy, z: z - 2})
    var point5 = game.iso.project({ x: x + wx, y, z: z - 2})
    var point6 = game.iso.project({ x: x + wx, y, z: z + (TILE_HEIGHT * this.height) })

    var polygon = new Phaser.Polygon([
      point1.x, point1.y,
      point2.x, point2.y,
      point3.x, point3.y,
      point4.x, point4.y,
      point5.x, point5.y,
      point6.x, point6.y,
    ]);

    mask.beginFill(0xffffff);
    mask.drawPolygon(polygon.points);
    mask.endFill();
    
    this.mask = mask
  }

  update() {
    this.levels.forEach((level) => {
      level.tiles.forEach((tile) => {
        tile.isoX = level.wall.body.position.x - tile.offsetXX
        tile.isoY = level.wall.body.position.y - tile.offsetYY
      })

      level.spikes.forEach((spike) => {
        spike.body.position[this.axis] = level.wall.body.position[this.axis] + level.wall.body["width" + this.axis.toUpperCase()]
      })
    })
  }

  trigger(obj) {
    if (obj.key === "player" && !this.moving) {
      this.moving = true

      this.levels.forEach((level, index) => {
        var delay = index * 1000

        game.time.events.add(delay, () => {
          this.moveLevel(level)
        })
      })

      game.time.events.add(5000, () => {
        this.reset()
      })
    }
  }

  reset() {
    this.levels.forEach((level) => {
      moveToXYZ(level.wall, {
        [this.axis]: this.props[this.axis] - this.props["w" + this.axis]
      }, 1500)
    })

    game.time.events.add(2000, () => {
      this.moving = false
    })
  }

  moveLevel(level) {

    moveToXYZ(level.wall, {
      [this.axis]: this.props[this.axis]
    }, 1500)
  }
}