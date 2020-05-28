Cactus = class Cactus {
  constructor(wx, wy, x, y, z, obj) {
    var frame = randomInteger(0, 4)

    this.iso = game.add.isoSprite(x, y, z + 16, "cactus", frame, groups.objects)
    this.iso.anchor.set(0.5)

    game.physics.isoArcade.enable(this.iso);
    groups.collide.push(this.iso)

    this.iso.body.allowGravity = false
    this.iso.body.immovable = true
    this.iso.harmful = true
  }
}