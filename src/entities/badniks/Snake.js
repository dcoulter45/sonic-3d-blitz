Snake = class Snake {

  totalSections = 6
  sections = []
  alive = true

  constructor(wx, wy, x, y, z, obj) {

    this.axis = getProp("axis", obj, "x")
    this.position = { x, y, z }
    this.end = {
      x: x + 3 * TILE_WIDTH,
      y: y + 3 * TILE_WIDTH,
      z: z + 50
    }
    this.frames = this.axis === "x" ? [0, 1] : [2, 3]

    for (var i = 0; i < this.totalSections; i++) {
      this.createSection(x, y, z, i)
    }

    game.time.events.loop(Phaser.Timer.SECOND * 2.5, () => {
      if (this.alive) {
        this.sections.forEach((section, index) => {
          this.moveSection(section, index)
        })
      }
    }, this);
  }

  createSection(x, y, z, i) {
    var frame = i === 0 ? this.frames[0] : this.frames[1]
    var section = game.add.isoSprite(x, y, z, "snake", frame, groups.objects)

    game.physics.isoArcade.enable(section)
    groups.overlap.push(section)
    this.sections.push(section)

    section.anchor.set(0.5)
    section.body.allowGravity = false
    section.body.immovable = true
    section.visible = false

    var shadow = game.add.isoSprite(x, y, z, "snake", i === 0 ? 4 : 5, groups.objects)
    section.shadow = new Shadow(shadow, section, false)
    section.shadow.iso.visible = false

    section.collide = (obj) => this.collide(section, obj)

    if (i === 0) {
      section.key = "head"
      section.body.widthX = 20
      section.body.widthY = 20
    } else {
      section.key = "body"
    }
  }

  moveSection(section, index) {
    var delay = 70 * index

    game.time.events.add(delay, () => {
      section.visible = true
      section.shadow.iso.visible = true
        
      if (section.key === "head") { 
        new Splash(this.position.x, this.position.y, this.position.z, "sand")
      }
  
      var tween = game.add.tween(section.body.position).to({[this.axis]: this.end[this.axis]}, 1500, "Linear", true)
                  game.add.tween(section.body.position).to({z: this.end.z}, 1500, arc, true)
  
      tween.onComplete.add(() => this.resetSection(section))
    })
  }

  resetSection(section) {
    if (this.alive) {
      if (section.key === "head") {
        var { x, y, z } = this.position
        this.axis === "x" ? new Splash(this.end.x, y, z, "sand") : new Splash(x, this.end.y, z, "sand")
      }

      section.visible = false
      section.shadow.iso.visible = false
      section.body.position = {...this.position}
    }
  }

  collide(section, obj) {
    if (section.visible && obj.key === "player") {
      if (section.key === "head" && ATTACK_STATES.includes(obj.movement)) {
        this.sections.forEach((section) => {
          new Explosion(section.body.position.x, section.body.position.y, section.body.position.z)
          this.alive = false
          section.destroy()
          section.shadow.iso.destroy()
        })
      } else {
        player.hurt()
      }
    }
  }
}