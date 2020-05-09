class HomingTrail{

  constructor(x,y,z,direction){

    this.iso = game.add.isoSprite(x, y, z, 'sonic', 0, groups.objects);

    this.iso.animations.add('default', [80],10,true);
    this.iso.animations.play('default');
    this.iso.alpha = 0.6;

    this.iso.anchor.set(0.5);

    game.add.tween(this.iso).to({ alpha: 0 }, 300, "Linear", true);

    game.time.events.add(300,()=>{

      this.iso.destroy();
    });
  }
}
