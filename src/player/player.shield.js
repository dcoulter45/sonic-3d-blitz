class Shield {
  constructor(type = "normal") {
    var { x, y, z } = player.iso.body.position

    this.type = type

    this.iso = game.add.isoSprite(x, y, z, "shields", 0, groups.objects)

    if (type === "Lightning") {
      Sounds.LightningShield.play()
      this.iso.animations.add("default", range(0, 7), 12, true)
    } 
    else if (type === "Flame") {
      this.iso.animations.add("default", range(18, 26), 12, true)
    }
    else {
      Sounds.BlueShield.play()
      this.iso.animations.add("default", range(9, 14), 12, true)
    }

    this.iso.anchor.set(0.5)
    this.iso.alpha = 0.3

    this.iso.animations.play("default")

    this.iso.update = this.update.bind(this)
  }
  
  destroy() {
    this.iso.destroy()
    player.shield = null
  }

  update() {
    this.iso.isoX = player.iso.body.position.x
    this.iso.isoY = player.iso.body.position.y
    this.iso.isoZ = player.iso.body.position.z + 5
  }
}