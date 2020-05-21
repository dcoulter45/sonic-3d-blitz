class GameOver {
  constructor() {
    this.black = game.add.graphics(0, 0, groups.ui)
    this.black.beginFill(0x000000);
    this.black.drawRect(0, 0, 400, 240)
    this.black.endFill()
    this.black.alpha = 0
    this.black.fixedToCamera = true

    this.gameOver = game.add.sprite(132, -40, "gameOver", 0, groups.ui)
    this.gameOver.fixedToCamera = true

    game.save.data.lives = 3
    game.save.data.level = "WildWoodland"
    game.save.store()

    if (game.track) game.track.stop()
    
    this.music = game.add.audio("GameOver")
    this.music.play()
  
    this.animate()
  }

  animate() {
    game.add.tween(this.black).to({ alpha: 1}, 500, "Linear", true)
    game.add.tween(this.gameOver.cameraOffset).to({ x: 132, y: 100 }, 1500, "Linear", true)

    game.time.events.add(1500, this.keyBindings, this)
  }

  keyBindings() {
    this.a = game.input.keyboard.addKey(Phaser.Keyboard.A);
    this.s = game.input.keyboard.addKey(Phaser.Keyboard.S);
    this.enter = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);

    this.a.onDown.add(this.resetGame, this)
    this.s.onDown.add(this.resetGame, this)
    this.enter.onDown.add(this.resetGame, this)
  }

  resetGame() {
    this.music.stop()
    game.state.start("TitleState")
  }
}