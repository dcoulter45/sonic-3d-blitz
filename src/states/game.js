class GameState extends Phaser.State {

  preload() {
    game.tick = 0

    preloadGameAssets()
    gamePhysics()
  }

  create() {
    collidables = []

    var level = game.cache.getJSON("map")

    createGameGroups()

    loadLevel(level);
  }

  update() {
    game.tick++
    
    game.debug.text(game.time.fps || '--', 2, 14, "#a7aebe");

    game.physics.isoArcade.collide(game.player.iso, groups.walls, function(obj1, obj2){

			if(obj1.movement == 'bounced' || obj2.key == 'water'){
				return false;
			}
			else if( obj1.previousVelocity.z == 0 && (
				(obj1.previousVelocity.x <= -220 && obj1.body.touching.backX) ||
				(obj1.previousVelocity.x >= 220 && obj1.body.touching.frontX) ||
				(obj1.previousVelocity.y >= 220 && obj1.body.touching.frontY) ||
				(obj1.previousVelocity.y <= -220 && obj1.body.touching.backY) )
			) {
				obj1.collide(obj2);
				return false;
			} 
    });

    game.physics.isoArcade.collide(game.player.iso, collidables, function(obj1, obj2) {
      if (obj2.collide) obj2.collide(obj1)
    })

		game.physics.isoArcade.overlap(game.player.iso, groups.walls, function(obj1, obj2){
			if (obj2.key == 'slope') {
				game.player.handleSlope(obj2)
			}
		});

    groups.objects.sort('depth');
    // groups.walls.sort('depth');
    // game.iso.simpleSort(groups.walls)
    // game.iso.topologicalSort(groups.objects);

    groups.walls.forEach(function (tile) {
      game.debug.body(tile, 'rgba(40, 221, 0, 0.8)', false);
    });

    // groups.objects.forEach(function(tile) {
    //   game.debug.body(tile, 'rgba(255, 0, 0, 0.8)', false);
    // });

    // collidables.forEach(function(obj) {
    //   game.debug.body(obj, "rgba(255, 255, 0)", false)
    // })

    // groups.water.forEach(function(tile) {
    //   game.debug.body(tile, 'rgba(0, 0, 200, 0.8)', false);
    // });
  }
}