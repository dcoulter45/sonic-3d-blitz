class LevelComplete {
  constructor(nextLevel) {

    player.stop() 
    player.iso.disableControls = true

    this.text = game.add.sprite(400, 101, "levelCompleteText", 0, groups.ui)
    this.text.fixedToCamera = true

    game.add.tween(this.text.cameraOffset).to({ x: 110 }, 2000, "Linear", true)

    if (game.track) game.track.stop()
    if (game.timeCounter) game.timeCounter.stop()

    var music = game.add.audio("LevelComplete")
    music.play()

    game.time.events.add(5000, () => this.loadNextArea(nextLevel))
  }

  loadNextArea(nextLevel) {
    stateParams = {
      activeLevel: nextLevel,
      displayTitle: true,
      respawnPoint: null,
      duration: null
    }
    game.camera.fade("#000000", 1000)

    game.time.events.add(1000, () => {
      game.state.restart()
    })
  }
}