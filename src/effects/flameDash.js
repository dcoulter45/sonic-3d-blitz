class FlameDash {
  constructor() {
    var { x, y, z } = player.iso.body.position
    var direction = player.iso.direction

    this.iso = game.add.isoSprite(x, y, z, "flameDash", 0, groups.objects)
    
    this.iso.update = this.update.bind(this)

    this.iso.alpha = 0.8

    if (direction === "r") {
      this.iso.pivot.y = 30
      this.iso.pivot.x = 32
      this.iso.animations.add("default", [4, 5, 6, 7], 12, true)
    }
    else if (direction === "l") {
      this.iso.pivot.y = 35
      this.iso.pivot.x = 28
      this.iso.animations.add("default", [15, 14, 13, 12], 12, true)
    }
    else if (direction === "u") {
      this.iso.pivot.y = 30
      this.iso.pivot.x = 32
      this.iso.animations.add("default", [11, 10, 9, 8], 12, true)
    }
    else if (direction === "d") {
      this.iso.pivot.y = 35
      this.iso.pivot.x = 32
      this.iso.animations.add("default", [0, 1, 2, 3], 12, true)
    }

    this.iso.animations.play("default")
  }
  update() {
    var { x, y, z } = player.iso.body.position

    if (player.iso.movement !== "flameDash") {
      this.iso.destroy()
    }

    if (this.iso) {
      this.iso.isoX = x
      this.iso.isoY = y
      this.iso.isoZ = z
    }
  }
}