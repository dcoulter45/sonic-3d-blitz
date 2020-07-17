Rock = class Rock extends RenderInView {

  render() {
    var { x, y, z } = this.props

    this.iso = game.add.isoSprite(x + 4, y + 4, z, "tiles", 138, groups.objects)
    this.iso.anchor.set(0.5)

    game.physics.isoArcade.enable(this.iso);
    groups.overlap.push(this.iso)
    
    this.iso.key = "rock"
    this.iso.body.allowGravity = false
    this.iso.body.widthX = 25
    this.iso.body.widthY = 25
    this.iso.body.immovable = true
  
    this.iso.collide = this.collide.bind(this)
  }

  hide() {
    this.iso.destroy()
    removeFromGroup(groups.overlap, this.iso)
  }

  collide(obj) {
    if (this.active) {
      if (obj.key === "player") {
        if (obj.movement === "normal") {
          game.physics.isoArcade.collide(this.iso, obj)
        }
        else if (ATTACK_STATES.includes(obj.movement)) {
          this.destroy()
        }
      }

      if (obj.key === "spikeWall") {
        this.destroy()
      }
    }
  }

  destroy() {
    this.active = false
    this.iso.destroy()
    Sounds.Break.play()

    var totalPebbles = 4
    var { x, y, z } = this.iso.body.position

    for(var i = 0; i < totalPebbles; i++) {
      var velocity = {
        x: randomInteger(-50, 50),
        y: randomInteger(-50, 50),
        z: randomInteger(250, 350)
      }

      var pebble = game.add.isoSprite(x, y, z, "tiles", 139, groups.objects)
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