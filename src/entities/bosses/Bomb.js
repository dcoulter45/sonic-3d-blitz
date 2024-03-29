class Bomb {
  constructor(x, y, z, vx = 0, vy = 0) {

    this.iso = game.add.isoSprite(x, y, z, "bomb", 0, groups.objects)

    game.physics.isoArcade.enable(this.iso)
    this.iso.anchor.set(0.5)

    groups.collide.push(this.iso)

    this.iso.animations.add("default", [0, 1, 2], 8, true)
    this.iso.animations.play("default")

    this.iso.body.widthX = 18
    this.iso.body.widthY = 18

    this.iso.body.velocity.x = vx
    this.iso.body.velocity.y = vy

    this.iso.update = this.update.bind(this)

    this.shadow = game.add.isoSprite(x + 8, y + 8, z, "bomb", 3, groups.objects)
    new Shadow(this.shadow, this.iso)

    this.shadow.pivot.y = -2

    game.time.events.add(800, this.explode, this)
  }

  update() {
    game.physics.isoArcade.collide(this.iso, groups.walls, () => {
      this.iso.body.moves = false
    });
  }

  explode() {
    var { x, y, z } = this.iso.body.position
    new Explosion(x - 20, y - 20, z, "large")

    Sounds.Explosion.play()

    removeFromGroup(groups.collide, this.iso)

    this.iso.destroy()
    this.shadow.destroy()

    var blastRadius = game.add.isoSprite(x - 13, y - 13, z, null, 0, groups.objects)

    enablePhysics(blastRadius)
    groups.overlap.push(blastRadius)

    blastRadius.body.widthX = 44
    blastRadius.body.widthY = 44
    blastRadius.body.height = 44
    blastRadius.harmful = true

    game.time.events.add(500, () => {
      blastRadius.destroy()
      removeFromGroup(groups.overlap, blastRadius)
    }, this)
  }
}