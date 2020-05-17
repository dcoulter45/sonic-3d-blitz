class GameState extends Phaser.State {
  preload() {
    game.tick = 0
    preloadGameSounds()
    preloadGameAssets()
    gamePhysics()
  }

  create() {
    collidables = []
    game.rings = new RingCounter()

    loadGameSounds()
    createGameGroups()
    loadLevel()

    new TitleCard()
  }

  update() {
    game.tick++
    
    game.debug.text(game.time.fps || '--', 2, 14, "#a7aebe");

    game.physics.isoArcade.collide(player.iso, groups.walls, function(obj1, obj2){
      obj1.collide(obj2);
    });

    game.physics.isoArcade.collide(player.iso, collidables, function(obj1, obj2) {
      obj1.collide(obj2)
      if (obj2.collide) obj2.collide(obj1)
    })

		game.physics.isoArcade.overlap(player.iso, groups.walls, function(obj1, obj2){
			if (obj2.key == 'slope') {
				player.handleSlope(obj2)
			}
    });
    
    game.sound.mute = muteGame

    groups.objects.sort('depth');
    // groups.walls.sort('depth');
    // game.iso.simpleSort(groups.walls)
    // game.iso.topologicalSort(groups.objects);

    if (drawWallBoxes) {
      groups.walls.forEach(function (tile) {
        game.debug.body(tile, 'rgba(40, 221, 0, 0.8)', false);
      });
    }

    if (drawObjectBoxes) {
      groups.objects.forEach(function(tile) {
        game.debug.body(tile, 'rgba(255, 0, 0, 0.8)', false);
      });
    }

    // collidables.forEach(function(obj) {
    //   game.debug.body(obj, "rgba(255, 255, 0)", false)
    // })

    // groups.water.forEach(function(tile) {
    //   game.debug.body(tile, 'rgba(0, 0, 200, 0.8)', false);
    // });
  }
}