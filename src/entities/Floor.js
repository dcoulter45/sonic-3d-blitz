Floor = class Floor {
  constructor(wx, wy, x, y, z, obj) {
    var wall = game.add.isoSprite(x, y, z - 24, null, 0, groups.walls);

    game.physics.isoArcade.enable(wall);

    wall.key = "wall";
    wall.anchor.set(0.5);
    wall.body.widthY = wy;
    wall.body.widthX = wx;
    wall.body.height = 30;

    wall.body.immovable = true;
    wall.body.allowGravity = false;
    wall.body.collideWorldBounds = true;
  }
}