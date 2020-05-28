Torch = class Torch {
  constructor(wx, wy, x, y, z, obj) {
    this.iso = game.add.isoSprite(x, y, z + 18, "torch", 0, groups.objects)

    this.iso.anchor.set(0.5)
    this.iso.animations.add("default", [0,1,2,3], 8, true)
    this.iso.animations.play("default")
  }
}