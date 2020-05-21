class LivesCounter {
  constructor() {
    this.count = game.save.data.lives || 3

    this.icon = game.add.sprite(5, 215, "lives", 0, groups.ui)
    this.icon.fixedToCamera = true

    this.number1 = game.add.sprite(45, 225, "livesNumbers", 0, groups.ui)
    this.number1.fixedToCamera = true

    this.number2 = game.add.sprite(52, 225, "livesNumbers", 0, groups.ui)
    this.number2.fixedToCamera = true

    this.updateUi()
  }

  addLife() {
    game.save.data.lives += 1
    
    if (game.track) {
      game.track.pause()

      var sound = game.add.audio("ExtraLife")
      sound.play()
      sound.onStop.add(() => game.track.play())
    }

    this.icon.loadTexture("lives", 1)
    game.time.events.add(2000, () => this.icon.loadTexture("lives", 0))

    this.updateUi()
  }

  removeLife() {
    game.save.data.lives -= 1

    this.updateUi()
  }

  updateUi() {
    this.number1.alpha = game.save.data.lives >= 10 ? 1 : 0

    var digits = String(game.save.data.lives).split("")

    if (digits.length === 1) {
      this.number2.loadTexture("livesNumbers", parseInt(digits[0]))
    } else {
      this.number1.loadTexture("livesNumbers", parseInt(digits[0]))
      this.number2.loadTexture("livesNumbers", parseInt(digits[1]))
    }
  }
}