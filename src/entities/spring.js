Spring = class Spring {

  constructor(wx, wy, x, y, z, obj) {

		this.iso = game.add.isoSprite(x+11, y+9, z, 'spring', 0, groups.objects);

		game.physics.isoArcade.enable(this.iso);

    this.iso.animations.add('spring',[2,3,3,3,2,1,0],10,false);

		this.iso.anchor.set(0.5);
    this.iso.body.height = 10;

    this.iso.collide = this.collide.bind(this);

    this.iso.body.immovable = true;
		this.iso.body.allowGravity = false;
  }

  collide(obj){
    if(obj.key == 'player'){
  	  this.iso.animations.play('spring');
    }
  }
}
