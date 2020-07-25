EggmanAngry = class EggmanAngry extends RenderInView {
  render() {
    var { x, y, z } = this.props

    this.iso = game.add.isoSprite(x, y, z + 4, "eggmanAngry", 0, groups.tiles)

    this.iso.anchor.set(0.5)

    this.iso.animations.add("default", [0, 1, 2, 3, 4, 5, 6, 7], 12, true)
    this.iso.animations.play("default")
  }

  hide() {

  }
}