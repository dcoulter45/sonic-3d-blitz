LavaPlume = class LavaPlume extends RenderInView {
  burning = false

  constructor(wx, wy, x, y, z, obj) {
    super(wx, wy, x, y, z, obj)

    var instantPlume = getProp("instantPlume", obj, false)

    if (instantPlume) {
      this.render()

      this.visible = true
      this.iso.visible = true
      this.plume()
    }

    game.time.events.loop(4000, this.bubble, this);
  }

  render() {
    var { x, y, z } = this.props

    this.iso = game.add.isoSprite(x, y, z + 20, "lavaPlume", 0, groups.objects);

    enablePhysics(this.iso)
    groups.overlap.push(this.iso)

    this.iso.body.widthX = TILE_WIDTH
    this.iso.body.widthY = TILE_WIDTH
    this.iso.visible = false

    this.anim = {
      bubble: this.iso.animations.add("bubble", [0,1], 4, true),
      plume: this.iso.animations.add("plume", [2,3,4,5,6,7], 8, false),
      hang: this.iso.animations.add("hang", [8,9], 8, true),
      fall: this.iso.animations.add("fall", [10,11,12,13,14,15,16,17], 8, false),
    }

    this.anim.plume.onComplete.add(this.hang, this)
    this.anim.fall.onComplete.add(() => this.iso.visible = false)

    this.iso.collide = this.collide.bind(this)
  }

  hide() {
    removeFromGroup(groups.overlap, this.iso)
    this.iso.destroy()
  }

  bubble() {
    if (this.visible) {
      this.iso.animations.play("bubble")
      this.iso.visible = true

      game.time.events.add(1000, () => this.plume(), this)

      playDistantSound(this.iso, Sounds.Lava)
    }
  }

  plume() {
    if (this.visible) {
      this.anim.plume.play()
    }
  }

  hang() {
    if (this.visible) {
      this.iso.animations.play("hang")
      this.burning = true
      game.time.events.add(1000, () => this.fall(), this)
    }
  }

  fall() {
    if (this.visible) {
      this.anim.fall.play()
      this.burning = false
    }
  }
  
  collide(obj) {
    if (obj.key === "player" && this.burning) {
      player.die("burning")
    }
  }
}