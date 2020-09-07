class EndingState extends Phaser.State {

  preload() {
    game.load.image("endingBg", "assets/ui/ending-bg.png")
    game.load.image("endingDeathEgg", "assets/ui/ending-death-egg.png")
    game.load.image("endingSonic", "assets/ui/ending-sonic.png")
    game.load.image("endingThanks", "assets/ui/ending-thanks.png")

    game.save.clear()
  }

  create() {

    this.bg = game.add.sprite(0, 0, "endingBg", groups.ui)
    this.deathEgg = game.add.sprite(210, -40, "endingDeathEgg", groups.ui)
    this.sonic = game.add.sprite(20, 0, "endingSonic", groups.ui)

    this.thanks = game.add.sprite(0, 0, "endingThanks", groups.ui)
    this.thanks.visible = false

    game.add.tween(this.deathEgg).to({
      y: 20
    }, 3000, "Linear", true)

    game.add.tween(this.bg).to({
      y: -360
    }, 3000, "Linear", true)

    game.time.events.add(3000, () => {
      game.camera.shake(0.005, 400);
      game.camera.fade(0xffffff, 400)
    }, this)

    game.time.events.add(3800, () => {
      game.camera.flash(0xffffff, 400)
      this.thanks.visible = true
    }, this)

    game.time.events.add(6000, () => {
      game.state.start("TitleState")
    }, this)
  }
}