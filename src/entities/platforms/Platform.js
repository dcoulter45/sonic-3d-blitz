Platform = class Platform {

  tiles = []

  constructor(wx, wy, x, y, z, obj) {

    if (obj.type === "Moving") {
      new PlatformMoving(wx, wy, x, y, z, obj)
    }

    if (obj.type === "Wobble") {
      new PlatformWobble(wx, wy, x, y, z, obj)
    }

    // this.tileId = getProp("tileId", obj, 90)
    // this.axis = getProp("axis", obj, null)
    // this.distance = getProp("distance", obj, 2)
    // this.velocity = getProp("velocity", obj, 50)
    // this.type = obj.type

    // this.iso = game.add.isoSprite(x, y, z - 25, null, 0, groups.walls)

    // enablePhysics(this.iso)

    // this.iso.key = "platform"
    // this.iso.body.height = 30
    // this.iso.body.widthX = wx
    // this.iso.body.widthY = wy

    // this.iso.update = this.update.bind(this);

    // // this.shadow = game.add.isoSprite(x, y, z - 30, "tiles", this.tileId, groups.objects)
    // // this.shadow.anchor.set(0.5)
    
    // // groups.collide.push(this.iso)

    // if (this.type === "Switch") {
    //   this.createSwitchTile(wx, wy, x, y, z, obj)
    // } else {
    //   this.createTiles(wx, wy, x, y, z)
    //   this.createFrames(x, y, z)
    // }
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
      }
    }
  }

  // createFrames(offsetX, offsetY, z) {
  //   var frameId = this.axis === "x" ? 108 : 109
  //   var xx = offsetX + (this.distance * TILE_WIDTH) + TILE_WIDTH

  //   // var yy = wy / TILE_WIDTH

  //   if (this.axis === "x") {
  //     for(var x = offsetX; x <= xx; x += TILE_WIDTH) {
  //       var tileId = x === offsetX ? 98 : 
  //                    x === xx ? 88 : 78

  //       var frame = game.add.isoSprite(x, offsetY, z, "tiles", tileId, groups.tiles)
  //       frame.pivot.x = 34
  //       frame.pivot.y = 14
  //     }
  //   }
  //   else if (this.axis === "y") {
  //     if (this.velocity > 0) {
  //       var startY = offsetY 
  //       var endY = offsetY + (this.distance * TILE_WIDTH) + TILE_WIDTH
  //     } else {
  //       var endY = offsetY
  //       var startY = offsetY - (this.distance * TILE_WIDTH)
  //     }

  //     for(var y = startY; y <= endY; y += TILE_WIDTH) {
  //       var tileId = y === startY ? 99 : 
  //                    y === endY ? 89 : 79

  //       var frame = game.add.isoSprite(offsetX, y, z, "tiles", tileId, groups.tiles)
  //       frame.pivot.x = 46
  //       frame.pivot.y = 14
  //     }
  //   }
  // }

  createSwitchTile(wx, wy, x, y, z, obj) {
    var tileId = this.axis === "x" ? 91 : 90
    var frameId = this.axis === "x" ? 109 : 108
    var openFrames = this.axis === "x" ? [105, 106, 107, 91] : [97, 96, 95, 90]
    var closeFrames = this.axis === "x" ? [107, 106, 105, 80] : [95, 96, 97, 80]

    var frame = game.add.isoSprite(x, y, z, "tiles", frameId, groups.tiles)
    frame.pivot.x = this.axis === "x" ? 46 : 34
    frame.pivot.y = 16

    var tile = game.add.isoSprite(x, y, z - 30, "tiles", tileId, groups.objects)
    tile.anchor.set(0.5)
    
    tile.animations.add("open", openFrames, 8, false)
    tile.animations.add("close", closeFrames, 8, false)

    tile.state = getProp("initialState", obj, 0)

    this.switchTile(tile)
  }

  switchTile(tile) {
    if (tile.state === 0) {
      tile.state = 1
      tile.animations.play("close")

      if (this.axis === "x") {
        game.add.tween(this.iso.body).to({widthX: 0}, 400, Phaser.Easing.Linear.None, true)
      } else {
        game.add.tween(this.iso.body).to({widthY: 0}, 400, Phaser.Easing.Linear.None, true)
      }
    } else {
      tile.state = 0
      tile.animations.play("open")

      if (this.axis === "x") {
        game.add.tween(this.iso.body).to({widthX: 44}, 400, Phaser.Easing.Linear.None, true)
      } else {
        game.add.tween(this.iso.body).to({widthY: 44}, 400, Phaser.Easing.Linear.None, true)
      }
    }

    game.time.events.add(Phaser.Timer.SECOND * 2, () => this.switchTile(tile))
  }

  update() {
    // After reaching a certain, swap direction
    if (this.axis && this.type !== "Switch") {

      var v = this.iso.body.velocity[this.axis]
      var px = this.iso.body.position[this.axis]

      if (!this.inverted &&
        ((v > 0 && px >= this.end[this.axis]) || (v < 0 && px <= this.start[this.axis]))
      ) {
        this.velocity = this.velocity * -1
      }

      if (this.inverted &&
        ((v > 0 && px >= this.start[this.axis]) || (v < 0 && px <= this.end[this.axis]))
      ) {
        this.velocity = this.velocity * -1
      }

      this.tiles.forEach((tile) => {
        tile.isoX = this.iso.body.position.x - tile.offsetXX
        tile.isoY = this.iso.body.position.y - tile.offsetYY
        tile.isoZ = this.iso.body.position.z - 8
      })
      
      // Set velocity
      setVelocity(this.iso, this.axis, this.velocity)
      
      // this.shadow.isoX = this.iso.body.position.x
      // this.shadow.isoY = this.iso.body.position.y
    }
  }
}