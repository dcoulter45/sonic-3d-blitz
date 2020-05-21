Water = class Water{
  constructor(x,y,z,tileId){
    
    if (tileId > 40) {
      this.iso = game.add.isoSprite(x, y, z, 'tiles', tileId, groups.objects);
      this.iso.animations.add('default', [0+tileId,10+tileId,20+tileId,30+tileId,20+tileId,10+tileId], 3, true);
      this.iso.animations.play('default');
    } else {
      this.iso = game.add.isoSprite(x, y, z, 'tiles', tileId, groups.tiles);
    }
    this.iso.anchor.set(0.5);
  }
}

WaterBorder = class WaterBorder{

  constructor(wx, wy, x, y, z){
    this.iso = game.add.isoSprite(x, y, z, null, 0, groups.walls);

    this.iso.anchor.set(0.5);
    game.physics.isoArcade.enable(this.iso);

    this.iso.key = "floor";
    this.iso.body.widthX = wx;
    this.iso.body.widthY = wy;
    this.iso.body.height = 1;

    this.iso.body.immovable = true;
    this.iso.body.allowGravity = false;
  }
}
