const PLANK_WIDTH_X = 20

Bridge = class Bridge {

  direction = ""
  planks = []

  constructor(wx, wy, x, y, z, obj) {
    this.direction = wx > wy ? "x" : "y"
    this.falling = getProp("falling", obj, false)

    if (this.direction === "x") {
      var planks = obj.width / 20
      var fences = obj.width / 40
    } else {
      var planks = obj.height / 20
      var fences = obj.height / 40
    }

    for (let i = 0; i < planks; i++) {
      this.createPlank(i, x, y, z, obj)
    }

    for (let i = 0; i < fences; i++) {
      this.createFence(i, x, y, z, obj)
    }

    var xx = this.direction === "x" ? x - 10 : x - 5
    var yy = y - 8

    this.createPost(xx, yy, z)
    this.createPost(xx, y + wy, z)
    this.createPost(x + wx, yy, z)
    this.createPost(x + wx, y + wy, z)
  }

  createPost(x, y, z) {
    var post = game.add.isoSprite(x, y, z, "tiles", 20, groups.objects)
    post.anchor.set(0.5)
    post.pivot.y = 15
  }

  createPlank(i, x, y, z, obj) {
    if (this.direction === "x") {
      var tileId = 0
      var xx = x + (i * TILE_WIDTH / 2)
      var yy = y
    } else {
      var tileId = 1
      var xx = x 
      var yy = y + (i * TILE_WIDTH / 2)
    }
    
    var plank = game.add.isoSprite(xx, yy, z - 22, "bridge", tileId, groups.objects)
    groups.collide.push(plank)

    plank.anchor.set(0.5)
    game.physics.isoArcade.enable(plank)

    plank.body.allowGravity = false
    plank.body.widthX = this.direction === "x" ? 22 : 88
    plank.body.widthY = this.direction === "x" ? 88 : 22
    plank.pivot.x = this.direction === "x" ? 32 : - 32
    plank.body.immovable = true
    plank.falling = false

    groups.collide.push(plank)
    this.planks.push(plank)


    if (this.falling) {
      plank.collide = function(obj) {
        if (obj.key === "player" && !plank.falling) {
          plank.falling = true
          
          game.time.events.add(200, () => {
            this.body.allowGravity = true
          })

          game.time.events.add(600, () => {
            this.destroy()
          })
        }
      }
    }
  }

  createFence(i, x, y, z, obj) {
    if (this.direction === "x") {
      var tileId = 22
      var xx = x + (i * TILE_WIDTH)
      var xxx = x + (i * TILE_WIDTH)
      var yy = y
      var yyy = y + (TILE_WIDTH * 2)
    } else {
      var tileId = 21
      var xx = x
      var xxx = x + (TILE_WIDTH * 2)
      var yy = y + (i * TILE_WIDTH)
      var yyy = y + (i * TILE_WIDTH)
    }
    
    var fence1 = game.add.isoSprite(xx, yy, z, "tiles", tileId, groups.objects)
    fence1.anchor.set(0.5)
    fence1.pivot.y = 26
    fence1.pivot.x = 20

    var fence2 = game.add.isoSprite(xxx, yyy, z, "tiles", tileId, groups.objects)
    fence2.anchor.set(0.5)
    fence2.pivot.y = 26
    fence2.pivot.x = this.direction === "x" ? -20 : 20
  }
}


