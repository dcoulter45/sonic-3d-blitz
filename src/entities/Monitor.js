Monitor = class Monitor {
  constructor(wx, wy, x, y, z, obj) {
    this.iso = game.add.isoSprite(x, y, z + 10, "monitors", 0, groups.objects)
    this.type = obj.type
    
    enablePhysics(this.iso)
    groups.overlap.push(this.iso)

    this.iso.body.widthX = 26
    this.iso.body.widthY = 18
    this.iso.pivot.x = -6

    if (obj.type === "Rings") {
      var frames = [0, 1, 2, 2]
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

    this.iso.animations.add("default", frames, 8, true)
    this.iso.animations.play("default")

    this.iso.collide = this.collide.bind(this)
  }

  collide(obj) {
    if (obj.key === "player" && ATTACK_STATES.includes(obj.movement)) {

      Sounds.Destroy.play()

      new Explosion(this.iso.body.position.x, this.iso.body.position.y, this.iso.body.position.z)

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

      if (this.type === "Lightning" || this.type === "Flame") {
        player.shield = new Shield(this.type)
      }

    } else {
      game.physics.isoArcade.collide(obj, this.iso)
    }
  }
}