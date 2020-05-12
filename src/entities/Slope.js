Slope = class Slope {
  constructor(wx, wy, x, y, z, obj) {
    var slope = game.add.isoSprite(x, y, z - 24, null, 0, groups.walls);

    game.physics.isoArcade.enable(slope);

    slope.key = "slope";
    slope.anchor.set(0.5);
    slope.direction = obj.properties.direction;
    slope.body.widthY = wy;
    slope.body.widthX = wx;
    slope.body.height = 30;

    slope.body.immovable = true;
    slope.body.allowGravity = false;
    slope.body.checkCollision.down = false;

    if(slope.direction == 'up' || slope.direction == 'down'){
      slope.body.checkCollision.frontX = false;
      slope.body.checkCollision.backX = false;
    }
    else if(slope.direction == 'left' || slope.direction == 'right'){
      slope.body.checkCollision.frontY = false;
      slope.body.checkCollision.backY = false;
    }
  }
}