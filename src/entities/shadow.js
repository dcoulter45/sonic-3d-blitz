class Shadow{

  constructor(sprite, follow, followZ = true) {
    this.iso = sprite

    game.physics.isoArcade.enable(sprite)
    sprite.anchor.set(0.5)

    sprite.body.allowGravity = false
    sprite.body.height = 1

    if (follow) {
      sprite.update = () => this.update(follow, followZ)
    } else {
      sprite.update = () => this.update()
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

  update(follow, followZ){
    if (followZ) {
      var zz = -300;

      groups.walls.forEach((wall) => {
        var wallZ = wall.isoZ + 31

        if (this.isWithin(wall) && wallZ > zz) {
          zz = wallZ
        }
      })

      if (follow && zz > follow.body.position.z) {
        this.iso.body.position.z = follow.body.position.z;
      } else {
        this.iso.body.position.z = zz;
      }
    }

    if (follow) {
      this.iso.body.position.x = follow.body.position.x
      this.iso.body.position.y = follow.body.position.y
    }
  }
}
