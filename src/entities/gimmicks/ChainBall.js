ChainBall = class ChainBall {
  radius = 66

  constructor(wx, wy, x, y, z, obj) {
    this.x = x
    this.y = y

    this.base = game.add.isoSprite(x, y, z + 8, "spikeball", 8, groups.objects)
    
    enablePhysics(this.base)
    groups.collide.push(this.base)

    this.base.body.widthX = 16
    this.base.body.widthY = 16

    this.ball = game.add.isoSprite(x, y, z + 8, "spikeball", 0, groups.objects)

    enablePhysics(this.ball)
    groups.overlap.push(this.ball)

    this.ball.animations.add("default", range(0, 7), 8, true)
    this.ball.animations.play("default")
    this.ball.harmful = true

    this.circle(this.ball, this.radius)

    this.createChain(x, y, z, 14)
    this.createChain(x, y, z, 30)
    this.createChain(x, y, z, 46)
  }

  createChain(x, y, z, radius) {
    var chain = game.add.isoSprite(x, y, z + 8, "spikeball", 9, groups.objects)
    enablePhysics(chain)
    this.circle(chain, radius)
  }

  circle(iso, radius) {
    var tweenX = game.add.tween(iso.body.position).to({
      x: this.x - radius
    }, 1500, circleCos, true)

    var tweenY = game.add.tween(iso.body.position).to({
      y: this.y + radius
    }, 1500, circleSin, true)

    tweenX.repeat(-1, 0)
    tweenY.repeat(-1, 0)
  }
}