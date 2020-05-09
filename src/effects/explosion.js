
Explosion = class Explosion{

  constructor(x,y,z){

    this.iso = game.add.isoSprite(x, y, z, 'explosion', 0, groups.objects);
    this.iso.anchor.set(0.5);

    this.iso.animations.add('default',[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16],20,true);
    this.iso.animations.play('default');

    game.time.events.add(800, ()=>{
      this.iso.destroy();
    });
  }
}
