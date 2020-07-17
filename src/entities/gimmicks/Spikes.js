Spikes = class Spikes extends RenderInView{

  constructor(wx, wy, x, y, z, obj) {
    super(wx, wy, x, y, z, obj)

    this.delay = getProp("delay", obj, 0)
    this.static = getProp("static", obj, true)

    if (!this.static) {
      game.time.events.add(this.delay, () => {
        this.goDown()
      })
    }
  }

  render() {
    var { x, y, z } = this.props

    this.iso = game.add.isoSprite(x + 1, y + 1, z, "spikesFlat", 3, groups.objects)

    this.iso.animations.add("down", [3,2,1,0], 20, false);
    this.iso.animations.add("ready", [1], 20, false);
    this.iso.animations.add("up", [2,3], 20, false);

    game.physics.isoArcade.enable(this.iso);
    groups.overlap.push(this.iso)

    this.iso.key = "spikes"
    this.iso.anchor.set(0.5)
    this.iso.body.allowGravity = false
    this.iso.harmful = true

    this.iso.body.widthX = 42
    this.iso.body.widthY = 42
    this.iso.body.height = 16
  }

  hide() {
    removeFromGroup(groups.overlap, this.iso)
    this.iso.destroy()
  }

  goDown(){
    this.state = "down"

    if (this.visible) {
      this.iso.animations.play("down")
      this.iso.harmful = false
    }

    game.time.events.add(2000, () => {
      this.goReady()
    })
  }

  goReady(){
    this.state = "ready"

    if (this.visible) {
      this.iso.animations.play("ready")
    }

    game.time.events.add(1000, () => {
      this.goUp()
    })
  }

  goUp(){
    this.state = "up"

    if (this.visible) {
      this.iso.animations.play("up")
      this.iso.harmful = true
    }

    game.time.events.add(1000, () => {
      this.goDown()
    })
  }
}
