class Shadow{

  constructor(obj,width){

    var x = obj.body.position.x
    var y = obj.body.position.y
    var z = obj.body.position.z - 10

    this.iso = game.add.isoSprite(x, y, z, 'shadow-w'+width, 0, groups.objects);

    game.physics.isoArcade.enable(this.iso);

    this.iso.anchor.set(0.5);
    this.iso.body.collideWorldBounds = true;
    this.iso.pivot.y = -4;

    this.iso.update = this.update.bind(this)

    this.obj = obj
  }

  update(){

    game.physics.isoArcade.collide(this.iso,groups.walls);
    game.physics.isoArcade.collide(this.iso,groups.water);

    this.iso.body.position.x = this.obj.body.position.x
    this.iso.body.position.y = this.obj.body.position.y
  }
}
