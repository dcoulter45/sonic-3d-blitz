class Shadow {

  constructor(sprite, follow, followZ = true, exclude = []) {
    this.iso = sprite
    this.follow = follow
    this.followZ = followZ
    this.exclude = exclude

    game.physics.isoArcade.enable(sprite)
    sprite.anchor.set(0.5)

    sprite.body.collideWorldBounds = false
    sprite.body.allowGravity = false
    sprite.body.height = 1

    this.updateZ()

    if (follow) {
      sprite.update = this.update.bind(this)
    } 
  }

  isWithin(obj) {
    return (
      this.iso.body.position.x < obj.isoX + obj.body.widthX &&
      (this.iso.body.position.x + this.iso.body.halfWidthX) >= obj.isoX &&
      this.iso.body.position.y < obj.isoY + obj.body.widthY &&
      (this.iso.body.position.y + this.iso.body.halfWidthY) >= obj.isoY
    )
  }

  update() {
    if (this.followZ) {
      this.updateZ()
    }

    if (this.follow) {
      this.updateXY()
    }
  }

  updateXY() {
    if (this.follow.body) {
      this.iso.body.position.x = this.follow.body.position.x
      this.iso.body.position.y = this.follow.body.position.y
    }
    else {
      this.iso.body.position.x = this.follow.isoX
      this.iso.body.position.y = this.follow.isoY
    }
  }

  updateZ() {
    var zz = -300;
    var followZ = this.follow.body ? this.follow.body.position.z : this.follow.isoZ

    groups.walls.forEach((wall) => {
      var wallZ = wall.isoZ + wall.body.height

      if (
        wallZ > zz
        && wallZ < followZ
        && !this.exclude.includes(wall.key) 
        && this.isWithin(wall)
      ) {
        zz = wallZ
      }
    })

    if (this.follow) {
      if (this.follow.body && zz > this.follow.body.position.z) {
        this.iso.body.position.z = this.follow.body.position.z
      }
      else if (zz > this.follow.isoZ) {
        this.iso.body.position.z = this.follow.isoZ
      }
      else {
        this.iso.body.position.z = zz;
      }
    } else {
      this.iso.body.position.z = zz;
    }
  }
}
