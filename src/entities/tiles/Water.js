Water = class Water{
  constructor(x, y, z, tileId, group) {
    
    this.iso = game.add.isoSprite(x, y, z, 'tiles', tileId, group);
    this.iso.animations.add('default', [
      0 + tileId,
      6 + tileId,
      12 + tileId,
      18 + tileId,
      24 + tileId,
      18 + tileId,
      12 + tileId,
      6 + tileId
    ], 3, true);
    
    this.iso.animations.play('default');

    this.iso.anchor.set(0.5);
  }
}

WaterBorder = class WaterBorder{

  constructor(wx, wy, x, y, z){
    this.iso = game.add.isoSprite(x, y, z - 25, null, 0, groups.walls);

    this.iso.anchor.set(0.5);
    game.physics.isoArcade.enable(this.iso);

    this.iso.key = "water";
    this.iso.body.widthX = wx;
    this.iso.body.widthY = wy;
    this.iso.body.height = TILE_HEIGHT;

    this.iso.body.immovable = true;
    this.iso.body.allowGravity = false;
    this.iso.body.collideWorldBounds = false;
  }
}
