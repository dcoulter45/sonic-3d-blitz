class Sand{

  constructor(x,y,z,tileId){

    tileId = tileId-91;

		this.iso = game.add.isoSprite(x, y, z, 'sand-tiles', tileId, groups.objects);

		this.iso.anchor.set(0.5);

    if(tileId > 0 && tileId < 13){
      this.iso.animations.add('default',[0+tileId,13+tileId,26+tileId,39+tileId,52+tileId,39+tileId,26+tileId,13+tileId],4,true);
      this.iso.animations.play('default');
    }
  }
}
