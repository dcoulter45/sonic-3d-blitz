class GameState extends Phaser.State {
  preload() {
    game.tick = 0
    game.phase = "active"

    loadTitleCardAssets()
    gamePhysics()
  }

  create() {
    createGameGroups()

    game.titleCard = new TitleCard()

    loadGameSounds()
    loadGameAssets()

    game.load.onLoadComplete.addOnce(this.loadComplete, this);
    game.load.start()
  }

  loadComplete() {
    loadLevel()

    setGameSounds()
        
    game.rings = new RingCounter()
    game.lives = new LivesCounter()
    game.timeCounter = new TimeCounter()

    game.titleCard.hideCard()

    if (levels[game.save.data.level].name.includes("SunriseShore") && stateParams.respawnPoint === null) {
      new TutorialPopup()
    }
  }

  update() {
    game.tick++
    
    if (game.timeCounter) game.timeCounter.update()
    
    // game.debug.text(game.time.fps || '--', 5, 210, "#a7aebe");
    // game.debug.text(groups.objects.children.length || '--', 5, 195, "#a7aebe");
    
    game.sound.mute = muteGame

    groups.objects.sort('depth');

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
  }
}