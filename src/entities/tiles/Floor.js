Floor = class Floor {
  constructor(wx, wy, x, y, z, obj) {
    var floor = game.add.isoSprite(x, y, z - 25, null, 0, groups.walls);

    game.physics.isoArcade.enable(floor);

    floor.key = "floor";
    floor.anchor.set(0.5);
    floor.body.widthY = wy;
    floor.body.widthX = wx;
    floor.body.height = TILE_HEIGHT;

    floor.body.immovable = true;
    floor.body.allowGravity = false;
    floor.body.collideWorldBounds = false;
  }
}