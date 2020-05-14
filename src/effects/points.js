class Points{

  constructor(i,x,y,z){
    var xx = x - 10;
    var numbers = String(i).split("")

    numbers.forEach((number)=>{
      var tileId = parseInt(number)
      var point = game.add.isoSprite(xx, y, z, 'points', tileId, groups.objects);
      point.anchor.set(0.5);

      game.physics.isoArcade.enable(point);
      point.body.allowGravity = false;
      point.body.velocity.z = 20;

      game.time.events.add(1000, ()=>{
        point.destroy();
      });

      xx += 10;
    });
  }
}
