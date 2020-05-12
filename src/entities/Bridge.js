const PLANK_WIDTH_X = 20

Bridge = class Bridge {

  planks = []

  constructor(wx, wy, x, y, z, obj) {
    var planks = obj.width / 20
    var fences = obj.width / 40

    for (let i = 0; i < planks; i++) {
      this.createPlank(i, x, y, z, obj)
    }

    for (let i = 0; i < fences; i++) {
      this.createFence(i, x, y, z, obj)
    }

    var xx = x + ((obj.width / 40) * 44)

    this.createPost(x - 10, y - 4, z)
    this.createPost(x - 10, y + 82, z)
    this.createPost(xx, y - 4, z)
    this.createPost(xx, y + 82, z)
  }

  createPost(x, y, z) {
    var post = game.add.isoSprite(x, y, z + 24, "tiles", 20, groups.objects)
    post.anchor.set(0.5)
    post.pivot.y = 15
  }

  createPlank(i, x, y, z, obj) {
    var xx = x + (i * 22)
    var plank = game.add.isoSprite(xx, y, z + 2, "bridge", 0, groups.objects)
    collidables.push(plank)

    plank.anchor.set(0.5)
    game.physics.isoArcade.enable(plank)

    plank.body.allowGravity = false
    plank.body.widthX = 22
    plank.body.widthY = 88
    plank.pivot.x = 32
    plank.collidable = true
    plank.body.immovable = true
    plank.falling = false

    this.planks.push(plank)

    if (obj.properties.falling) {
      plank.collide = function(obj) {
        if (obj.key === "player" && !plank.falling) {
          plank.falling = true
          
          game.time.events.add(200, () => {
            plank.body.allowGravity = true
          })

          // game.time.events.add(600, () => {
          //   plank.destroy()
          // })
        }
      }
    }
  }

  createFence(i, x, y, z, obj) {
    var xx = x + (i * 44)
    
    var fence1 = game.add.isoSprite(xx, y, z + 24, "tiles", 22, groups.objects)
    fence1.anchor.set(0.5)
    fence1.pivot.y = 26
    fence1.pivot.x = -20

    var fence2 = game.add.isoSprite(xx, y + 88, z + 24, "tiles", 22, groups.objects)
    fence2.anchor.set(0.5)
    fence2.pivot.y = 26
    fence2.pivot.x = -20
  }
}


