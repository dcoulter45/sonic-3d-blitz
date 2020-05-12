Wall = class Wall {

  constructor(wx, wy, x, y, z, obj) {
    if (obj.properties && obj.properties.tileId >= 0) {
      this.createWallTexture(wx, wy, x, y, z, obj)
    }

    this.createInvisibleWall(wx, wy, x, y, z, obj)
  }

  createWallTexture(wx, wy, x, y, z, obj) {
    // var tiles = 0;
    // var direction = wx < wy ? "y" : "x"
    // var tiles = direction === "x" ? wx / 44 : wy / 44;

    // function createWall(x, y) {
    //   var wall = game.add.isoSprite(x, y, -5, "walls", obj.properties.tileId, groups.objects);
    //   wall.anchor.set(0.5);
    //   wall.pivot.y = 62  
    // }
    
    // for (var i = 0; i < tiles; i ++) {
    //   if (direction === "x") {
    //     var xx = (i * 44) + x
  
    //     createWall(xx, y)
    //     createWall(xx, y - 44)
    //     createWall(xx, y - 88)
    //   } else {
    //     var yy = (i * 44) + y
  
    //     createWall(x, yy)
    //     createWall(x - 44, yy)
    //     createWall(x - 88, yy)
    //   }
    // }

    var xCount = wx / TILE_WIDTH
    var yCount = wy / TILE_WIDTH

    for (var xx = 0; xx < xCount; xx++) {
      for (var yy = 0; yy < yCount; yy++) {
        var xxx = (xx * TILE_WIDTH) + x
        var yyy = (yy * TILE_WIDTH) + y

        var wall = game.add.isoSprite(xxx, yyy, -5, "walls", obj.properties.tileId, groups.objects)       
        wall.anchor.set(0.5)
        wall.pivot.y = 62
      }
    }
  }

  createInvisibleWall(wx, wy, x, y, z, obj) {
    var wall = game.add.isoSprite(x, y, 0, null, 0, groups.walls);
    console.log(wx, wy)
    game.physics.isoArcade.enable(wall);

    wall.key = "wall";
    wall.anchor.set(0.5);
    wall.body.widthY = wy;
    wall.body.widthX = wx;
    wall.body.height = 124;

    wall.body.moves = false;
  }
}