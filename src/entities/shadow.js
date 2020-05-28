class Shadow{

  constructor(sprite, follow) {

    this.iso = sprite

    game.physics.isoArcade.enable(sprite)

    sprite.body.allowGravity = false

    if (follow) {
      sprite.update = () => this.update(sprite, follow)
    }

    // var x = obj.body.position.x
    // var y = obj.body.position.y
    // var z = obj.body.position.z - 10

    // this.iso = game.add.isoSprite(x, y, z, 'shadow-w'+width, 0, groups.objects);

    // game.physics.isoArcade.enable(this.iso);

    // this.iso.anchor.set(0.5);
    // this.iso.body.collideWorldBounds = true;
    // this.iso.pivot.y = -4;

    // this.iso.update = this.update.bind(this)

    // this.obj = obj
  }

  update(sprite, follow){

    // game.physics.isoArcade.collide(this.iso,groups.walls);
    // game.physics.isoArcade.collide(this.iso,groups.water);

    sprite.body.position.x = follow.body.position.x
    sprite.body.position.y = follow.body.position.y
  }
}
