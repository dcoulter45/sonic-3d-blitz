Snowman = class Snowman extends RenderInView {
  render() {
    var { x, y, z } = this.props

    this.iso = game.add.isoSprite(x, y, z + 14, "snowman", 1, groups.objects)

    enablePhysics(this.iso)

    groups.overlap.push(this.iso)

    this.iso.destructible = "hard";

    this.iso.remove = this.destroy.bind(this)
    this.iso.update = this.update.bind(this)

    game.time.events.add(2000, this.fireBullets, this)
  }

  hide() {
    removeFromGroup(groups.overlap, this.iso)
    this.iso.destroy()
  }

  fireBullets() {
    if (this.visible && this.active) {
      var distance = game.physics.isoArcade.distanceToXY(player.iso.body, this.iso.body.x, this.iso.body.y)

      if (distance < 240) {
        this.createBullet()
        game.time.events.add(200, () => this.createBullet(), this)
        game.time.events.add(400, () => this.createBullet(), this)

        game.time.events.add(2500, this.fireBullets, this)
      } 
      else {
        game.time.events.add(500, this.fireBullets, this)
      }
    }
  }

  createBullet() {
    var { x, y, z } = this.iso.body.position
    
    var bullet = game.add.isoSprite(x, y, z + 15, "bullet", 0, groups.objects)
    bullet.harmful = true
    
    enablePhysics(bullet)
    groups.overlap.push(bullet)

    game.physics.isoArcade.moveToObject(bullet, player.iso.body, 150)

    game.time.events.add(3000, () => {
      removeFromGroup(groups.overlap, bullet)
      bullet.destroy()
    }, this)
  }

  update() {
    var angle = game.math.angleBetween(player.iso.body.x, player.iso.body.y, this.iso.body.x, this.iso.body.y)
    angle += 3

    var percentage = angle / 6
    var frame = Math.round(15 * percentage)

    this.iso.loadTexture("snowman", frame)
  }

  destroy() {
    this.active = false
    new Explosion(this.iso.body.position.x,this.iso.body.position.y,this.iso.body.position.z + 14);
    this.hide()
  }
}