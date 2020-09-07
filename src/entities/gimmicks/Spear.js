Spear = class Spear extends RenderInView {

  constructor(wx, wy, x, y, z, obj) {
    super(wx, wy, x, y, z, obj)

    this.delay = getProp("delay", obj, 0)
    this.static = getProp("static", obj, true)

    if (!this.static) {
      game.time.events.add(this.delay, () => {
        this.goDown()
      }, this)
    }
  }

  render() {
    var { x, y, z } = this.props

    this.base = game.add.isoSprite(x, y, z, "spikesBase", 0, groups.objects);
    this.spike = game.add.isoSprite(x, y, z + 5, "spikes", 4, groups.objects);
    this.iso = game.add.isoSprite(x, y, z + 5, null);

    this.base.anchor.set(0.5)

    this.spike.anchor.set(0.5)
    this.spike.animations.add("down", [3, 2, 1, 0], 20, false);
    this.spike.animations.add("ready", [1], 20, false);
    this.spike.animations.add("up", [2, 3, 4], 20, false);
    this.spike.pivot.y = 34

    game.physics.isoArcade.enable(this.iso);

    this.iso.anchor.set(0.5);
    this.iso.body.allowGravity = false;
    this.iso.body.widthX = 16
    this.iso.body.widthY = 16
    this.iso.body.height = 80
    this.iso.harmful = true

    groups.overlap.push(this.iso)
  }

  hide() {
    removeFromGroup(groups.overlap, this.iso)

    this.base.destroy()
    this.spike.destroy()
    this.iso.destroy()
  }

  goDown() {
    this.state = "down"

    if (this.visible) {
      this.spike.animations.play("down")
      this.iso.harmful = false
    }

    game.time.events.add(2000, () => {
      this.goReady()
    }, this)
  }

  goReady() {
    this.state = "ready"

    if (this.visible) {
      this.spike.animations.play("ready")
    }

    game.time.events.add(500, () => {
      this.goUp()
    }, this)
  }

  goUp() {
    this.state = "up"

    if (this.visible) {
      this.spike.animations.play("up")
      this.iso.harmful = true
    }

    game.time.events.add(1500, () => {
      this.goDown()
    }, this)
  }
}