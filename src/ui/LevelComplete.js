class LevelComplete {
  constructor() {

    this.text = game.add.sprite(400, 101, "levelCompleteText", 0, groups.ui)
    this.text.fixedToCamera = true

    game.add.tween(this.text.cameraOffset).to({ x: 110 }, 2000, "Linear", true)

    if (game.track) game.track.stop()
    if (game.timeCounter) game.timeCounter.stop()

    var music = game.add.audio("LevelComplete")
    music.play()
  }
}