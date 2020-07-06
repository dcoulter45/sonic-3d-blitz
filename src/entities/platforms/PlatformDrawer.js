PlatformDrawer = class PlatformDrawer extends RenderInView {

  state = "open"

  constructor(wx, wy, x, y, z, obj) {
    super(wx, wy, x, y, z, obj)

    this.axis = getProp("axis", obj, "x")
    this.delay = getProp("delay", obj, 0)

    if (this.delay > 0) {
      game.time.events.add(this.delay, this.switch, this)
    } else {
      this.switch()
    }
  }
  render() {
    var { x, y, z } = this.props

    this.bg = game.add.isoSprite(x + 8, y, z - 11, "tiles", 108, groups.objects)
    this.bg.anchor.set(0.5)

    this.plank = game.add.isoSprite(x, y, z, "tiles", 90, groups.objects)
    this.plank.anchor.set(0.5)

    this.plank.pivot.y = -26

    this.plank.animations.add("close-x", [95, 96, 97, 94], 12, false)
    this.plank.animations.add("open-x", [97, 96, 95, 90], 12, false)
    this.plank.animations.add("close-y", [105, 106, 107, 94], 12, false)
    this.plank.animations.add("open-y", [107, 106, 105, 91], 12, false)

    this.iso = game.add.isoSprite(x, y, z + 4, null, 0, groups.walls)

    enablePhysics(this.iso)
    
    this.iso.body.height = 5
    this.iso.body.widthX = 44
    this.iso.body.widthY = 44 

    this.iso.collide = this.collide.bind(this)
  }

  switch() {
    if (this.state === "open") {
      this.state = "closed"

      if (this.iso) {
        var transition = this.axis === "x" ? { widthY: 0 } : { widthX: 0 }
        game.add.tween(this.iso.body).to(transition, 333, "Linear", true)

        this.plank.animations.play("close-" + this.axis)
      }
    }
    else {
      this.state = "open"
      
      if (this.iso) {
        var transition = this.axis === "x" ? { widthY: 44 } : { widthX: 44 }
        game.add.tween(this.iso.body).to(transition, 333, "Linear", true)

        this.plank.animations.play("open-" + this.axis)
      }
    }

    game.time.events.add(2000, this.switch, this)
  }

  hide() {
    this.bg.destroy()
    this.plank.destroy()
    this.iso.destroy()
  }

  collide(obj) {
    if (obj.key === "player") {
      if (obj.body.velocity.z < 0) {
        game.physics.isoArcade.collide(obj, this.iso)
        player.touchingFloor = true
      }
    }
  }
}