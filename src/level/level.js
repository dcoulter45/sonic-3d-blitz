const TILE_WIDTH = 44
const TILE_HEIGHT = 44

function loadLevel(level) {
  console.log(level)
  var levelWidth = level.width * TILE_WIDTH * 2
  var levelHeight = level.height * TILE_WIDTH * 2
  game.world.setBounds(0, 0, levelWidth, levelHeight)

  level.layers.forEach((layer) => {
    if (layer.name.indexOf("Tile Layer") >= 0) {
      renderTiles(layer)
    }

    if (layer.name.indexOf("Object Layer") >= 0) {
      renderObjects(layer)
    }

    if (layer.name.indexOf("Collision Layer") >= 0) {
      renderCollision(layer)
    }
  })
}

function renderTiles(layer) {
  var index = 0;
  var zz = layer.offsety ? (layer.offsety*-1)-5 : -5;

  for(var y = 0; y < layer.height; y++) {
    for(var x = 0; x < layer.width; x++) {
      var tileIndex = layer.data[index] - 1
      var xx = x * TILE_WIDTH
      var yy = y * TILE_WIDTH

      // Water tiles
      if (tileIndex >= 40 && tileIndex <= 46) {
        var tile = new Water(xx, yy, zz, tileIndex);
      } 
      // Static Tiles
      else if (tileIndex >= 0) {
        var tile = game.add.isoSprite(xx, yy, zz, "tiles", tileIndex, groups.objects)
        tile.anchor.set(0.5)
      }

      index++
    }
  }
}

function renderObjects(layer) {
  var z = 0;

  layer.objects.forEach((obj) => {
    if (obj.name) {
      // Fix iso vs tiled rendering issue
      var x = ((obj.x/40)*44);
      var y = ((obj.y/40)*44);

      new window[obj.name](x, y, z, obj);
    }
  });
}

function renderCollision(layer) {
  var zz = (layer.offsety) ? (layer.offsety*-1) - 31 : -31;

  layer.objects.forEach((obj) => {
    var x = (obj.x / 40) * 44;
    var y = (obj.y / 40) * 44;
    var wx = (obj.width / 40) * 44;
    var wy = (obj.height / 40) * 44;
    var height = 31;

    if (obj.name === "Water") {
      new WaterLayer(wx, wy, x, y);
    } 
    else if (obj.name === "Slope") {
      new Slope(wx, wy, x, y, zz, obj)
    }
    else {
      var wall = game.add.isoSprite(x, y, zz, null, 0, groups.walls);

      game.physics.isoArcade.enable(wall);
  
      wall.key = "wall";
      wall.anchor.set(0.5);
      wall.body.widthY = wy;
      wall.body.widthX = wx;
      wall.body.height = height;
  
      wall.body.immovable = true;
      wall.body.allowGravity = false;
    }
  })
}