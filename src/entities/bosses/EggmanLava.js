EggmanLava = class EggmanLava {

  direction = "u"
  pointA = { x: 352, y: 682 }
  pointB = { x: 836, y: 682 }

  constructor(wx, wy, x, y, z, obj) {
    
    this.iso = Eggman(x, y, z)

    this.move()
  }

  move() {
    if (this.direction === "u") {
      this.direction = "d"
      this.tween = game.add
        .tween(this.iso.body.position)
        .to(this.pointB, 5000, "Linear", true)
    }
    else if (this.direction === "d") {
      this.direction = "u"
      this.tween = game.add
        .tween(this.iso.body.position)
        .to(this.pointA, 5000, "Linear", true)
    }
    
    if (this.direction === "r" || this.direction === "d") {
      this.iso.pivot.x = 14
    }
    else {
      this.iso.pivot.x = -14
    }

    this.iso.animations.play("move-" + this.direction)

    this.tween.onComplete.add(() => {
      game.time.events.add(1000, () => this.move())
    }, this)
  }
}