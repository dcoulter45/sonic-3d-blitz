Monitor = class Monitor {
  constructor(wx, wy, x, y, z, obj) {
    this.iso = game.add.isoSprite(x, y, z + 9, "monitors", 0, groups.objects)
    this.type = obj.type
    
    enablePhysics(this.iso)
    groups.overlap.push(this.iso)

    this.iso.body.widthX = 26
    this.iso.body.widthY = 18
    this.iso.pivot.x = -6

    if (obj.type === "Rings") {
      var frames = [0, 1, 2, 2]
      level.rings += 10
    }

    if (obj.type === "Life") {
      var frames = [0, 1, 5, 5]
    }

    if (obj.type === "Shield") {
      var frames = [0, 1, 4, 4]
    }
    
    if (obj.type === "Lightning") {
      var frames = [0, 1, 3, 3]
    }

    if (obj.type === "Flame") {
      var frames = [0, 1, 7, 7]
    }

    if (obj.type === "Bubble") {
      var frames = [0, 1, 8, 8]
    }

    this.iso.animations.add("default", frames, 8, true)
    this.iso.animations.play("default")

    this.iso.collide = this.collide.bind(this)
  }

  collide(obj) {
    if (obj.key === "player") {
      var velocityCache = { ...obj.body.velocity }

      game.physics.isoArcade.collide(obj, this.iso)

      var { down, frontY, frontX, backX, backY } = this.iso.body.touching

      if (
        (["jump", "doubleJump", "slam"].includes(obj.movement) && down)
        ||
        (obj.movement === "roll" && (frontY || frontX || backX || backY))
      ) {
        this.destroy()

        if (obj.movement === "roll") {
          obj.body.velocity = velocityCache   
        }
        else {
          obj.body.velocity.z = 250
        }
      }
    }
  }

  destroy() {
    Sounds.Destroy.play()

    new Explosion(this.iso.body.position.x, this.iso.body.position.y, this.iso.body.position.z + 10)

    this.iso.destroy()

    if (player.iso.movement === "jump" || player.iso.movement === "slam") {
      player.iso.body.velocity.z = 250
      player.iso.movement = "jump"
    }

    if (this.type === "Rings") {
      game.rings.add(10)
      Sounds.Ring.play()
    }

    if (this.type === "Life") {
      game.lives.addLife()
    }

    if (this.type === "Shield") {
      player.shield = new Shield()
    }

    if (this.type === "Lightning" || this.type === "Flame" || this.type === "Bubble") {
      player.shield = new Shield(this.type)
    }
  }
}