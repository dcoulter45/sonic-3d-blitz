Snowman = class Snowman {
  constructor(wx, wy, x, y, z, obj) {
    this.iso = game.add.isoSprite(x, y, z, "snowman", 1, groups.objects)

    enablePhysics(this.iso)

    this.iso.animations.add("default", range(0, 15), 8, true)
    this.iso.animations.play("default")

  }
}