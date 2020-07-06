MovingWall = class MovingWall extends RenderInView {

  inset = false
  mask = null
  tiles = []

  constructor(wx, wy, x, y, z, obj) {
    super(wx, wy, x, y, z, obj)

    this.group = game.add.group()
    this.axis = getProp("axis", obj, "x")
    this.delay = getProp("delay", obj, 0)
    this.tileId = getProp("tileId", obj, 190)

    if (this.delay > 0) {
      game.time.events.add(this.delay, this.move, this)
    } else {
      this.move()
    }
  }
  
  render() {
    var { wx, wy, x, y, z } = this.props

    if (this.axis === "x") {
      x = x - wx
    } else {
      y = y - wy
    }

    this.iso = game.add.isoSprite(x, y, z + 6, null, 0, groups.walls)

    enablePhysics(this.iso)

    this.iso.key = "wall"
    this.iso.body.widthX = wx
    this.iso.body.widthY = wy
    this.iso.body.height = TILE_HEIGHT * 3
    this.iso.update = this.update.bind(this)

    this.createMask()

    for (var i = 1; i <= 3; i ++) {
      var tiles = createTiles(this.tileId, wx, wy, x, y, z + (TILE_HEIGHT * i + 2), { shadow: false, hollow: i < 3 })
      
      tiles.forEach((tile) => {
        this.tiles.push(tile)
        tile.mask = this.mask
      })
    }
  }

  hide() {
    this.iso.destroy()
    this.tiles.forEach((tile) => {
      tile.destroy()
    })
  }

  update() {
    this.tiles.forEach((tile) => {
      tile.isoX = this.iso.body.position.x - tile.offsetXX
      tile.isoY = this.iso.body.position.y - tile.offsetYY
    })
  }

  move() {
    if (this.iso) {
      if (this.inset) {
        moveToXYZ(this.iso, {
          [this.axis]: this.props[this.axis]
        }, 800)
      } 
      else {
        moveToXYZ(this.iso, {
          [this.axis]: this.props[this.axis] - this.props["w" + this.axis]
        }, 800)
      }
    }

    this.inset = !this.inset

    game.time.events.add(1500, this.move, this)
  }

  createMask() {
    var { wx, wy, x, y, z } = this.props

    wx = wx + 1
    wy = wy + 1

    var mask = game.add.graphics(0, -6);

    var point1 = game.iso.project({ x, y, z: z + (TILE_HEIGHT * 3) })
    var point2 = game.iso.project({ x, y: y + wy, z: z + (TILE_HEIGHT * 3) })
    var point3 = game.iso.project({ x, y: y + wy, z: z - 2})
    var point4 = game.iso.project({ x: x + wx, y: y + wy, z: z - 2})
    var point5 = game.iso.project({ x: x + wx, y, z: z - 2})
    var point6 = game.iso.project({ x: x + wx, y, z: z + (TILE_HEIGHT * 3) })

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
}