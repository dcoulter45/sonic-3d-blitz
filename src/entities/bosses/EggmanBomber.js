EggmanBomber = class EggmanBomber {

  health = 8
  tween = null
  tweenDistance = 5 * TILE_WIDTH
  tweenTime = 3000
  invulnerable = false
  defeated = false

  constructor(wx, wy, x, y, z, obj) {

    this.iso = game.add.isoSprite(x, y, z + 75, "eggman", 5, groups.objects)

    enablePhysics(this.iso)
    groups.collide.push(this.iso)

    this.iso.animations.add("move-u", [0, 1, 2, 3], 12, true)
    this.iso.animations.add("move-l", [4, 5, 6, 7], 12, true)
    this.iso.animations.add("move-r", [11, 10, 9, 8], 12, true)
    this.iso.animations.add("move-d", [15, 14, 13, 12], 12, true)
    this.iso.animations.add("hurt-u", [20, 21], 12, true)
    this.iso.animations.add("hurt-r", [22, 23], 12, true)
    this.iso.animations.add("hurt-l", [24, 25], 12, true)
    this.iso.animations.add("hurt-d", [26, 27], 12, true)

    this.direction = "l"
    this.iso.collide = this.collide.bind(this)

    this.shadow = game.add.isoSprite(x, y, z, "eggman", 16, groups.objects)
    this.shadow.pivot.y = -14

    new Shadow(this.shadow, this.iso, false)

    // Hover wobble
    game.add.tween(this.iso.body.position).to({ z }, 2000, function (k) {
      return circleSin(k) / 8;
    }, true, 0, -1);

    game.time.events.add(3000, () => {
      this.iso.animations.play("move-r")

      var entranceTween = game.add
        .tween(this.iso.body.position)
        .to({ x: TILE_WIDTH * 7, y: TILE_WIDTH * 12 }, 3000, "Linear", true)

      entranceTween.onComplete.add(this.move, this)
    }, this)
  }

  move() {
    if (this.direction === "r") {
      this.direction = "u"
      this.tween = game.add
        .tween(this.iso.body.position)
        .to({ x: this.iso.body.position.x - this.tweenDistance }, this.tweenTime, "Linear", true)
    }
    else if (this.direction === "u") {
      this.direction = "l"
      this.tween = game.add
        .tween(this.iso.body.position)
        .to({ y: this.iso.body.position.y + this.tweenDistance }, this.tweenTime, "Linear", true)
    }
    else if (this.direction === "l") {
      this.direction = "d"
      this.tween = game.add
        .tween(this.iso.body.position)
        .to({ x: this.iso.body.position.x + this.tweenDistance }, this.tweenTime, "Linear", true)
    }
    else if (this.direction === "d") {
      this.direction = "r"
      this.tween = game.add
        .tween(this.iso.body.position)
        .to({ y: this.iso.body.position.y - this.tweenDistance }, this.tweenTime, "Linear", true)
    }

    if (this.direction === "r" || this.direction === "d") {
      this.iso.pivot.x = 14
    }
    else {
      this.iso.pivot.x = -14
    }

    this.iso.animations.play("move-" + this.direction)

    this.tween.onComplete.add(this.dropBomb, this)
  }

  dropBomb() {
    var { x, y, z } = this.iso.body.position
    new Bomb(x + 20, y + 20, z)

    Sounds.Drop.play()

    this.move()
  }

  collide(obj) {
    if (obj.key === "player" && ATTACK_STATES.includes(obj.movement) && !this.invulnerable) {
      Sounds.BossHit.play()

      this.tween.pause()
      this.invulnerable = true
      this.health = this.health - 1
      this.iso.animations.play("hurt-" + this.direction)

      if (this.health > 0) {
        game.time.events.add(500, () => {
          this.tween.resume()
          this.invulnerable = false
          this.iso.animations.play("move-" + this.direction)
        }, this)
      }
      else {
        this.explode()

        game.time.events.add(2000, () => {
          new LevelComplete()

          this.defeated = true
          this.iso.animations.play("move-d")
          game.add
            .tween(this.iso.body.position)
            .to({ x: TILE_WIDTH * 24, y: TILE_WIDTH * 10 }, 5000, "Linear", true)
        }, this)
      }
    }
  }

  explode() {
    Sounds.BossHit.play()

    var { x, y, z } = this.iso.body.position

    var xx = randomInteger(x - 20, x + 20)
    var yy = randomInteger(y - 20, y + 20)
    var zz = randomInteger(z - 10, z + 10)

    new Explosion(xx, yy, zz)

    if (!this.defeated) {
      game.time.events.add(Phaser.Timer.SECOND / 2, this.explode, this);  
    } 
  }
}