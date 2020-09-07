EggmanChase = class EggmanChase {

  health = 5
  state = "idle"
  invulnerable = false
  bombPatterns = [
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 1],
    [1, 1, 0],
    [0, 1, 1],
  ]

  constructor(wx, wy, x, y, z, obj) {
    this.iso = Eggman(x, y, z)

    this.iso.update = this.update.bind(this)

    this.iso.collide = this.collide.bind(this)
  }

  update() {
    var distance = game.physics.isoArcade.distanceToXY(player.iso.body, this.iso.body.position.x, this.iso.body.position.y)

    if (this.state === "idle" && distance < 180) {
      if (distance < 180) {
        this.iso.animations.play("move-d")
        this.state = "moving"

        game.time.events.add(1000, () => {
          this.dropBomb()
        }, this)
      }
    }

    if (this.state === "stopped" && distance < 200) {
      this.state = "moving"
    }

    if (this.state=== "moving") {
      this.iso.body.velocity.x = 200

      if (distance > 300) {
        this.iso.body.velocity.x = 0
        this.state = "stopped"
      }
    }
  }

  dropBomb() {
    if (this.state === "moving") {
      var { x, y, z } = this.iso.body.position

      var patternLimit = this.health <= 2 ? 4 : 2
      var pattern = randomInteger(0, patternLimit)

      if (this.bombPatterns[pattern][0]) new Bomb(x + 20, y + 20, z, 0, 120)
      if (this.bombPatterns[pattern][1]) new Bomb(x + 20, y + 20, z, 0, 0)
      if (this.bombPatterns[pattern][2]) new Bomb(x + 20, y + 20, z, 0, -120)
      
      Sounds.Drop.play()
    }

    game.time.events.add(2000, () => {
      this.dropBomb()
    }, this)
  }

  collide(obj) {
    if (obj.key === "player" && ATTACK_STATES.includes(obj.movement) && !this.invulnerable) {
      Sounds.BossHit.play()

      player.iso.body.velocity.x = 0

      this.invulnerable = true
      this.health = this.health - 1
      this.iso.animations.play("hurt-d")

      if (this.health > 0) {
        this.state = "hurt"
        this.iso.body.velocity.x = 300
        game.time.events.add(1000, () => {
          if (this.state === "hurt") this.state = "moving"
        }, this)

        game.time.events.add(500, () => {
          this.invulnerable = false
          this.iso.animations.play("move-d")
        }, this)
      }
      else {
        this.explode()
        this.iso.animations.play("move-l")
        this.iso.body.velocity.x = 50
        this.iso.body.velocity.y = 150

        game.time.events.add(2000, () => {
          new LevelComplete()

          this.defeated = true
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