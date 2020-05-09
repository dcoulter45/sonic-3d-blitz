class Water{
  constructor(x,y,z,tileId){
		this.iso = game.add.isoSprite(x, y, z, 'tiles', tileId, groups.objects);

    this.iso.animations.add('default', [0+tileId,10+tileId,20+tileId,30+tileId,20+tileId,10+tileId], 3, true);
    this.iso.animations.play('default');

    this.iso.anchor.set(0.5);
  }
}

class WaterLayer{

  constructor(widthX,widthY,x,y){
    this.iso = game.add.isoSprite(x, y, 1, null, 0, groups.objects);

    this.iso.anchor.set(0.5);
    game.physics.isoArcade.enable(this.iso);

    this.iso.key = 'water';
    this.iso.body.widthX = widthX;
    this.iso.body.widthY = widthY;
    this.iso.body.height = 1;

    this.iso.body.immovable = true;
    this.iso.body.allowGravity = false;
  }
}
