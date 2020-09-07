Fireball = class Fireball {
  constructor(wx, wy, x, y, z) {
    
    this.iso = game.add.isoSprite(x, y, z + 180, "fireball", 0, groups.objects)

    game.physics.isoArcade.enable(this.iso)
    this.iso.anchor.set(0.5)

    this.iso.body.widthX = 44
    this.iso.body.widthY = 44
    this.iso.body.allowGravity = false

    this.iso.animations.add("default", [0, 1, 2, 3], 12, true)
    this.iso.animations.play("default")

    this.shadow = game.add.isoSprite(x, y, z + 5, "fireball", 4, groups.objects)
    this.shadow.anchor.set(0.5)

    game.time.events.add(1000, () => {
      this.iso.body.allowGravity = true
    }, this)

    this.iso.update = this.update.bind(this)
  }

  update() {
    game.physics.isoArcade.collide(this.iso, groups.walls, () => {
      this.iso.destroy()
      this.shadow.destroy()

      var totalPebbles = 6
      var { x, y, z } = this.iso.body.position

      for(var i = 0; i < totalPebbles; i++) {
        var velocity = {
          x: randomInteger(-50, 50),
          y: randomInteger(-50, 50),
          z: randomInteger(250, 350)
        }

        var pebble = game.add.isoSprite(x, y, z, "tiles", 111, groups.objects)
        game.physics.isoArcade.enable(pebble)

        pebble.anchor.set(0.5)

        pebble.body.widthX = 15
        pebble.body.widthY = 15
        pebble.body.height = 15
        pebble.body.velocity = velocity

        pebble.update = function() {
          if (this.body.position.z <= z) {
            this.destroy()
          }
        }
      }
    })
  }
}