Ladder = class Ladder {
  constructor(wx, wy, x, y, z, obj) {
    this.axis = wx > wy ? "x" : "y"
    this.height = getProp("height", obj, 2)
    this.topZ = z + this.height * TILE_HEIGHT

    // Ladder Body
    this.iso = game.add.isoSprite(x, y, z + 4, null, 0, groups.objects)
    this.iso.anchor.set(0.5)

    game.physics.isoArcade.enable(this.iso)

    this.iso.key = "ladder"
    this.iso.body.allowGravity = false
    this.iso.body.immovable = true

    this.iso.body.widthX = this.axis === "x" ? wx : 6
    this.iso.body.widthY = this.axis === "x" ? 6 : wy
    this.iso.body.height = this.height * TILE_HEIGHT
    this.iso.axis = this.axis // used for collisions
    this.iso.collide = (obj) => this.collide("body", obj)

    groups.collide.push(this.iso)

    // Ladder Top
    var zz = (this.height * TILE_HEIGHT) + z + 10
    this.top = game.add.isoSprite(x, y, zz, null, 0, groups.objects)
    this.top.anchor.set(0.5)

    game.physics.isoArcade.enable(this.top)

    this.top.key = "ladderTop"
    this.top.body.allowGravity = false
    this.top.body.immovable = true

    this.top.body.widthX = this.axis === "x" ? wx : 12
    this.top.body.widthY = this.axis === "x" ? 12 : wy
    this.top.body.height = 1
    this.top.collide = (obj) => this.collide("top", obj)

    groups.overlap.push(this.top)

    // Ladder Sprites
    this.drawLadder(wx, wy, x, y, z, obj)
  }

  drawLadder(wx, wy, x, y, z, obj) {
    if (this.axis === "x") {
      this.tiles = wx / TILE_WIDTH
    } else {
      this.tiles = wy / TILE_WIDTH
    }

    for (var i = 0; i < this.tiles; i++) {
      for (var h = 0; h < this.height; h++) {
        var xx = this.axis === "x" ? (i * TILE_WIDTH) + x : x
        var yy = this.axis === "y" ? (i * TILE_WIDTH) + y : y
        var zz = (h * 30) + z - 5
        var tileId = this.axis === "x" ? 38 : 39

        var ladder = game.add.isoSprite(xx, yy, zz, "tiles", tileId, groups.objects)
        ladder.anchor.set(0.5)

        game.physics.isoArcade.enable(ladder)
        ladder.body.allowGravity = false
        ladder.body.immovable = true
        
        ladder.body.widthX = this.axis === "x" ? 44 : 1
        ladder.body.widthY = this.axis === "x" ? 1 : 44
        ladder.pivot.y = 25
        ladder.pivot.x = this.axis === "x" ? -37 : 37
      }
    }
  }

  collide(section, obj) {
    if (obj.key === "player") {
      if (section === "top" && obj.movement == "climbing") {
        obj.movement = "dismount"
        playerDismountLadder()
      } 
      else if (
        section === "body" 
        && obj.movement !== "climbing" 
        && obj.movement !== "dismount"
        && obj.body.position.z < this.topZ
      ) {
        obj.movement = "climbing"
        obj.activeLadder = this.iso
			  if (this.axis === "x") obj.direction = "r"
			  if (this.axis === "y") obj.direction = "u"
      }
    }
  }
}