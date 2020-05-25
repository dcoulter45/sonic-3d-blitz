Rock = class Rock {
  constructor(wx, wy, x, y, z, obj) {
    this.iso = game.add.isoSprite(x, y, z, "tiles", 110, groups.objects)
    this.iso.anchor.set(0.5)

    game.physics.isoArcade.enable(this.iso);
    groups.overlap.push(this.iso)
    
    this.iso.body.allowGravity = false
    this.iso.body.widthX = 25
    this.iso.body.widthY = 25
    this.iso.body.immovable = true
  
    this.iso.collide = this.collide.bind(this)
  }

  collide(obj) {
    if (obj.key === "player") {
      if (obj.movement === "normal") {
        game.physics.isoArcade.collide(this.iso, obj)
      }
      else if (ATTACK_STATES.includes(obj.movement)) {
        this.createPebbles()
        this.iso.destroy()
      }
    }
  }

  createPebbles() {
    var totalPebbles = 4
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
  }
}