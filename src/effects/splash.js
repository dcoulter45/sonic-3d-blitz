class Splash{

  constructor(x,y,z){

    this.iso = game.add.isoSprite(x, y, z, 'splash', 0, groups.objects);
    this.iso.anchor.set(0.5);

    //this.iso.pivot.y = -10;
    this.iso.animations.add('default',[0,1,2,3,4,5,6],12,true);
    this.iso.animations.play('default');

    game.time.events.add(500, ()=>{
      this.iso.destroy();
    });
  }
}
