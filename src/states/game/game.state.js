class GameState extends Phaser.State {
  preload() {
    game.tick = 0
    preloadGameSounds()
    preloadGameAssets()
    gamePhysics()
  }

  create() {
    loadGameSounds()
    createGameGroups()
    loadLevel()

    game.rings = new RingCounter()
    game.lives = new LivesCounter()
    game.timeCounter = new TimeCounter()

    if (levels[game.save.data.level].name.includes("SunriseShore")) {
      new TutorialPopup()
    }
    
    if (stateParams.displayTitle) {
      new TitleCard()
    } else {
      game.camera.flash("#000000", 1000)
    }
  }

  update() {
    game.tick++
    game.timeCounter.update()
    
    game.debug.text(game.time.fps || '--', 5, 210, "#a7aebe");
    game.debug.text(groups.objects.children.length || '--', 5, 195, "#a7aebe");
    
    game.sound.mute = muteGame

    groups.objects.sort('depth');
    // game.iso.topologicalSort(groups.objects, 2.5)

    if (drawWallBoxes) {
      groups.walls.forEach(function (tile) {
        game.debug.body(tile, 'rgba(0, 0, 255, 0.8)', false);
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
  }
}