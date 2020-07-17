BreakableWall = class BreakableWall extends RenderInView {

  tiles = []
  destroyed = false

  render() {
    var { wx, wy, x, y, z } = this.props

    for (var i = 1; i <= 3; i++) {
      var zz = z + (TILE_HEIGHT * i)
      var tiles = createTiles(46, wx, wy, x, y, zz)

      this.tiles = this.tiles.concat(tiles)
    }

    this.iso = game.add.isoSprite(x, y, z + 5, null, 0, groups.walls)

    enablePhysics(this.iso)

    this.iso.collide = this.collide.bind(this)

    this.iso.body.widthX = wx
    this.iso.body.widthY = wy
    this.iso.body.height = TILE_HEIGHT * 3
  }

  hide() {
    this.iso.destroy()

    this.tiles.forEach((tile) => {
      tile.destroy()
    })
  }

  collide(obj) {
    if (obj.key === "player" && obj.movement === "flameDash" && !this.destroyed) {
      this.destroyed = true
      player.iso.body.velocity.x = player.iso.previousVelocity.x
      player.iso.body.velocity.y = player.iso.previousVelocity.y
      this.createFragments()
      this.hide()
    }
  }

  createFragments(iceBlock) {
    var zz = this.props.z

    this.tiles.forEach((tile) => {
      var velocity = {
        x: randomInteger(-50, 50),
        y: randomInteger(-50, 50),
        z: randomInteger(250, 350)
      }
      
      var fragment = game.add.isoSprite(tile.isoX, tile.isoY, tile.isoZ, "tiles", 41, groups.objects)

      game.physics.isoArcade.enable(fragment)

      fragment.anchor.set(0.5)

      fragment.body.widthX = 15
      fragment.body.widthY = 15
      fragment.body.height = 15
      fragment.body.velocity = velocity

      fragment.update = function() {
        if (this.body.position.z <= zz) {
          this.destroy()
        }
      }
    })
  }
}