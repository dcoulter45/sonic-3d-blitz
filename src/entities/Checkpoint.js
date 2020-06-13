Checkpoint = class Checkpoint {

  posts = []
  active = false
  respawnPoint = null

  constructor(wx, wy, x, y, z, obj) {
    this.iso = game.add.isoSprite(x, y, z + 5, null)

    enablePhysics(this.iso)
    groups.overlap.push(this.iso)

    this.iso.body.widthX = wx
    this.iso.body.widthY = wy
    this.iso.body.height = 60

    this.iso.collide = this.collide.bind(this)

    this.createPost(x + 15, y + 15, z)

    var xx = x + wx - TILE_WIDTH + 15
    var yy = y + wy - TILE_WIDTH + 15

    this.createPost(xx, yy, z)

    this.respawnPoint = {
      x: x + (wx / 2),
      y: y + (wy / 2),
      z,
    }
  }

  createPost(x, y, z) {
    var post = game.add.isoSprite(x, y, z + 11, "checkpoint", 0, groups.objects)

    enablePhysics(post)
    groups.collide.push(post)

    post.animations.add("flash", [1, 2], 8, true)

    post.body.widthX = 18
    post.body.widthY = 18
    post.body.height = 75
    post.pivot.y = 15

    this.posts.push(post)
  }

  collide(obj) {
    if (obj.key === "player" && !this.active) {
      this.active = true

      if (isMovingFasterThan(obj.body.velocity, 0)) {
        Sounds.StarPost.play()
      }
      
      stateParams.respawnPoint = this.respawnPoint

      this.posts.forEach((post) => {
        post.animations.play("flash")
      })
    }
  }
}