Spikes = class Spikes extends RenderInView{

  render() {
    var { x, y, z } = this.props

    this.iso = game.add.isoSprite(x + 1, y + 1, z, "tiles", 36, groups.objects)

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
}
